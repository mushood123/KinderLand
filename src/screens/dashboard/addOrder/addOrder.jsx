import React, { useLayoutEffect, useState, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { SearchBar, ToolBar, FilterModal, CustomerCard } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { customers, filterOptions } from "./data";

export const AddOrder = () => {
  const [customerList, setCustomerList] = useState('list');
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Filter customers based on search text and selected filter
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    // First apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();
      filtered = filtered.filter(customer => {
        const shopName = customer.shopName.toLowerCase();
        const name = customer.name.toLowerCase();
        const address = customer.address.toLowerCase();

        return shopName.includes(searchLower) ||
          name.includes(searchLower) ||
          address.includes(searchLower);
      });
    }

    // Then apply sorting filter
    if (selectedFilter) {
      filtered = [...filtered].sort((a, b) => {
        switch (selectedFilter) {
          case 'storeName':
            return a.shopName.localeCompare(b.shopName);
          case 'storeNameDesc':
            return b.shopName.localeCompare(a.shopName);
          case 'customerName':
            return a.name.localeCompare(b.name);
          case 'customerNameDesc':
            return b.name.localeCompare(a.name);
          case 'address':
            return a.address.localeCompare(b.address);
          case 'addressDesc':
            return b.address.localeCompare(a.address);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [searchText, selectedFilter]);

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
    setSearchText(text);
  };

  const handleClearSearch = () => {
    console.log('Search cleared');
    setSearchText('');
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

  const handleFilterSelect = (filterId) => {
    console.log('Filter selected:', filterId);
    setSelectedFilter(filterId);
    if (filterId !== null) {
      setFilterModal(false);
    }
  };

  const handleClearFilter = () => {
    console.log('Filter cleared');
    setSelectedFilter(null);
  };
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
        value={searchText}
        onChangeText={handleSearch}
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />
      <FlatList
        data={filteredCustomers}
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
        onFilterSelect={handleFilterSelect}
        onClose={handleFilterModalClose}
      />
    </View>
  );
}