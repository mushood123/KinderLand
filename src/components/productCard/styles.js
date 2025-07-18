import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    productModel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    productColor: {
        fontSize: 14,
        color: '#6B7280',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    sizeRange: {
        fontSize: 14,
        color: '#6B7280',
        marginRight: 8,
        minWidth: 50,
    },
    price: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3B82F6',
    },
});