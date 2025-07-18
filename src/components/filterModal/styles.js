import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    cancelButton: {
        fontSize: 16,
        color: '#6B7280',
    },
    clearButton: {
        fontSize: 16,
        color: '#EF4444',
        fontWeight: '500',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    filterContainer: {
        gap: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    filterButtonSelected: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    filterButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    filterIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    filterButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#374151',
    },
    filterButtonTextSelected: {
        color: '#3B82F6',
        fontWeight: '600',
    },
    checkmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});