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
// import DatePicker from 'react-native-date-picker';
import { styles } from './styles';
import { UserContext } from '../../../context';
import { ENDPOINTS, get, post } from '../../../api';
import { axiosInstance } from '../../../api/axiosInstance';

export const AllStyleSold = () => {
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

  const fetchAllStyleSold = async () => {
    setLoading(true);
    try {
      const tokenResponse = await post(ENDPOINTS.GET_TOKEN, {
        id: user?.id || '1',
      });
      const response = await axiosInstance.post(
        ENDPOINTS.ALL_STYLE_SOLD,
        {
          StartDate: '05/02/2008',
          EndDate: '23/07/2025',

          // StartDate: formatDateForAPI(startDate),
          // EndDate: formatDateForAPI(endDate),
        },
        {
          headers: {
            'x-auth-header': tokenResponse.token,
          },
        },
      );

      console.log('RESPONSE onALL>>> ', response);

      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching all styles sold:', error);
      Alert.alert('Error', 'Failed to fetch styles data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStyleSold();
  }, []);

  let filteredData = customers.filter(item => {
    if (filter === '') return true;
    console.log('ITEMMMM >>>', item);
    return (
      (item.style && item.style.toLowerCase().includes(filter.toLowerCase())) ||
      (item.sku && item.sku.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  // Sort by Style
  filteredData = filteredData.sort((a, b) => {
    if (!a.style || !b.style) return 0;
    return sortAsc
      ? a.style.localeCompare(b.style)
      : b.style.localeCompare(a.style);
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
      <Text style={styles.headerCell}>Style</Text>
      <Text style={styles.headerCell}>SKU</Text>
      <Text style={[styles.headerCell, { flex: 2 }]}>Color</Text>
      <Text style={styles.headerCell}>Pairs Sold</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.Style}</Text>
      <Text style={styles.cell}>{item.sku}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.Color}</Text>
      <Text style={styles.cell}>{item.PairsSold}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading styles data...</Text>
      </View>
    );
  }
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
          placeholder="Search by Style & SKU"
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
          onPress={fetchAllStyleSold}
          disabled={loading}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {loading ? 'Searching...' : 'Search Styles'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      {/* <DatePicker
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
      /> */}

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
      {isFilteredData && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No styles data found</Text>
        </View>
      )}
    </View>
  );
};
