import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./styles";

export const CartSummaryCard = ({
  unitTotal,
  unitLabel = "pairs",
  grandTotal,
  currency = "$",
  showCartIcon = true,
  backgroundColor = "#F8F9FA",
  borderColor = "#E5E7EB",
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const formatCurrency = (amount) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  const formatUnitTotal = (total, label) => {
    return `${total} ${label}`;
  };

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, isTablet && styles.containerTablet]}>
      {/* Cart Icon */}
      {showCartIcon && (
        <View style={[styles.iconContainer, isTablet && styles.iconContainerTablet]}>
          <Text style={[styles.cartIcon, isTablet && styles.cartIconTablet]}>🛒</Text>
        </View>
      )}

      {/* Summary Content */}
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        {/* Unit Total Row */}
        <View style={[styles.row, isTablet && styles.rowTablet]}>
          <Text style={[styles.label, isTablet && styles.labelTablet]}>Unit Total</Text>
          <Text style={[styles.unitValue, isTablet && styles.unitValueTablet]}>
            {formatUnitTotal(unitTotal, unitLabel)}
          </Text>
        </View>

        {/* Separator Line */}
        <View style={[styles.separator, { borderColor }, isTablet && styles.separatorTablet]} />

        {/* Grand Total Row */}
        <View style={[styles.row, isTablet && styles.rowTablet]}>
          <Text style={[styles.label, isTablet && styles.labelTablet]}>Grand Total</Text>
          <Text style={[styles.grandTotalValue, isTablet && styles.grandTotalValueTablet]}>
            {formatCurrency(grandTotal)}
          </Text>
        </View>
      </View>
    </View>
  );
};

