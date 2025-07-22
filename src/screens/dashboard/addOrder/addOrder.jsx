import React, { useLayoutEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { SearchBar, ToolBar, FilterModal, CustomerCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { customers, filterOptions } from "./data";

export const AddOrder = () => {
  const [customerList, setCustomerList] = useState('list');
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <ToolBar
            onGridPress={handleGridPress}
            onMenuPress={handleFilterModalOpen}
            onAddNewPress={handleAddNewPress}
            addButtonText='Add'
            showGridIcon={true}
            showMenuIcon={true}
            showAddButton={true}
          />
        );
      }
    });
  }, [navigation]);

  const handleCustomerPress = (customer) => {
    console.log('customer selected:', customer);
    navigation.navigate('Select Product', customer)
  }

  const handleSearch = (text) => {
    console.log('Search text:', text);
  };

  const handleClearSearch = () => {
    console.log('Search cleared');
  };

  const handleGridPress = () => {
    console.log('Grid view pressed');
    setCustomerList((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  const handleAddNewPress = () => {
    console.log('Add New pressed');
  };
  const handleFilterModalOpen = () => {
    setFilterModal(true)
    console.log('filter modal opens')
  }
  const handleFilterModalClose = () => {
    setFilterModal(false)
    console.log("filter modal closes")
  }
  const renderCustomerItem = ({ item }) => (
    <CustomerCard
      key={item.id}
      shopName={item.shopName}
      address={item.address}
      name={item.name}
      id={item.id}
      layout={customerList}
      onPress={(customer) => handleCustomerPress(customer)}
    />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please select the customer for this order.</Text>
      <SearchBar
        placeholder="Search Customers"
        onChangeText={(text) => console.log('Search text:', text)}
        onSearch={(text) => handleSearch(text)}
        onClear={() => handleClearSearch()}
      />
      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={customerList === 'grid' ? 2 : 1}
        key={customerList}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
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
}