import React, { useState, useLayoutEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import { ProductCard } from '../../../components'
import { productData, filterOptions } from './data.js';
import { styles } from './styles.js';
import { useNavigation } from '@react-navigation/native';
import { FilterModal } from '../../../components';

export const EditOrder = () => {
	const [searchText, setSearchText] = useState('');
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [filterModalVisible, setFilterModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.filterContainer}
					onPress={handleModalOpen}
				>
					<Text style={styles.filterButtonText}>Filter</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const handleModalOpen = () => {
		setFilterModalVisible(true);
		console.log('Filter Modal Opened', filterModalVisible);
	};
	const handleModalClose = () => {
		setFilterModalVisible(false);
		console.log('Filter Modal Closed', selectedFilter);
	};

	const handleSearch = (text) => {
		setSearchText(text);
		console.log('Searching for:', text);
	};

	const handleProductPress = (item) => {
		setSelectedProduct(item);
		navigation.navigate('Size Quantity', { productName: item?.name });
		console.log('Selected product:', item);
	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
					{/* Order Info Section */}
					<View style={styles.orderInfoSection}>
						<View style={styles.orderDetails}>
							<View style={styles.orderInfo}>
								<Text style={styles.orderCategory}>MENS FOOTWEAR / KIRYAS JOEL SHOES</Text>
								<Text style={styles.orderStats}>40 Products</Text>
								<Text style={styles.orderStats}>891 Pairs</Text>
							</View>
							<View style={styles.cartIconContainer}>
								<Text style={styles.cartIcon}>🛒</Text>
							</View>
						</View>
					</View>

					{/* Instruction Text */}
					<Text style={styles.instructionText}>Edit the product for this order.</Text>

					{/* Search Bar */}
					<View style={styles.searchContainer}>
						<Text style={styles.searchIcon}>🔍</Text>
						<TextInput
							style={styles.searchInput}
							placeholder="Search By SKU"
							placeholderTextColor="#999"
							value={searchText}
							onChangeText={handleSearch}
						/>
					</View>

					{/* Product List */}
					<View style={styles.productList}>
						{productData.map((item) => (
							<ProductCard
								key={item.id}
								item={item}
								onPress={handleProductPress}
							/>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
			<FilterModal
				filterOptions={filterOptions}
				visible={filterModalVisible}
				selectedFilter={selectedFilter}
				onFilterSelect={setSelectedFilter}
				onClose={handleModalClose}
			/>
		</>
	);
};
