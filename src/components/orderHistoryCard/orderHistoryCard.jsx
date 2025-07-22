import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";

export const OrderHistoryCard = ({
  poNumber,
  productName,
  customerName,
  orderDate,
  shippingAddress,
  status,
  onEditPress,
  onDeletePress,
  onCardPress,
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const handleEditPress = () => {
    console.log("Edit order pressed:", poNumber);
    if (onEditPress) onEditPress();
  };

  const handleDeletePress = () => {
    console.log("Delete order pressed:", poNumber);
    if (onDeletePress) onDeletePress();
  };

  const handleCardPress = () => {
    console.log("Order card pressed:", poNumber);
    if (onCardPress) onCardPress();
  };

  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case "Pending":
        return "#3B82F6";
      case "Shipped":
        return "#F59E0B";
      case "Delivered":
        return "#10B981";
      case "Cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, isTablet && styles.cardTablet]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.poNumber, isTablet && styles.poNumberTablet]}>PO# : {poNumber}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
            onPress={handleEditPress}
          >
            <Text style={[styles.editIcon, isTablet && styles.editIconTablet]}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton, isTablet && styles.actionButtonTablet]}
            onPress={handleDeletePress}
          >
            <Text style={[styles.deleteIcon, isTablet && styles.deleteIconTablet]}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Details Section */}
      <View style={styles.detailsSection}>
        <Text style={[styles.productName, isTablet && styles.productNameTablet]}>{productName}</Text>

        <Text style={[styles.customerName, isTablet && styles.customerNameTablet]}>{customerName}</Text>

        <Text style={[styles.orderDate, isTablet && styles.orderDateTablet]}>{orderDate}</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.addressSection}>
          <Text style={[styles.shippingLabel, isTablet && styles.shippingLabelTablet]}>Shipping Address :</Text>
          <Text style={[styles.addressText, isTablet && styles.addressTextTablet]}>{shippingAddress}</Text>
        </View>

        <Text style={[styles.statusText, { color: getStatusColor(status) }, isTablet && styles.statusTextTablet]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

