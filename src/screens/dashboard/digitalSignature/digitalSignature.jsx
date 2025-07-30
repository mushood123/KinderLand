import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  BackHandler,
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

  useEffect(() => {
    if (!orderId) {
      Alert.alert(
        'Error',
        'Order ID is missing. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  }, [orderId, navigation]);

  useEffect(() => {
    const backAction = () => {
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [signature]);

  const handleBack = () => {
    if (signature) {
      Alert.alert(
        'Discard Changes',
        'You have an unsaved signature. Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: () => navigation.goBack(),
            style: 'destructive',
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const validateSignature = (signatureData) => {
    if (!signatureData) {
      return false;
    }

    if (!signatureData.uri || !signatureData.type || !signatureData.name) {
      return false;
    }

    if (!signatureData.type.includes('image/png')) {
      return false;
    }

    if (!signatureData.uri.startsWith('data:image') && !signatureData.uri.startsWith('file://')) {
      return false;
    }

    if (signatureData.uri.includes('base64,')) {
      const base64Part = signatureData.uri.split('base64,')[1];
      if (!base64Part || base64Part.length < 100) {
        return false;
      }
    }

    return true;
  };

  const handleSignatureCapture = signatureData => {
    if (signatureData === undefined) {
      Alert.alert('Error', 'Failed to capture signature. Please try again.');
      return;
    }

    if (signatureData === null) {
      Alert.alert('Error', 'Signature data is empty. Please try again.');
      return;
    }

    if (!validateSignature(signatureData)) {
      Alert.alert('Error', 'Invalid signature format. Please try again.');
      return;
    }

    setSignature(signatureData);
  };

  const handleClearSignature = () => {
    setSignature(null);
  };

  const handleAgreementToggle = () => {
    setIsAgreed(!isAgreed);
  };

  const handleReadMore = () => {
    Alert.alert(
      'Terms and Conditions',
      'By placing this order, you agree to our terms and conditions including payment terms, delivery policies, and return policies. All orders are subject to availability and may be cancelled if items are out of stock.\n\nFor complete terms and conditions, please visit our website or contact customer support.',
      [{ text: 'OK' }],
    );
  };

  const processOrder = async () => {
    setIsLoading(true);

    try {
      if (!signature.uri || !signature.type) {
        throw new Error('Invalid signature file format');
      }

      const response = await uploadFile(
        ENDPOINTS.UPLOAD_SIGNATURE.replace(':order_number', orderId),
        signature,
        'file',
      );
      console.log('response from digital signature', response);

      if (!response) {
        throw new Error('No response received from server');
      }

      if (response.error) {
        throw new Error(response.message || 'Upload failed');
      }

      Alert.alert('Success', 'Order placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Generate PDF', { orderId });
          },
        },
      ]);
    } catch (error) {
      let errorMessage = 'Failed to place order. Please try again.';

      if (error.message.includes('network') || error.message.includes('timeout')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('Invalid')) {
        errorMessage = 'Signature format is invalid. Please provide a new signature.';
      } else if (error.message.includes('server')) {
        errorMessage = 'Server error. Please try again later.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
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

    Alert.alert(
      'Confirm Order',
      `Are you sure you want to place order #${orderId}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => processOrder(),
        },
      ]
    );
  };

  const renderLoadingButton = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#FFFFFF" />
      <Text style={[styles.placeOrderButtonText, { marginLeft: 10 }]}>
        Processing...
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Digital Signature</Text>
          <View style={styles.headerSpacer} />
        </View>

        {orderId && (
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfoText}>Order ID: {orderId}</Text>
          </View>
        )}

        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Please provide your signature:</Text>
          <SignatureCapture
            ref={signatureRef}
            onSignatureCapture={handleSignatureCapture}
            onClear={handleClearSignature}
          />

          <View style={styles.signatureStatus}>
            <Text style={[
              styles.signatureStatusText,
              signature ? styles.signatureStatusSuccess : styles.signatureStatusPending
            ]}>
              {signature ? '✓ Signature captured' : 'Signature required'}
            </Text>
          </View>
        </View>

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

        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            (!signature || !isAgreed || isLoading) &&
            styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={!signature || !isAgreed || isLoading}
        >
          {isLoading ? renderLoadingButton() : (
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};