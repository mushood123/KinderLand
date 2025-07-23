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
import { sizeData, quantityButtons } from './data.js';

export const SizeQuantity = ({ route }) => {
  const [quantities, setQuantities] = useState({

  });
  const [selectedSizes, setSelectedSizes] = useState(new Set()); // Track selected sizes
  const [selectedQuantityButton, setSelectedQuantityButton] = useState(1);
  const navigation = useNavigation();
  const { productName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: productName || 'Size Quantity',
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, productName]);

  const getTotalPairs = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getSelectedSizesCount = () => {
    return selectedSizes.size;
  };

  const handleBack = () => {
    console.log('Back button pressed');
  };

  const handleDelete = () => {
    console.log('Delete button pressed');
    // Clear all selections and quantities
    setSelectedSizes(new Set());
    setQuantities({});
    setSelectedQuantityButton(1);
  };

  const handleQuantityButtonPress = (value) => {
    if (typeof value === 'number') {
      setSelectedQuantityButton(value);
      console.log('Selected quantity:', value);

      // Apply quantity to all selected sizes
      if (selectedSizes.size > 0) {
        const newQuantities = { ...quantities };
        selectedSizes.forEach(size => {
          newQuantities[size] = value;
        });
        setQuantities(newQuantities);
      }
    } else {
      // Handle '#' button - select all sizes
      console.log('Hash button pressed - selecting all sizes');
      const allSizes = new Set(sizeData.map(item => item.size));
      setSelectedSizes(allSizes);
    }
  };

  // Update selected quantity button when selection changes
  React.useEffect(() => {
    if (selectedSizes.size > 0) {
      // Get quantities of selected sizes
      const selectedQuantities = Array.from(selectedSizes).map(size => quantities[size] || 0);

      // If all selected sizes have the same quantity, update the button
      const uniqueQuantities = [...new Set(selectedQuantities)];
      if (uniqueQuantities.length === 1 && uniqueQuantities[0] > 0) {
        setSelectedQuantityButton(uniqueQuantities[0]);
      }
    }
  }, [selectedSizes, quantities]);

  const handleQuantityIncrease = () => {
    if (selectedSizes.size > 0) {
      setQuantities(prev => {
        const newQuantities = { ...prev };
        selectedSizes.forEach(size => {
          newQuantities[size] = (newQuantities[size] || 0) + 1;
        });
        return newQuantities;
      });
    }
  };

  const handleQuantityDecrease = () => {
    if (selectedSizes.size > 0) {
      setQuantities(prev => {
        const newQuantities = { ...prev };
        selectedSizes.forEach(size => {
          newQuantities[size] = Math.max(0, (newQuantities[size] || 0) - 1);
          // Remove size from quantities if quantity becomes 0
          if (newQuantities[size] === 0) {
            delete newQuantities[size];
          }
        });
        return newQuantities;
      });
    }
  };

  const handleSizeCardPress = (item) => {
    console.log('Size selected:', item.size);
    const newSelectedSizes = new Set(selectedSizes);

    if (newSelectedSizes.has(item.size)) {
      // Deselect the size - preserve quantity
      newSelectedSizes.delete(item.size);
    } else {
      // Select the size
      newSelectedSizes.add(item.size);
      // Initialize quantity for this size if not already set
      setQuantities(prev => ({
        ...prev,
        [item.size]: prev[item.size] || 0
      }));
    }

    setSelectedSizes(newSelectedSizes);
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    console.log('Current quantities:', quantities);
    console.log('Selected sizes:', Array.from(selectedSizes));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Size And Quantity</Text>
          <View style={styles.instructionRow}>
            <Text style={styles.instruction}>Please select the size and quantity of product.</Text>
            <Text style={styles.totalPairs}>{getTotalPairs()} Pairs</Text>
          </View>
          {selectedSizes.size > 0 && (
            <Text style={styles.selectionInfo}>
              {selectedSizes.size} size{selectedSizes.size > 1 ? 's' : ''} selected
            </Text>
          )}
        </View>

        <View style={styles.quantitySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quantityScroll}>
            {quantityButtons.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quantityButton,
                  selectedQuantityButton === value && styles.quantityButtonSelected
                ]}
                onPress={() => handleQuantityButtonPress(value)}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    selectedQuantityButton === value && styles.quantityButtonTextSelected
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
              <Text style={styles.quantityActionText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quantityActionButton,
                selectedSizes.size === 0 && styles.quantityActionButtonDisabled
              ]}
              onPress={handleQuantityDecrease}
              disabled={selectedSizes.size === 0}
            >
              <Text style={styles.quantityActionText}>-</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.sizeList}>
          {sizeData.map((item) => (
            <SizeCard
              key={item.size}
              item={item}
              currentQuantity={quantities[item.size] || 0}
              isSelected={selectedSizes.has(item.size)}
              onPress={handleSizeCardPress}
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

