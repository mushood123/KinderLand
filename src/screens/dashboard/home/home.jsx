import { FlatList } from 'react-native';
import { styles } from './styles';
import { OrderCard } from '../../../components';
import { orders } from './data';
import { DeleteConfirmationModal } from '../../../components';
import { useState } from 'react';
import { Header } from '../../../components';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const navigation = useNavigation();

	const handleEdit = (item) => {
		console.log(`Edit order ${item.poNumber}`);
		setSelectedOrder(item);
		console.log('order data', item)
		navigation.navigate('Edit Order');
	};

	const handleDelete = (item) => {
		console.log(`Delete order ${item.poNumber}`);
		setDeleteModalVisible(true);
		setSelectedOrder(item);
	}

	const handleNotificationPress = () => {
		console.log('Notification pressed');
		navigation.navigate('Notifications');
	};

	return (
		<>
			<Header
				userName="Danny"
				notificationCount={10}
				onNotificationPress={handleNotificationPress}
				onProfilePress={() => console.log('Profile pressed')}
			/>
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
