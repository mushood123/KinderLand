import React, { useLayoutEffect, useState, useMemo } from 'react';
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
  const [searchText, setSearchText] = useState('');

  // Filter and sort customers based on search text and selected filter
  const filteredCustomers = useMemo(() => {
    let result = customers;

    // First apply search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();
      result = result.filter(customer => {
        const shopNameMatch = customer.shopName.toLowerCase().includes(searchLower);
        const nameMatch = customer.name.toLowerCase().includes(searchLower);
        const addressMatch = customer.address.toLowerCase().includes(searchLower);

        return shopNameMatch || nameMatch || addressMatch;
      });
    }

    // Then apply sorting/filtering based on selected filter
    if (selectedFilter) {
      switch (selectedFilter) {
        case 'nameAsc':
          result = [...result].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          result = [...result].sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'storeNameAsc':
          result = [...result].sort((a, b) => a.shopName.localeCompare(b.shopName));
          break;
        case 'storeNameDesc':
          result = [...result].sort((a, b) => b.shopName.localeCompare(a.shopName));
          break;
        case 'location':
          // Group by state (extract state from address)
          result = [...result].sort((a, b) => {
            const stateA = a.address.split(',').pop()?.trim() || '';
            const stateB = b.address.split(',').pop()?.trim() || '';
            return stateA.localeCompare(stateB);
          });
          break;
        default:
          break;
      }
    }

    return result;
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
    console.log('Customer selected:', customer);
    navigation.navigate("Customer Information", { customer })
  }

  const handleSearch = (text) => {
    console.log('Search triggered:', text);
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
    navigation.navigate('Create Customer')
  };

  const handleFilterModalOpen = () => {
    setFilterModal(true)
    console.log('filter modal opens')
  };

  const handleFilterModalClose = () => {
    setFilterModal(false)
    console.log("filter modal closes")
  };

  const handleFilterSelect = (filterId) => {
    console.log('Filter selected:', filterId);
    setSelectedFilter(filterId);
    setFilterModal(false);
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
    <>
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Customers"
          value={searchText}
          onChangeText={setSearchText}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
        <FlatList
          data={filteredCustomers}
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
        onFilterSelect={handleFilterSelect}
        onClose={handleFilterModalClose}
      />
    </>
  );
};