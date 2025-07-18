import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    poNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        fontSize: 16,
        color: '#6B7280',
    },
    deleteButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        fontSize: 14,
    },
    productCategory: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 2,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 2,
    },
    customerName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 2,
    },
    date: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    shippingSection: {
        flex: 1,
    },
    shippingLabel: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
        marginBottom: 2,
    },
    shippingAddress: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    statusContainer: {
        marginLeft: 16,
    },
    status: {
        fontSize: 16,
        fontWeight: '600',
    },
});