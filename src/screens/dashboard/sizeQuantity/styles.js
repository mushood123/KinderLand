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
    backButton: {
        padding: 8,
    },
    backIcon: {
        fontSize: 20,
        color: '#374151',
    },
    headerCenter: {
        alignItems: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    productModel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    deleteButton: {
        marginRight: 16,
    },
    deleteIcon: {
        fontSize: 18,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    titleSection: {
        marginTop: 20,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    instructionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    instruction: {
        fontSize: 16,
        color: '#6B7280',
        flex: 1,
    },
    totalPairs: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    quantitySelector: {
        marginBottom: 24,
    },
    quantityScroll: {
        flexDirection: 'row',
    },
    quantityButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    quantityButtonSelected: {
        backgroundColor: '#6B7280',
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    quantityButtonTextSelected: {
        color: '#FFFFFF',
    },
    quantityActionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    quantityActionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    sizeList: {
        paddingBottom: 100,
    },
    floatingCartButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    cartIcon: {
        fontSize: 24,
    },
});