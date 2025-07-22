import { View, Text, ScrollView } from "react-native";
import { ProductDetailCard, SearchBar, ToolBar, FilterModal } from "../../../components";
import { styles } from "./styles";
import { products, filterOptions } from "./data";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const SelectProduct = () => {
  const navigation = useNavigation();
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    navigation.navigate('Product Total', { productName: item?.productName });
    console.log("Selected product:", item?.productName);
  };

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
            key={item.productCode.toString()}
            productName={item.productName}
            productCode={item.product}
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