import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { ENDPOINTS, uploadFile } from '../../../api';
import { SignatureCapture } from '../../../components';

export const DigitalSignature = ({ route }) => {
  const navigation = useNavigation();
  const { orderId } = route.params || {};
  const [signature, setSignature] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signatureRef = useRef(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignatureCapture = signatureData => {
    setSignature(signatureData);
    console.log('Signature captured:', signatureData);
  };

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
    setSignature(null);
  };

  const handleAgreementToggle = () => {
    setIsAgreed(!isAgreed);
  };

  const handleReadMore = () => {
    Alert.alert(
      'Terms and Conditions',
      'By placing this order, you agree to our terms and conditions including payment terms, delivery policies, and return policies. All orders are subject to availability and may be cancelled if items are out of stock.',
      [{ text: 'OK' }],
    );
  };

  const handlePlaceOrder = async () => {
    if (!signature) {
      Alert.alert(
        'Error',
        'Please provide your signature before placing the order.',
      );
      return;
    }

    if (!isAgreed) {
      Alert.alert(
        'Error',
        'Please agree to the terms and conditions before placing the order.',
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log('Uploading signature file:', signature);

      const response = await uploadFile(
        ENDPOINTS.UPLOAD_SIGNATURE.replace(':order_number', orderId),
        signature,
        'file',
      );

      console.log('API Response:', response);

      Alert.alert('Success', 'Order placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to home or order confirmation screen
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert(
        'Error',
        error?.message || 'Failed to place order. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Digital Signature</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Signature Area */}
        <View style={styles.signatureContainer}>
          <SignatureCapture
            onSignatureCapture={handleSignatureCapture}
            onClear={handleClearSignature}
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleAgreementToggle}
          >
            <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
              {isAgreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the terms and conditions.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReadMore}>
            <Text style={styles.readMoreText}>Read more</Text>
          </TouchableOpacity>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            (!signature || !isAgreed || isLoading) &&
              styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={!signature || !isAgreed || isLoading}
        >
          <Text style={styles.placeOrderButtonText}>
            {isLoading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
