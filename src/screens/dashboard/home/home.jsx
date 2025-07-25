import { FlatList } from 'react-native';
import { styles } from './styles';
import { OrderCard } from '../../../components';
import { orders as dummyOrders } from './data';
import { DeleteConfirmationModal } from '../../../components';
import { useState, useContext, useEffect } from 'react';
import { Header } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../context';
import { ENDPOINTS, get, post, put, del } from '../../../api';
export const Home = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const handleEdit = item => {
    console.log(`Edit order ${item.poNumber}`);
    setSelectedOrder(item);
    console.log('order data', item);
    navigation.navigate('Edit Order');
  };

  const handleDelete = item => {
    console.log(`Delete order ${item.poNumber}`);
    setDeleteModalVisible(true);
    setSelectedOrder(item);
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
    navigation.navigate('Notifications');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    navigation.navigate('Profile');
  };

  const getOrders = async () => {
    const res = await get(ENDPOINTS.HISTORY_ORDERS, {});
    console.log('orders', res);
    setOrders(res);
  };

  useEffect(() => {
    getOrders();
  }, []);
  console.log('orders >>> ', orders);
  return (
    <>
      <Header
        userName={user?.firstname || 'User'}
        notificationCount={10}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={orders}
        keyExtractor={item => item.poNumber}
        renderItem={({ item }) => (
          <OrderCard
            poNumber={item.orderNumber}
            productCategory={item.productCategory}
            productName={item.storeName}
            customerName={item.customerName}
            date={item.orderDate}
            shippingAddress={item.shippingAddress}
            status={item.status}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      />
      <DeleteConfirmationModal
        id={selectedOrder?.poNumber}
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onDelete={() => setDeleteModalVisible(false)}
      />
    </>
  );
};
