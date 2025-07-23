import { View, FlatList } from 'react-native';
import { SearchBar, ToolBar, FilterModal, ProductDetailCard } from '../../../components';
import { products, filterOptions } from './data';
import { useState, useLayoutEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

export const Products = () => {
  const [expandedProductCode, setExpandedProductCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Filter products based on search text and selected filter
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();

      filtered = filtered.filter(product => {
        // Search in product name
        if (product.productName.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in product code
        if (product.productCode.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in description
        if (product.description.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Search in materials
        if (product.materials.some(material =>
          material.toLowerCase().includes(searchLower)
        )) {
          return true;
        }

        // Search in notes
        if (product.notes && product.notes.toLowerCase().includes(searchLower)) {
          return true;
        }

        return false;
      });
    }

    // Apply filter modal selection
    if (selectedFilter) {
      switch (selectedFilter) {
        case 'sku':
          // Filter by SKU (Product Code) - show products with specific SKU patterns
          filtered = filtered.filter(product =>
            product.productCode.includes('-') && product.productCode.length >= 6
          );
          break;

        case 'styleName':
          // Filter by Style Name (Product Name) - show products with style-related names
          const styleKeywords = ['pro', 'elite', 'classic', 'vintage', 'retro', 'urban', 'street'];
          filtered = filtered.filter(product =>
            styleKeywords.some(keyword =>
              product.productName.toLowerCase().includes(keyword)
            )
          );
          break;

        case 'articleName':
          // Filter by Article Name (Description) - show products with detailed descriptions
          filtered = filtered.filter(product =>
            product.description.length > 50 &&
            (product.description.toLowerCase().includes('running') ||
              product.description.toLowerCase().includes('casual') ||
              product.description.toLowerCase().includes('performance'))
          );
          break;

        case 'color':
          // Filter by Color (Materials) - show products with specific material types
          const colorMaterials = ['leather', 'suede', 'canvas', 'mesh', 'knit'];
          filtered = filtered.filter(product =>
            product.materials.some(material =>
              colorMaterials.some(colorMaterial =>
                material.toLowerCase().includes(colorMaterial)
              )
            )
          );
          break;

        default:
          break;
      }
    }

    return filtered;
  }, [searchText, selectedFilter]);

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

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
    console.log('Filter selected:', filterId);
  }

  const handleSearch = (text) => {
    console.log('Search triggered:', text);
    // The search is already handled by onChangeText, but we can add additional logic here if needed
  }

  const handleSearchClear = () => {
    setSearchText('');
    console.log("Search cleared");
  }

  return (
    <View >
      <SearchBar
        placeholder='Search Product'
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      <FlatList
        data={filteredProducts}
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
        onFilterSelect={handleFilterSelect}
        onClose={handleFilterModalClose}
      />
    </View>
  );
};
