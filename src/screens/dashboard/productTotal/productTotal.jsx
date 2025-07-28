import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizeCard } from '../../../components';
import { styles } from './styles';
import { quantityButtons } from './data';
import { useRoute } from '@react-navigation/native';

export const ProductTotal = () => {
  const [quantities, setQuantities] = useState({

  });
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { product, customer } = route.params;
  console.log("product from product total", product)
  console.log("customer from product total", customer)

  // Generate size data dynamically from product size ranges
  const generateSizeData = () => {
    const sizeData = [];

    // Parse size range 1 (e.g., "19-27")
    if (product.pricing.sizeRange1) {
      const [start1, end1] = product.pricing.sizeRange1.split('-').map(Number);
      for (let size = start1; size <= end1; size++) {
        sizeData.push({
          size: size,
          model: product.productName || 'N/A',
          color: product.outsoleColor + " " + product.outsoleType || 'N/A',
          price: product.pricing.price1 || 0,
          quantity: 0
        });
      }
    }

    // Parse size range 2 (e.g., "28-41")
    if (product.pricing.sizeRange2) {
      const [start2, end2] = product.pricing.sizeRange2.split('-').map(Number);
      for (let size = start2; size <= end2; size++) {
        sizeData.push({
          size: size,
          model: product.productName || 'N/A',
          color: product.outsoleColor + " " + product.outsoleType || 'N/A',
          price: product.pricing.price2 || 0,
          quantity: 0
        });
      }
    }

    return sizeData;
  };

  const sizeData = generateSizeData();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.productName || 'Size Quantity',
      headerRight: () => (
        <TouchableOpacity onPress={handleClear} style={styles.deleteButton}>
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, product?.productName]);

  const getTotalPairs = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleBack = () => {
    console.log('Back button pressed');
  };

  const handleClear = () => {
    setQuantities({});
    setSelectedSizes(new Set());
    setSelectedQuantity(null);
    console.log('All quantities and selections cleared');
  };

  const handleQuantityButtonPress = (value) => {
    if (typeof value === 'number') {
      setSelectedQuantity(value);
      console.log(`Quantity ${value} selected`);

      if (selectedSizes.size > 0) {
        applyQuantityToSelectedSizes(value);
      }
    } else {
      console.log('Hash button pressed');
    }
  };

  const applyQuantityToSelectedSizes = (quantity) => {
    setQuantities(prev => {
      const newQuantities = { ...prev };
      selectedSizes.forEach(size => {
        newQuantities[size] = quantity;
      });
      console.log(`Applied quantity ${quantity} to sizes: ${Array.from(selectedSizes).join(', ')}`);
      return newQuantities;
    });
  };

  const handleQuantityIncrease = () => {
    if (selectedSizes.size === 0) {
      console.log('Please select sizes first');
      return;
    }

    const currentQuantity = selectedQuantity || 0;
    const newQuantity = currentQuantity + 1;
    setSelectedQuantity(newQuantity);

    applyQuantityToSelectedSizes(newQuantity);

    console.log(`Increased selected quantity to ${newQuantity}`);
  };

  const handleQuantityDecrease = () => {
    if (selectedSizes.size === 0) {
      console.log('Please select sizes first');
      return;
    }

    const currentQuantity = selectedQuantity || 0;
    const newQuantity = Math.max(0, currentQuantity - 1);
    setSelectedQuantity(newQuantity);

    applyQuantityToSelectedSizes(newQuantity);

    console.log(`Decreased selected quantity to ${newQuantity}`);
  };

  const handleSizeCardPress = (item) => {
    const size = item.size;
    const newSelectedSizes = new Set(selectedSizes);

    if (newSelectedSizes.has(size)) {
      newSelectedSizes.delete(size);
      console.log(`Size ${size} removed from selection`);
    } else {
      newSelectedSizes.add(size);
      console.log(`Size ${size} added to selection`);

      if (selectedQuantity !== null) {
        setQuantities(prev => ({
          ...prev,
          [size]: selectedQuantity
        }));
        console.log(`Applied quantity ${selectedQuantity} to size ${size}`);
      }
    }

    setSelectedSizes(newSelectedSizes);
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    console.log('Current quantities:', quantities);
    console.log('Selected sizes:', Array.from(selectedSizes));
    console.log('Selected quantity:', selectedQuantity);

    // Check if any sizes and quantities are selected
    const totalPairs = getTotalPairs();
    if (totalPairs === 0 || selectedSizes.size === 0) {
      Alert.alert(
        'Selection Required',
        'Please select sizes and quantities before moving to shipping.',
        [
          {
            text: 'OK',
            style: 'default'
          }
        ]
      );
      return;
    }

    navigation.navigate('Order Cart', { product: product, quantities: quantities, selectedSizes: selectedSizes, selectedQuantity: selectedQuantity, customer: customer });
  };

  const getInstructionText = () => {
    if (selectedQuantity === null) {
      return 'First, select a quantity from the buttons above.';
    } else if (selectedSizes.size === 0) {
      return `Quantity ${selectedQuantity} selected. Now select sizes to apply this quantity.`;
    } else {
      return `Quantity ${selectedQuantity} will be applied to ${selectedSizes.size} selected size(s).`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Size And Quantity</Text>
          <View style={styles.instructionRow}>
            <Text style={styles.instruction}>{getInstructionText()}</Text>
            <Text style={styles.totalPairs}>{getTotalPairs()} Pairs</Text>
          </View>
        </View>

        <View style={styles.quantitySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quantityScroll}>
            {quantityButtons.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quantityButton,
                  selectedQuantity === value && styles.quantityButtonSelected
                ]}
                onPress={() => handleQuantityButtonPress(value)}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    selectedQuantity === value && styles.quantityButtonTextSelected
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.quantityActionButton,
                selectedSizes.size === 0 && styles.quantityActionButtonDisabled
              ]}
              onPress={handleQuantityIncrease}
              disabled={selectedSizes.size === 0}
            >
              <Text style={[
                styles.quantityActionText,
                selectedSizes.size === 0 && styles.quantityActionTextDisabled
              ]}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quantityActionButton,
                selectedSizes.size === 0 && styles.quantityActionButtonDisabled
              ]}
              onPress={handleQuantityDecrease}
              disabled={selectedSizes.size === 0}
            >
              <Text style={[
                styles.quantityActionText,
                selectedSizes.size === 0 && styles.quantityActionTextDisabled
              ]}>-</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.sizeList}>
          {sizeData.map((item) => (
            <SizeCard
              key={item.size}
              item={item}
              currentQuantity={quantities[item.size] || 0}
              onPress={handleSizeCardPress}
              isSelected={selectedSizes.has(item.size)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingCartButton} onPress={handleCartPress}>
        <Text style={styles.cartIcon}>🛒</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

