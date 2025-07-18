import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

export const OrderCard = ({
    poNumber,
    productCategory,
    productName,
    customerName,
    date,
    shippingAddress,
    status,
    onEdit,
    onDelete,
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#3B82F6';
            case 'Shipped':
                return '#10B981';
            case 'Delivered':
                return '#059669';
            case 'Cancelled':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    const handleEdit = () => {
        console.log('Edit pressed for PO:', poNumber);
        if (onEdit) onEdit();
    };

    const handleDelete = () => {
        console.log('Delete pressed for PO:', poNumber);
        if (onDelete) onDelete();
    };

    return (
        <View style={styles.card}>
            {/* Header Row */}
            <View style={styles.header}>
                <Text style={styles.poNumber}>PO# : {poNumber}</Text>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editIcon}>↗</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteIcon}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Product Information */}
            <Text style={styles.productCategory}>{productCategory}</Text>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.customerName}>{customerName}</Text>
            <Text style={styles.date}>{date}</Text>

            {/* Shipping Address and Status Row */}
            <View style={styles.footer}>
                <View style={styles.shippingSection}>
                    <Text style={styles.shippingLabel}>Shipping Address :</Text>
                    <Text style={styles.shippingAddress}>{shippingAddress}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={[styles.status, { color: getStatusColor(status) }]}>
                        {status}
                    </Text>
                </View>
            </View>
        </View>
    );
};


