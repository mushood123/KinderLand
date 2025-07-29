import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { UserContext } from '../../../context';
import { ENDPOINTS, get, post } from '../../../api';
import { axiosInstance } from '../../../api/axiosInstance';

export const SalesByStore = () => {
  const { user } = React.useContext(UserContext);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const commafunc = amount => {
    if (!amount && amount !== 0) return '';
    const options = { style: 'currency', currency: 'USD' };
    return amount.toLocaleString('en-US', options);
  };

  const fetchSalesByStore = async () => {
    setLoading(true);
    try {
      const tokenResponse = await post(ENDPOINTS.GET_TOKEN, {
        id: user?.id || '1',
      });
      const response = await axiosInstance.post(
        ENDPOINTS.TOTAL_SALES_BY_STORE_NAME,
        {},
        {
          headers: {
            'x-auth-header': tokenResponse.token,
          },
        },
      );
      console.log('REPONSE>>>> ', response);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching sales by store:', error);
      Alert.alert('Error', 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesByStore();
  }, []);

  let filteredData = customers.filter(item => {
    if (filter === '') return true;
    return (
      item.storeName &&
      item.storeName.toLowerCase().includes(filter.toLowerCase())
    );
  });

  // Sort by Store Name
  filteredData = filteredData.sort((a, b) => {
    if (!a.storeName || !b.storeName) return 0;
    return sortAsc
      ? a.storeName.localeCompare(b.storeName)
      : b.storeName.localeCompare(a.storeName);
  });

  // Subtotals
  const totalPairs = filteredData.reduce(
    (sum, item) => sum + (item.PairsSold || 0),
    0,
  );
  const totalAmount = filteredData.reduce(
    (sum, item) => sum + (item.Totalsales || 0),
    0,
  );

  const renderHeader = () => (
    <View style={[styles.tableHeader, { marginTop: 8 }]}>
      <Text style={[styles.headerCell, { flex: 2 }]}>Store Name</Text>
      <Text style={styles.headerCell}>Total Pairs Sold</Text>
      <Text style={styles.headerCell}>Total Amount Sold</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.storeName}</Text>
      <Text style={styles.cell}>{item.PairsSold}</Text>
      <Text style={styles.cell}>{commafunc(item.Totalsales)}</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.subtotalRow}>
      <Text style={[styles.cell, { flex: 2, fontWeight: 'bold' }]}>
        Subtotal
      </Text>
      <Text style={[styles.cell, { fontWeight: 'bold' }]}>{totalPairs}</Text>
      <Text style={[styles.cell, { fontWeight: 'bold' }]}>
        {commafunc(totalAmount)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading store sales data...</Text>
      </View>
    );
  }
  const isFilteredData = filteredData.length === 0 && !loading;

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
      >
        <TextInput
          style={[styles.searchInput, { flex: 1 }]}
          placeholder="Search by Store Name"
          value={filter}
          onChangeText={setFilter}
        />
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={() => setSortAsc(s => !s)}
        >
          <Text style={{ fontWeight: 'bold' }}>{sortAsc ? 'A-Z' : 'Z-A'}</Text>
        </TouchableOpacity>
      </View>
      {renderHeader()}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {isFilteredData ? null : renderFooter()}
      {isFilteredData && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No store sales data found</Text>
        </View>
      )}
    </View>
  );
};
