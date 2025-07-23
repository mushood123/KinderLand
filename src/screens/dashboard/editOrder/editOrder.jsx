import React, { useState, useLayoutEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { ProductCard, FilterModal, SearchBar } from '../../../components'
import { productData, filterOptions } from './data.js';
import { styles } from './styles.js';
import { useNavigation } from '@react-navigation/native';

export const EditOrder = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigation = useNavigation();

  // Filter products based on search text and selected filter
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) {
      return productData;
    }

    const searchLower = searchText.toLowerCase().trim();

    return productData.filter((product) => {
      // If a specific filter is selected, only search in that field
      if (selectedFilter) {
        switch (selectedFilter) {
          case 'sku':
            return product.model?.toLowerCase().includes(searchLower);
          case 'styleName':
            return product.name?.toLowerCase().includes(searchLower);
          case 'articleName':
            return product.name?.toLowerCase().includes(searchLower);
          case 'color':
            return product.color?.toLowerCase().includes(searchLower);
          default:
            return false;
        }
      }

      // If no filter is selected, search across all relevant fields
      return (
        product.name?.toLowerCase().includes(searchLower) ||
        product.model?.toLowerCase().includes(searchLower) ||
        product.color?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchText, selectedFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={handleModalOpen}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleModalOpen = () => {
    setFilterModalVisible(true);
    console.log('Filter Modal Opened', filterModalVisible);
  };

  const handleModalClose = () => {
    setFilterModalVisible(false);
    console.log('Filter Modal Closed', selectedFilter);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    console.log('Searching for:', text);
  };

  const handleClearSearch = () => {
    setSearchText('');
    console.log('Search cleared');
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterModalVisible(false);
    console.log('Filter selected:', filter);
  };

  const handleProductPress = (item) => {
    setSelectedProduct(item);
    navigation.navigate('Size Quantity', { productName: item?.name });
    console.log('Selected product:', item);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.orderInfoSection}>
          <View style={styles.orderDetails}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderCategory}>MENS FOOTWEAR / KIRYAS JOEL SHOES</Text>
              <Text style={styles.orderStats}>{filteredProducts.length} Products</Text>
              <Text style={styles.orderStats}>891 Pairs</Text>
            </View>
            <View style={styles.cartIconContainer}>
              <Text style={styles.cartIcon}>🛒</Text>
            </View>
          </View>
        </View>
        <Text style={styles.instructionText}>Edit the product for this order.</Text>
        <SearchBar
          value={searchText}
          onChangeText={handleSearch}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder={selectedFilter ? `Search by ${filterOptions.find(f => f.id === selectedFilter)?.label}...` : 'Search products...'}
        />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.productList}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onPress={handleProductPress}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No products found matching "{searchText}"
                </Text>
                <Text style={styles.noResultsSubtext}>
                  Try adjusting your search terms or filter
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FilterModal
        filterOptions={filterOptions}
        visible={filterModalVisible}
        selectedFilter={selectedFilter}
        onFilterSelect={handleFilterSelect}
        onClose={handleModalClose}
      />
    </>
  );
};
