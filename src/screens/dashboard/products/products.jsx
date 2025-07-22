import { View, FlatList } from 'react-native';
import { SearchBar, ToolBar, FilterModal, ProductDetailCard } from '../../../components';
import { products, filterOptions } from './data';
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const Products = () => {
  const [expandedProductCode, setExpandedProductCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation = useNavigation();
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
    console.log('filter modal opens')
  }
  const handleFilterModalClose = () => {
    setFilterModal(false)
    console.log("filter modal closes")
  }
  return (
    <View >
      <SearchBar
        placeholder='Search Product'
        onSearch={() => { console.log("Search press") }}
        onClear={() => { console.log("Search Clear") }}
      />
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.productCode.toString()}
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
