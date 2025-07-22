import React, { useLayoutEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import { customers, filterOptions } from './data';
import { CustomerCard, SearchBar, ToolBar, FilterModal } from '../../../components';
import { useNavigation } from '@react-navigation/native';

export const Customers = () => {
  const navigation = useNavigation();
  const [customerList, setCustomerList] = useState('list');
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

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
    console.log('Customer selected:', customer);
    navigation.navigate("Customer Information", { customer })
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
    navigation.navigate('Create Customer')
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
    <>
      <View style={styles.container}>
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
          key={customerList} // Force re-render when layout changes
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FilterModal
        visible={filterModal}
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
        onClose={handleFilterModalClose}
      />
    </>
  );
};