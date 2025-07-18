import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    filterButton: {
        padding: 8,
    },
    filterIcon: {
        fontSize: 18,
        color: '#374151',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    orderInfoSection: {
        marginTop: 16,
        marginBottom: 20,
    },
    editOrderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderInfo: {
        flex: 1,
    },
    orderCategory: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 4,
    },
    orderStats: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    cartIconContainer: {
        marginLeft: 16,
    },
    cartIcon: {
        fontSize: 24,
    },
    instructionText: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 12,
        color: '#6B7280',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    productList: {
        paddingBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    filterButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'black',
    },
});