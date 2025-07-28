import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList } from 'react-native';
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
    screen: 'StoreOrderStatus',
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
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const dropdownRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const measureDropdownPosition = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          top: pageY + height - 60,
          left: pageX,
          width: width,
        });
      });
    }
  };

  const toggleDropdown = () => {
    if (!dropdownVisible) {
      measureDropdownPosition();
    }

    const toValue = dropdownVisible ? 0 : 1;
    setDropdownVisible(!dropdownVisible);

    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handleSelectReport = report => {
    setSelectedReport(report);
    toggleDropdown();
  };

  const SelectedReportComponent = selectedReport.component;

  // Chevron icon component
  const ChevronIcon = ({ isOpen }) => (
    <View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: isOpen ? 0 : 8,
        borderBottomWidth: isOpen ? 8 : 0,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: isOpen ? 'transparent' : '#7a7a7a',
        borderBottomColor: isOpen ? '#7a7a7a' : 'transparent',
        marginLeft: 8,
      }}
    />
  );

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

          {/* Dropdown Button */}
          <TouchableOpacity
            ref={dropdownRef}
            style={{
              backgroundColor: '#f3f7fa',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: dropdownVisible ? '#007AFF' : '#e1e5e9',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={toggleDropdown}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Select report type. Currently selected: ${selectedReport.label}`}
            accessibilityHint="Double tap to open report type options"
          >
            <Text
              style={{
                fontSize: 16,
                color: '#4a4a4a',
                fontWeight: '600',
                flex: 1,
              }}
            >
              {selectedReport.label}
            </Text>
            <ChevronIcon isOpen={dropdownVisible} />
          </TouchableOpacity>

          {/* Enhanced Dropdown */}
          {dropdownVisible && (
            <Animated.View
              style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                right: 16,
                backgroundColor: '#fff',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
                zIndex: 1000,
                maxHeight: 300,
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              }}
            >
              <FlatList
                data={REPORTS}
                keyExtractor={item => item.screen}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      padding: 18,
                      borderBottomWidth: index === REPORTS.length - 1 ? 0 : 1,
                      borderBottomColor: '#f0f0f0',
                      backgroundColor:
                        item.screen === selectedReport.screen
                          ? '#f8f9ff'
                          : 'transparent',
                    }}
                    onPress={() => handleSelectReport(item)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                    accessibilityHint="Double tap to select this report type"
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
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
                          flex: 1,
                        }}
                      >
                        {item.label}
                      </Text>
                      {item.screen === selectedReport.screen && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#007AFF',
                            marginLeft: 8,
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          )}

          {/* Backdrop for closing dropdown */}
          {dropdownVisible && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent',
                zIndex: 999,
              }}
              onPress={toggleDropdown}
              activeOpacity={1}
            />
          )}
        </View>

        {/* Render the selected report component */}
        <View style={{ flex: 1 }}>
          <SelectedReportComponent />
        </View>
      </View>
    </>
  );
};
