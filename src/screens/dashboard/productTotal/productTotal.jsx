import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SizeCard } from '../../../components';
import { styles } from './styles';
import { sizeData, quantityButtons } from './data';

export const ProductTotal = ({ route }) => {
  const [quantities, setQuantities] = useState({

  });
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const navigation = useNavigation();
  const { product } = route.params;

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
    navigation.navigate('Order Cart', { product: product, quantities: quantities, selectedSizes: selectedSizes, selectedQuantity: selectedQuantity });
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

