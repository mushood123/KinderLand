import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { styles } from './styles'
import { useRoute, useNavigation } from '@react-navigation/native'
import { EditCustomerCard, OrderHistoryCard, DeleteConfirmationModal } from '../../../components'
import { orders } from './data'

export const CustomerInformation = () => {
  const [visible, setVisible] = useState(false)
  const [order, setOrder] = useState(null)
  const route = useRoute();
  const navigation = useNavigation();
  const { customer } = route.params;
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
        {orders.map((order) => (
          <OrderHistoryCard
            id={order.poNumber}
            poNumber={order.poNumber}
            productName={order.productName}
            customerName={order.customerName}
            shippingAddress={order.shippingAddress}
            status={order.status}
            onCardPress={handleOrderPress}
            onEditPress={handleOrderEditPress}
            onDeletePress={() => handleOrderDeletePress(order)}

          />
        ))}
      </ScrollView>
      <DeleteConfirmationModal
        visible={visible}
        id={order?.poNumber}
        onCancel={handleModalClose}
        onDelete={() => setVisible(false)}

      />
    </>
  )
}