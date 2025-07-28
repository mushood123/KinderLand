import React, { useState, useContext, useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from './styles'
import { useRoute, useNavigation } from '@react-navigation/native'
import { EditCustomerCard, OrderHistoryCard, DeleteConfirmationModal } from '../../../components'
import { UserContext } from '../../../context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ENDPOINTS } from '../../../api'
import { post } from '../../../api'

export const CustomerInformation = () => {
  const [visible, setVisible] = useState(false)
  const [order, setOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const route = useRoute();
  const navigation = useNavigation();
  const { customer } = route.params;
  const { user, loading: userLoading } = useContext(UserContext);
  const token = AsyncStorage.getItem('token');

  console.log('token', token)

  useEffect(() => {
    if (!userLoading && user && Object.keys(user).length > 0) {
      fetchOrders();
    }
  }, [userLoading, user]);

  const fetchOrders = async () => {
    if (!user || !user._id) {
      console.log('No user data available, skipping fetch');
      setLoading(false);
      return;
    }

    console.log('fetching orders', customer.id, user._id)
    try {
      setLoading(true);
      const response = await post(ENDPOINTS.GET_ORDER_DETAILS, {
        customer_id: customer.id,
        agentId: user._id
      });
      console.log('response', response)
      setOrders(response.Orders || []);
    } catch (error) {
      console.log('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPress = () => {
    navigation.navigate('Edit Customer', { customer })
  }
  const handleOrderDeletePress = (order) => {
    console.log('delete model true', order)
    setVisible(true)
    setOrder(order)
  };
  const handleOrderEditPress = () => { };
  const handleOrderPress = () => { };
  const handleModalClose = () => {
    setVisible(false)
  }

  const handleDeleteOrder = async () => {
    try {
      if (!order) return;

      const response = await post(ENDPOINTS.DELETE_ORDER, {
        order_number: order.order_number
      });

      console.log('Order deleted successfully:', response);

      // Refresh the orders list after deletion
      await fetchOrders();

      // Close the modal
      setVisible(false);
      setOrder(null);
    } catch (error) {
      console.log('Error deleting order:', error);
      // You might want to show an error message to the user here
    }
  };
  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <EditCustomerCard
          customerId={customer.id}
          customerName={customer.shopName}
          phoneNumber={'1234567890'}
          shippingAddress={customer.address}
          onCardPress={() => { }}
          onEditPress={handleEditPress}
        />
        <Text style={styles.orderHistoryText} >Order History</Text>
        {userLoading ? (
          <Text style={styles.loadingText}>Loading user data...</Text>
        ) : loading ? (
          <Text style={styles.loadingText}>Loading orders...</Text>
        ) : orders.length > 0 ? (
          orders
            .filter((order, index, self) =>
              index === self.findIndex(o => o.order_number === order.order_number)
            )
            .map((order) => (
              <OrderHistoryCard
                key={order._id}
                id={order._id}
                poNumber={order.order_number}
                productName={order.articleName}
                customerName={order.customerName}
                shippingAddress={`${order.shipToStreet}, ${order.shipToCity}, ${order.shipToCountry}, ${order.shipToPostcode}`}
                status={order.status}
                onCardPress={handleOrderPress}
                onEditPress={handleOrderEditPress}
                onDeletePress={() => handleOrderDeletePress(order)}
              />
            ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found</Text>
        )}
      </ScrollView>
      <DeleteConfirmationModal
        visible={visible}
        id={order?.order_number}
        onCancel={handleModalClose}
        onDelete={handleDeleteOrder}
      />
    </>
  )
}