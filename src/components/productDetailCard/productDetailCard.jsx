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
  local,
  onPress,
  onEditPress,
  notes,
  showDetails
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const handleCardPress = () => {
    console.log("Product card pressed:", productName);
    if (onPress) {
      onPress({ materials, local });
    }
  };

  const handleEditPress = () => {
    console.log("Edit product pressed:", productName);
    if (onEditPress) onEditPress();
  };

  const renderMaterialItem = (label, value) => (
    <View style={[styles.infoRow, isTablet && styles.infoRowTablet]}>
      <Text style={[styles.infoLabel, isTablet && styles.infoLabelTablet]}>{label}:</Text>
      <Text style={[styles.infoValue, isTablet && styles.infoValueTablet]}>{value || ""}</Text>
    </View>
  );

  const renderLocationItem = (label, value) => (
    <View style={[styles.infoRow, isTablet && styles.infoRowTablet]}>
      <Text style={[styles.infoLabel, isTablet && styles.infoLabelTablet]}>{label}:</Text>
      <Text style={[styles.infoValue, isTablet && styles.infoValueTablet]}>{value || ""}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.listCard, isTablet && styles.listCardTablet]}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.listContent}>
        <View style={[styles.listImageContainer, isTablet && styles.listImageContainerTablet]}>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.listImage, isTablet && styles.listImageTablet]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.listInfo}>
          <Text style={[styles.listProductName, isTablet && styles.listProductNameTablet]}>{productName}</Text>
          <Text style={[styles.listProductCode, isTablet && styles.listProductCodeTablet]}>{productCode}</Text>
          <Text style={[styles.listDescription, isTablet && styles.listDescriptionTablet]}>{description}</Text>
        </View>
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
      {showDetails && (
        <View style={[styles.detailsSection, isTablet && styles.detailsSectionTablet]}>
          <View style={styles.column}>
            {materials.map((material, index) => (
              renderMaterialItem(`Material ${index + 1}`, material)
            ))}
            {renderMaterialItem("Notes", notes)}
          </View>
          <View style={styles.column}>
            {local?.map((location, index) => (
              renderLocationItem(`Location ${index + 1}`, location)
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};