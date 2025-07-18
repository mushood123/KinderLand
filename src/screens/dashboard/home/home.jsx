import { FlatList } from 'react-native';
import { styles } from './styles';
import { OrderCard } from '../../../components';
import { orders } from './data';
import { OrderUpdateModal } from '../../../components';
import { DeleteConfirmationModal } from '../../../components';
import { useState } from 'react';

export const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    return (
        <>
            <FlatList
                contentContainerStyle={styles.container}
                data={orders}
                keyExtractor={(item) => item.poNumber}
                renderItem={({ item }) => (
                    <OrderCard
                        poNumber={item.poNumber}
                        productCategory={item.productCategory}
                        productName={item.productName}
                        customerName={item.customerName}
                        date={item.date}
                        shippingAddress={item.shippingAddress}
                        status={item.status}
                        onEdit={() => { console.log(`Edit order ${item.poNumber}`); setSelectedOrder(item); setModalVisible(true); console.log('order data', item) }}
                        onDelete={() => { console.log(`Delete order ${item.poNumber}`); setDeleteModalVisible(true); setSelectedOrder(item) }}
                    />
                )}
            /> ?
            <OrderUpdateModal
                visible={modalVisible}
                orderData={selectedOrder}
                onClose={() => setModalVisible(false)}
                onUpdate={(updatedOrder) => {
                    console.log('Updated Order:', updatedOrder);
                    setModalVisible(false);
                }}
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
