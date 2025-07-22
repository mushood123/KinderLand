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
    21: 1,
    26: 8,
  });
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

  const handleBack = () => {
    console.log('Back button pressed');
  };

  const handleDelete = () => {
    console.log('Delete button pressed');
  };

  const handleQuantityButtonPress = (value) => {
    if (typeof value === 'number') {
      setSelectedQuantityButton(value);
      console.log('Selected quantity:', value);
    } else {
      console.log('Hash button pressed');
    }
  };

  const handleQuantityIncrease = () => {
    if (selectedQuantityButton !== null) {
      setQuantities(prev => ({
        ...prev,
        [selectedQuantityButton]: (prev[selectedQuantityButton] || 0) + 1
      }));
    }
  };

  const handleQuantityDecrease = () => {
    if (selectedQuantityButton !== null) {
      setQuantities(prev => ({
        ...prev,
        [selectedQuantityButton]: Math.max(0, (prev[selectedQuantityButton] || 0) - 1)
      }));
    }
  };

  const handleSizeCardPress = (item) => {
    console.log('Size selected:', item.size);
    // You can add logic here to handle size selection
  };

  const handleCartPress = () => {
    console.log('Cart button pressed');
    console.log('Current quantities:', quantities);
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

            <TouchableOpacity style={styles.quantityActionButton} onPress={handleQuantityIncrease}>
              <Text style={styles.quantityActionText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quantityActionButton} onPress={handleQuantityDecrease}>
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

