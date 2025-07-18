import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { styles } from './styles';

export const OrderUpdateModal = ({ visible, orderData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(orderData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(orderData);
        setErrors({});
    }, [orderData]);

    const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.poNumber.trim()) {
            newErrors.poNumber = 'PO Number is required';
        }

        if (!formData.productCategory.trim()) {
            newErrors.productCategory = 'Product Category is required';
        }

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Customer Name is required';
        }

        if (!formData.date.trim()) {
            newErrors.date = 'Date is required';
        }

        if (!formData.shippingAddress.trim()) {
            newErrors.shippingAddress = 'Shipping Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            console.log('Updating order:', formData);
            onUpdate(formData);
            onClose();
        }
    };

    const handleCancel = () => {
        setFormData(orderData);
        setErrors({});
        onClose();
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

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

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={handleCancel}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Update Order</Text>
                    <TouchableOpacity onPress={handleUpdate}>
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* PO Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>PO Number</Text>
                        <TextInput
                            style={[styles.input, errors.poNumber ? styles.inputError : null]}
                            value={formData?.poNumber}
                            onChangeText={(text) => updateField('poNumber', text)}
                            placeholder="Enter PO Number"
                        />
                        {errors.poNumber && <Text style={styles.errorText}>{errors.poNumber}</Text>}
                    </View>

                    {/* Product Category */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Product Category</Text>
                        <TextInput
                            style={[styles.input, errors.productCategory ? styles.inputError : null]}
                            value={formData?.productCategory}
                            onChangeText={(text) => updateField('productCategory', text)}
                            placeholder="Enter Product Category"
                            multiline
                        />
                        {errors.productCategory && <Text style={styles.errorText}>{errors.productCategory}</Text>}
                    </View>

                    {/* Product Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Product Name</Text>
                        <TextInput
                            style={styles.input}
                            value={formData?.productName}
                            onChangeText={(text) => updateField('productName', text)}
                            placeholder="Enter Product Name (Optional)"
                        />
                    </View>

                    {/* Customer Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Customer Name</Text>
                        <TextInput
                            style={[styles.input, errors.customerName ? styles.inputError : null]}
                            value={formData?.customerName}
                            onChangeText={(text) => updateField('customerName', text)}
                            placeholder="Enter Customer Name"
                        />
                        {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}
                    </View>

                    {/* Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date</Text>
                        <TextInput
                            style={[styles.input, errors.date ? styles.inputError : null]}
                            value={formData?.date}
                            onChangeText={(text) => updateField('date', text)}
                            placeholder="DD-MM-YYYY"
                        />
                        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
                    </View>

                    {/* Shipping Address */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Shipping Address</Text>
                        <TextInput
                            style={[styles.textArea, errors.shippingAddress ? styles.inputError : null]}
                            value={formData?.shippingAddress}
                            onChangeText={(text) => updateField('shippingAddress', text)}
                            placeholder="Enter Shipping Address"
                            multiline
                            numberOfLines={3}
                        />
                        {errors.shippingAddress && <Text style={styles.errorText}>{errors.shippingAddress}</Text>}
                    </View>

                    {/* Status Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Status</Text>
                        <View style={styles.statusContainer}>
                            {statusOptions.map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        styles.statusOption,
                                        formData?.status === status && styles.statusOptionSelected,
                                        { borderColor: getStatusColor(status) }
                                    ]}
                                    onPress={() => updateField('status', status)}
                                >
                                    <Text
                                        style={[
                                            styles.statusOptionText,
                                            formData?.status === status && { color: getStatusColor(status) }
                                        ]}
                                    >
                                        {status}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};
