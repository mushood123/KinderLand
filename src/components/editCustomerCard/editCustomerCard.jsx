import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { styles } from './styles';

export const EditCustomerCard = ({
  customerName,
  customerId,
  phoneNumber,
  shippingAddress,
  onEditPress,
  onCardPress,
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const handleEditPress = () => {
    console.log('Edit customer pressed:', customerName);
    if (onEditPress) onEditPress();
  };

  const handleCardPress = () => {
    console.log('Customer card pressed:', customerName);
    if (onCardPress) onCardPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTablet && styles.cardTablet
      ]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[
          styles.customerName,
          isTablet && styles.customerNameTablet
        ]}>
          {customerName}
        </Text>

        <TouchableOpacity
          style={[styles.editButton, isTablet && styles.editButtonTablet]}
          onPress={handleEditPress}
        >
          <Text style={[styles.editIcon, isTablet && styles.editIconTablet]}>
            ↗
          </Text>
        </TouchableOpacity>
      </View>

      {/* Customer Details */}
      <View style={styles.detailsSection}>
        {/* ID */}
        <Text style={[styles.detailText, isTablet && styles.detailTextTablet]}>
          ID : {customerId}
        </Text>

        {/* Phone Number */}
        <Text style={[
          styles.detailText,
          styles.phoneNumber,
          isTablet && styles.detailTextTablet
        ]}>
          {phoneNumber}
        </Text>

        {/* Shipping Address Label */}
        <Text style={[
          styles.shippingLabel,
          isTablet && styles.shippingLabelTablet
        ]}>
          Shipping Address :
        </Text>

        {/* Address Details */}
        <View style={styles.addressSection}>
          <Text style={[
            styles.addressText,
            isTablet && styles.addressTextTablet
          ]}>
            {shippingAddress}
          </Text>
        </View>
      </View>
    </TouchableOpacity >
  );
};

