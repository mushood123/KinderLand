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
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { styles } from './styles';
import { UserContext } from '../../../context';
import { ENDPOINTS, get, post } from '../../../api';
import { axiosInstance } from '../../../api/axiosInstance';

export const SalesByStyleFactory = () => {
  const { user } = React.useContext(UserContext);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const commafunc = amount => {
    if (!amount && amount !== 0) return '';
    const options = { style: 'currency', currency: 'USD' };
    return amount.toLocaleString('en-US', options);
  };

  const formatDisplayDate = date => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateForAPI = date => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const fetchTotalSales = async () => {
    setLoading(true);
    try {
      const tokenResponse = await post(ENDPOINTS.GET_TOKEN, {
        id: user?.id || '1',
      });
      const response = await axiosInstance.post(
        ENDPOINTS.FACTORY_STYLE_BY_STORE_NAME,
        {
          StartDate: formatDateForAPI(startDate),
          EndDate: formatDateForAPI(endDate),
        },
        {
          headers: {
            'x-auth-header': tokenResponse.token,
          },
        },
      );
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching total sales:', error);
      Alert.alert('Error', 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalSales();
    // Remove automatic fetching - now controlled by search button
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

  const renderHeader = () => (
    <View style={[styles.tableHeader, { marginTop: 8 }]}>
      <Text style={[styles.headerCell, { paddingRight: 70 }]}>Store Name</Text>
      <Text style={[styles.headerCell, { paddingRight: 30 }]}>Style</Text>
      <Text style={[styles.headerCell, { paddingLeft: 30 }]}>Sku</Text>
      <Text style={styles.headerCell}>Color</Text>
      <Text style={styles.headerCell}>Pairs Sold</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { paddingRight: 80 }]}>{item.storeName}</Text>
      <Text style={[styles.cell, { paddingRight: 80 }]}>
        {item.StyleFactory}
      </Text>
      <Text style={styles.cell}>{item['SKU']}</Text>
      <Text style={[styles.cell, { paddingRight: 60 }]}>{item.color}</Text>
      <Text style={styles.cell}>{item.Pairs}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading sales data...</Text>
      </View>
    );
  }

  // Since we now have default dates, we don't need this condition anymore

  const isFilteredData = filteredData.length === 0 && !loading;

  return (
    <View style={styles.container}>
      {/* Date Input Fields - Matching the UI design */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              marginBottom: 4,
              fontWeight: '500',
            }}
          >
            Start Date :
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={{ color: '#333', fontSize: 14 }}>
              {formatDisplayDate(startDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              marginBottom: 4,
              fontWeight: '500',
            }}
          >
            End Date :
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={{ color: '#333', fontSize: 14 }}>
              {formatDisplayDate(endDate)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sort Dropdown */}
        <View style={{ marginLeft: 8 }}>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              marginBottom: 4,
              fontWeight: '500',
            }}
          >
            Sort
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: 80,
            }}
            onPress={() => setShowSortDropdown(!showSortDropdown)}
          >
            <Text style={{ color: '#333', fontSize: 14, marginRight: 4 }}>
              {sortAsc ? 'A-Z' : 'Z-A'}
            </Text>
            <Text style={{ color: '#666', fontSize: 12 }}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          paddingHorizontal: 16,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          marginHorizontal: 16,
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ fontSize: 16, color: '#666', marginRight: 8 }}>🔍</Text>
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 12,
            fontSize: 14,
            color: '#333',
          }}
          placeholder="Search"
          value={filter}
          onChangeText={setFilter}
          placeholderTextColor="#999"
        />
      </View>

      {/* Search Button */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={fetchTotalSales}
          disabled={loading}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {loading ? 'Searching...' : 'Search Sales'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showStartDatePicker}
        date={startDate}
        mode="date"
        onConfirm={date => {
          setShowStartDatePicker(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setShowStartDatePicker(false);
        }}
      />

      <DatePicker
        modal
        open={showEndDatePicker}
        date={endDate}
        mode="date"
        onConfirm={date => {
          setShowEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setShowEndDatePicker(false);
        }}
      />

      {/* Sort Dropdown Modal */}
      <Modal
        visible={showSortDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortDropdown(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          activeOpacity={1}
          onPress={() => setShowSortDropdown(false)}
        >
          <View
            style={{
              position: 'absolute',
              top: 200,
              right: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 8,
              minWidth: 120,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0',
              }}
              onPress={() => {
                setSortAsc(true);
                setShowSortDropdown(false);
              }}
            >
              <Text
                style={{
                  color: sortAsc ? '#007AFF' : '#333',
                  fontWeight: sortAsc ? '600' : '400',
                }}
              >
                A-Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
              onPress={() => {
                setSortAsc(false);
                setShowSortDropdown(false);
              }}
            >
              <Text
                style={{
                  color: !sortAsc ? '#007AFF' : '#333',
                  fontWeight: !sortAsc ? '600' : '400',
                }}
              >
                Z-A
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      {renderHeader()}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {/* {isFilteredData ? null : renderFooter()} */}
      {isFilteredData && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No sales data found</Text>
        </View>
      )}
    </View>
  );
};
