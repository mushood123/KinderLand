import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sizeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    sizeCardSelected: {
        borderColor: '#3B82F6',
        backgroundColor: '#F8FAFF',
    },
    sizeInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sizeNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
        marginRight: 16,
        minWidth: 40,
    },
    sizeDetails: {
        flex: 1,
        gap: 2,
    },
    sizeModel: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    sizeColor: {
        fontSize: 14,
        color: '#6B7280',
    },
    quantityBadge: {
        backgroundColor: '#DC2626',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 12,
    },
    quantityBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    totalPrice: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
        marginBottom: 2,
    },
    unitPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
});