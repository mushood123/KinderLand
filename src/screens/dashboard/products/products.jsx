import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { SearchBar, ToolBar, FilterModal, ProductDetailCard } from '../../../components';
import { filterOptions } from './data';
import { transformProductData, filterProducts, extractProductsData } from './helper';
import { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ENDPOINTS, get, post, put, del } from '../../../api';

export const Products = () => {
  const [expandedProductCode, setExpandedProductCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchText, selectedFilter);
  }, [products, searchText, selectedFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <ToolBar
            onMenuPress={handleFilterModalOpen}
            showMenuIcon={true}
          />
        );
      }
    });
  }, [navigation]);

  const handleShowDetails = ({ productCode }) => {
    setExpandedProductCode(expandedProductCode === productCode ? null : productCode);
  }

  const handleFilterModalOpen = () => {
    setFilterModal(true)
  }

  const handleFilterModalClose = () => {
    setFilterModal(false)
  }

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
  }

  const handleSearch = (text) => {
  }

  const handleSearchClear = () => {
    setSearchText('');
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await get(ENDPOINTS.GET_PRODUCTS);

      const productsData = extractProductsData(res);

      if (!productsData) {
        setError('Invalid response format from server');
        setProducts([]);
        return;
      }

      const transformedProducts = productsData.map(transformProductData);
      setProducts(transformedProducts);
    } catch (error) {
      setError(error.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View >
      <SearchBar
        placeholder='Search Product'
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <Text style={{ fontSize: 16, color: '#ff0000', textAlign: 'center', marginHorizontal: 20 }}>
            Error: {error}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#0066cc',
              marginTop: 10,
              textDecorationLine: 'underline'
            }}
            onPress={getProducts}
          >
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <ProductDetailCard
              key={item.id}
              productName={item.productName}
              productCode={item.productCode}
              description={item.description}
              imageUrl={item.imageUrl}
              pricing={item.pricing}
              materials={item.materials}
              local={item.locations}
              showDetails={expandedProductCode === item.productCode}
              onPress={() => {
                handleShowDetails({ productCode: item.productCode })
                setProduct(item)
              }}
              onEditPress={() => { }}
              notes={item.notes}
            />
          )}
        />
      )}
      <FilterModal
        visible={filterModal}
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterSelect={handleFilterSelect}
        onClose={handleFilterModalClose}
      />
    </View>
  );
};
