import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { styles } from './styles';

export const ProductCard = ({ item, onPress }) => {
    const handlePress = () => {
        console.log('Product card pressed:', item.name);
        onPress?.(item);
    };

    return (
        <TouchableOpacity style={styles.productCard} onPress={handlePress}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productModel}>{item.model}</Text>
                <Text style={styles.productColor}>{item.color}</Text>
            </View>

            <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.sizeRange}>19-27 :</Text>
                    <Text style={styles.price}>{item.priceSmall}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.sizeRange}>28-41 :</Text>
                    <Text style={styles.price}>{item.priceLarge}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
