import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { styles } from './styles';

export const CustomerCard = ({
  shopName,
  address,
  name,
  id,
  layout,
  onPress,
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const handlePress = () => {
    console.log('Customer card pressed:', { shopName, name, id });
    onPress?.({ shopName, address, name, id });
  };

  const renderListLayout = () => (
    <TouchableOpacity
      style={[
        styles.listContainer,
        isTablet && styles.listContainerTablet
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.listLeftSection}>
        <Text style={[
          styles.listShopName,
          isTablet && styles.listShopNameTablet
        ]} numberOfLines={1}>
          {shopName}
        </Text>
        <Text style={[
          styles.listName,
          isTablet && styles.listNameTablet
        ]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[
          styles.listAddress,
          isTablet && styles.listAddressTablet
        ]} numberOfLines={2}>
          {address}
        </Text>
      </View>
      <View style={styles.listRightSection}>
        <View style={[
          styles.idBadge,
          isTablet && styles.idBadgeTablet
        ]}>
          <Text style={[
            styles.idText,
            isTablet && styles.idTextTablet
          ]}>
            #{id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCardLayout = () => (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isTablet && styles.cardContainerTablet
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[
          styles.cardIdBadge,
          isTablet && styles.cardIdBadgeTablet
        ]}>
          <Text style={[
            styles.cardIdText,
            isTablet && styles.cardIdTextTablet
          ]}>
            #{id}
          </Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={[
          styles.cardShopName,
          isTablet && styles.cardShopNameTablet
        ]} numberOfLines={2}>
          {shopName}
        </Text>
        <Text style={[
          styles.cardName,
          isTablet && styles.cardNameTablet
        ]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[
          styles.cardAddress,
          isTablet && styles.cardAddressTablet
        ]} numberOfLines={3}>
          {address}
        </Text>
      </View>
    </TouchableOpacity >
  );

  return layout === 'list' ? renderListLayout() : renderCardLayout();
};



