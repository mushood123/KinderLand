import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { styles } from "./styles";

export const ProductInventoryCard = ({
  productName,
  productCode,
  description,
  imageUrl,
  sizeQuantities,
  priceTiers,
  onDeletePress,
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities from props
    const initialQuantities = {};
    sizeQuantities.forEach((item) => {
      initialQuantities[item.size] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [sizeQuantities]);

  const calculateTotals = () => {
    let totalPairs = 0;
    let totalValue = 0;

    Object.entries(quantities).forEach(([sizeStr, quantity]) => {
      const size = parseInt(sizeStr);
      totalPairs += quantity;

      // Find the appropriate price tier for this size
      const tier = priceTiers.find((tier) => {
        const [min, max] = tier.sizeRange.split("-").map((s) => parseInt(s.trim()));
        return size >= min && size <= max;
      });

      if (tier) {
        totalValue += quantity * tier.price;
      }
    });

    return { totalPairs, totalValue };
  };

  const { totalPairs, totalValue } = calculateTotals();

  const handleDeletePress = () => {
    console.log("Delete product pressed:", productName);
    onDeletePress?.();
  };

  const renderSizeGrid = () => {
    const sizes = sizeQuantities.map((item) => item.size).sort((a, b) => a - b);

    return (
      <View style={styles.gridContainer}>
        {/* Size row */}
        <View style={styles.gridRow}>
          {sizes.map((size) => (
            <View
              key={`size-${size}`}
              style={[styles.gridCell, styles.sizeCell, isTablet && styles.gridCellTablet]}
            >
              <Text style={[styles.sizeText, isTablet && styles.sizeTextTablet]}>{size}</Text>
            </View>
          ))}
        </View>

        {/* Quantity row */}
        <View style={styles.gridRow}>
          {sizes.map((size) => (
            <View
              key={`qty-${size}`}
              style={[styles.gridCell, styles.quantityCell, isTablet && styles.gridCellTablet]}
            >
              <Text style={[styles.quantityText, isTablet && styles.quantityTextTablet]}>
                {quantities[size] || 0}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View
      style={[styles.card, isTablet && styles.cardTablet]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.productName, isTablet && styles.productNameTablet]}>{productName}</Text>
          <Text style={[styles.productCode, isTablet && styles.productCodeTablet]}>{productCode}</Text>
        </View>

        <TouchableOpacity
          style={[styles.deleteButton, isTablet && styles.deleteButtonTablet]}
          onPress={handleDeletePress}
        >
          <Text style={[styles.deleteIcon, isTablet && styles.deleteIconTablet]}>🗑</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={[styles.description, isTablet && styles.descriptionTablet]}>{description}</Text>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Product Image */}
        <View style={[styles.imageContainer, isTablet && styles.imageContainerTablet]}>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.productImage, isTablet && styles.productImageTablet]}
            resizeMode="cover"
          />
        </View>

        {/* Size Grid - Horizontally Scrollable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gridScrollView}
          contentContainerStyle={styles.gridScrollContent}
        >
          {renderSizeGrid()}
        </ScrollView>
      </View>

      {/* Footer with pricing and totals */}
      <View style={styles.footer}>
        <View style={styles.pricingRow}>
          {priceTiers.map((tier, index) => (
            <Text key={index} style={[styles.priceTier, isTablet && styles.priceTierTablet]}>
              {tier.sizeRange} = ${tier.price.toFixed(2)}
            </Text>
          ))}
        </View>

        <View style={styles.totalsRow}>
          <Text style={[styles.totalPairs, isTablet && styles.totalPairsTablet]}>{totalPairs} pairs</Text>
          <Text style={[styles.totalValue, isTablet && styles.totalValueTablet]}>
            Total = $ {totalValue.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

