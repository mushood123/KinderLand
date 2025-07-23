import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { styles } from './styles';

export const SizeCard = ({
  item,
  currentQuantity,
  onPress,
  isSelected = false,
}) => {
  const hasQuantity = currentQuantity > 0;

  const handlePress = () => {
    console.log('Size card pressed:', item.size);
    onPress?.(item);
  };

  const renderPriceInfo = () => {
    if (hasQuantity && currentQuantity > 1) {
      return (
        <View style={styles.priceContainer}>
          <Text style={styles.totalPrice}>
            $ {(item.price * currentQuantity).toFixed(2)} x {currentQuantity}
          </Text>
          <Text style={styles.unitPrice}>$ {item.price.toFixed(2)}</Text>
        </View>
      );
    }

    return (
      <View style={styles.priceContainer}>
        <Text style={styles.unitPrice}>$ {item.price.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.sizeCard,
        hasQuantity && styles.sizeCardSelected,
        isSelected && styles.sizeCardActive
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.sizeInfo}>
        <Text style={[
          styles.sizeNumber,
          isSelected && styles.sizeNumberSelected
        ]}>{item.size}</Text>
        <View style={styles.sizeDetails}>
          <Text style={styles.sizeModel}>{item.model}</Text>
          <Text style={styles.sizeColor}>{item.color}</Text>
        </View>
        {hasQuantity && (
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityBadgeText}>{currentQuantity}</Text>
          </View>
        )}
      </View>

      {renderPriceInfo()}
    </TouchableOpacity>
  );
};
