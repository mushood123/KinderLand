import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Header } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../context';
import { TotalSales } from './totalSales';
import { SalesByStore } from './salesByStore';
import { AllStyleSold } from './allStyleSold';
import { SalesByStyleFactory } from './salesByStyleFactory';
import { StoreOrderStatus } from './storeOrderStatus';

const REPORTS = [
  { label: 'Total Sales By Date', screen: 'TotalSales', component: TotalSales },
  {
    label: 'Total Sales By Store Name',
    screen: 'SalesByStore',
    component: SalesByStore,
  },
  { label: 'All Styles Sold', screen: 'AllStyleSold', component: AllStyleSold },
  {
    label: 'Store Order Status',
    screen: 'SalesByStyleFactory',
    component: StoreOrderStatus,
  },
  {
    label: 'Factory Style By Store Name',
    screen: 'SalesByStyleFactory',
    component: SalesByStyleFactory,
  },
];

export const Reports = () => {
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(REPORTS[0]);

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  console.log('USER CONTEXT>>>', user);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSelectReport = report => {
    setDropdownVisible(false);
    setSelectedReport(report);
  };

  const SelectedReportComponent = selectedReport.component;

  return (
    <>
      <Header
        userName={user?.firstname || 'User'}
        notificationCount={10}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ padding: 16, backgroundColor: '#fff' }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#4a4a4a',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            Reports
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#f3f7fa',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => setDropdownVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 16, color: '#4a4a4a', fontWeight: '600' }}>
              {selectedReport.label}
            </Text>
            {/* <Ionicons name="chevron-down" size={22} color="#7a7a7a" /> */}
          </TouchableOpacity>
          <Modal
            visible={dropdownVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setDropdownVisible(false)}
          >
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
              onPress={() => setDropdownVisible(false)}
              activeOpacity={1}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 90,
                  left: 20,
                  right: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                }}
              >
                <FlatList
                  data={REPORTS}
                  keyExtractor={item => item.screen}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 18,
                        borderBottomWidth: 1,
                        borderBottomColor: '#f0f0f0',
                      }}
                      onPress={() => handleSelectReport(item)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.screen === selectedReport.screen
                              ? '#007AFF'
                              : '#222',
                          fontWeight:
                            item.screen === selectedReport.screen
                              ? '700'
                              : '500',
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* Render the selected report component */}
        <View style={{ flex: 1 }}>
          <SelectedReportComponent />
        </View>
      </View>
    </>
  );
};
