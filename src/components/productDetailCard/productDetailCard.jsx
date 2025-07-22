import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";

export const ProductDetailCard = ({
  productName,
  productCode,
  description,
  imageUrl,
  pricing,
  materials,
  locations,
  layout = "card",
  onPress,
  onEditPress,
  notes
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const handleCardPress = () => {
    console.log("Product card pressed:", productName);
    if (onPress) onPress();
  };

  const handleEditPress = () => {
    console.log("Edit product pressed:", productName);
    if (onEditPress) onEditPress();
  };

  const renderMaterialItem = (label, value) => (
    <View style={[styles.infoRow, isTablet && styles.infoRowTablet]}>
      <Text style={[styles.infoLabel, isTablet && styles.infoLabelTablet]}>{label} :</Text>
      <Text style={[styles.infoValue, isTablet && styles.infoValueTablet]}>{value || ""}</Text>
    </View>
  );

  const renderLocationItem = (label, value) => (
    <View style={[styles.infoRow, isTablet && styles.infoRowTablet]}>
      <Text style={[styles.infoLabel, isTablet && styles.infoLabelTablet]}>{label} :</Text>
      <Text style={[styles.infoValue, isTablet && styles.infoValueTablet]}>{value || ""}</Text>
    </View>
  );

  if (layout === "list") {
    return (
      <TouchableOpacity
        style={[styles.listCard, isTablet && styles.listCardTablet]}
        onPress={handleCardPress}
        activeOpacity={0.7}
      >
        <View style={styles.listContent}>
          {/* Product Image */}
          <View style={[styles.listImageContainer, isTablet && styles.listImageContainerTablet]}>
            <Image
              source={{ uri: imageUrl }}
              style={[styles.listImage, isTablet && styles.listImageTablet]}
              resizeMode="cover"
            />
          </View>

          {/* Product Info */}
          <View style={styles.listInfo}>
            <Text style={[styles.listProductName, isTablet && styles.listProductNameTablet]}>{productName}</Text>
            <Text style={[styles.listProductCode, isTablet && styles.listProductCodeTablet]}>{productCode}</Text>
            <Text style={[styles.listDescription, isTablet && styles.listDescriptionTablet]}>{description}</Text>
          </View>

          {/* Pricing */}
          <View style={styles.listPricing}>
            <View style={styles.priceRow}>
              <Text style={[styles.sizeRange, isTablet && styles.sizeRangeTablet]}>{pricing.sizeRange1} :</Text>
              <Text style={[styles.price, isTablet && styles.priceTablet]}>{pricing.price1}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.sizeRange, isTablet && styles.sizeRangeTablet]}>{pricing.sizeRange2} :</Text>
              <Text style={[styles.price, isTablet && styles.priceTablet]}>{pricing.price2}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, isTablet && styles.cardTablet]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Header Section */}
      <View style={styles.header}>
        {/* Product Image */}
        <View style={[styles.imageContainer, isTablet && styles.imageContainerTablet]}>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.productImage, isTablet && styles.productImageTablet]}
            resizeMode="cover"
          />
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={[styles.productName, isTablet && styles.productNameTablet]}>{productName}</Text>
          <Text style={[styles.productCode, isTablet && styles.productCodeTablet]}>{productCode}</Text>
          <Text style={[styles.description, isTablet && styles.descriptionTablet]}>{description}</Text>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <View style={styles.priceRow}>
            <Text style={[styles.sizeRange, isTablet && styles.sizeRangeTablet]}>{pricing?.sizeRange1} :</Text>
            <Text style={[styles.price, isTablet && styles.priceTablet]}>{pricing?.price1}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.sizeRange, isTablet && styles.sizeRangeTablet]}>{pricing?.sizeRange2} :</Text>
            <Text style={[styles.price, isTablet && styles.priceTablet]}>{pricing?.price2}</Text>
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        {/* Materials Column */}
        <View style={styles.column}>
          {materials.map((material, index) => (
            renderMaterialItem(`Material ${index + 1}`, material)
          ))}
          {renderMaterialItem("Notes", notes)}
        </View>

        {/* Locations Column */}
        <View style={styles.column}>
          {locations.map((location, index) => (
            renderLocationItem(`location ${index + 1}`, location)
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

