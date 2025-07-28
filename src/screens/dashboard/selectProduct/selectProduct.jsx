import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { ProductDetailCard, SearchBar, ToolBar, FilterModal } from "../../../components";
import { styles } from "./styles";
import { filterOptions } from "./data";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { get, ENDPOINTS } from "../../../api";

export const SelectProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customer } = route.params;
  console.log("customer from select product", customer)

  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(customer);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ToolBar
          onMenuPress={handleFilterModalOpen}
          showMenuIcon={true}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get(ENDPOINTS.GET_PRODUCTS);

      // Map API response to match ProductDetailCard expected format
      const mappedProducts = response.map(product => ({
        id: product._id,
        productName: product.Stylename || product.ArticleName,
        productCode: product.sku,
        description: product.Description || 'No description available',
        imageUrl: product.Picture || 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&h=60&w=60',
        pricing: {
          sizeRange1: product.Size1 || 'N/A',
          price1: `$${product.Price1 || '0.00'}`,
          sizeRange2: product.Size2 || 'N/A',
          price2: `$${product.Price2 || '0.00'}`
        },
        materials: [
          product.Material1,
          product.Material2,
          product.Material3,
          product.Material4,
          product.Material5,
          product.Material6
        ].filter(Boolean),
        locations: [
          product.Location1,
          product.Location2,
          product.Location3,
          product.Location4,
          product.Location5,
          product.Location6
        ].filter(Boolean).map(location => `${location} - Available`),
        notes: product.Notes || 'No additional notes',
        // Additional API fields for reference
        brand: product.Brand,
        season: product.Season,
        outsoleColor: product.Outsolecolor,
        outsoleType: product.Outsoletype,
        stitch: product.Stitch,
        styleFactory: product.StyleFactory,
        factory: product.Factory
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.log('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterModalOpen = () => {
    setFilterModal(true);
    console.log('filter modal opens');
  };

  const handleFilterModalClose = () => {
    setFilterModal(false);
    console.log("filter modal closes");
  };

  const handleProductPress = (item) => {
    setSelectedProduct(item);
    console.log("selected product from select product", selectedProduct)
    navigation.navigate('Product Total', { product: item, customer: selectedCustomer });
    console.log("Selected product:", item?.productName);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
        <Text style={{ color: '#007AFF' }} onPress={fetchProducts}>Tap to retry</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please select the product for this order</Text>
      <SearchBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {products.map((item) => (
          <ProductDetailCard
            key={item.id}
            productName={item.productName}
            productCode={item.productCode}
            description={item.description}
            imageUrl={item.imageUrl}
            pricing={item.pricing}
            materials={item.materials}
            local={item.locations}
            showDetails={false}
            onPress={() => handleProductPress(item)}
            onEditPress={() => { }}
            notes={item.notes}
          />
        ))}
      </ScrollView>
      <FilterModal
        visible={filterModal}
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
        onClose={handleFilterModalClose}
      />
    </View>
  );
};