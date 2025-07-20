import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { renderInput, validateForm } from './helper';
import { styles } from './styles';


export const EditProfile = () => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  const isSmallScreen = width < 400;

  const [formData, setFormData] = useState({
    firstName: 'Danny',
    lastName: 'Farago',
    companyName: '',
    email: 'danny@venettini.app',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    previousPassword: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChangePassword = () => {
    setShowPasswordFields(!showPasswordFields);
    if (!showPasswordFields) {
      setPasswordData({ previousPassword: '', newPassword: '' });
      setErrors(prev => ({
        ...prev,
        previousPassword: undefined,
        newPassword: undefined,
      }));
    }
  };

  const handleUpdate = () => {
    if (validateForm(setErrors, formData, showPasswordFields, passwordData)) {
      console.log('Form Data:', formData);
      if (showPasswordFields) {
        console.log('Password Change Requested');
      }
      Alert.alert('Success', 'Profile updated successfully!');
    } else {
      Alert.alert('Validation Error', 'Please fix the errors and try again.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={[styles.profileImageContainer, isTablet && styles.profileImageContainerTablet]}>
            <Image
              source={{ uri: '/placeholder.svg?height=100&width=100' }}
              style={[styles.profileImage, isTablet && styles.profileImageTablet]}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={[
            styles.row,
            isSmallScreen && styles.rowSmall,
            isTablet && styles.rowTablet
          ]}>
            <View style={[styles.halfWidth, isSmallScreen && styles.fullWidth]}>
              {renderInput(
                'First Name',
                formData.firstName,
                (text) => handleInputChange('firstName', text),
                errors.firstName
              )}
            </View>
            <View style={[styles.halfWidth, isSmallScreen && styles.fullWidth]}>
              {renderInput(
                'Last Name',
                formData.lastName,
                (text) => handleInputChange('lastName', text),
                errors.lastName
              )}
            </View>
          </View>

          <View style={[
            styles.row,
            isSmallScreen && styles.rowSmall,
            isTablet && styles.rowTablet
          ]}>
            <View style={[styles.halfWidth, isSmallScreen && styles.fullWidth]}>
              {renderInput(
                'Company/Shop Name',
                formData.companyName,
                (text) => handleInputChange('companyName', text),
                errors.companyName
              )}
            </View>
            <View style={[styles.halfWidth, isSmallScreen && styles.fullWidth]}>
              {renderInput(
                'Email',
                formData.email,
                (text) => handleInputChange('email', text),
                errors.email,
                'email-address'
              )}
            </View>
          </View>

          {renderInput(
            'Phone',
            formData.phone,
            (text) => handleInputChange('phone', text),
            errors.phone,
            'phone-pad'
          )}

          {showPasswordFields && (
            <View style={styles.passwordSection}>
              {renderInput(
                'Previous Password',
                passwordData.previousPassword,
                (text) => handlePasswordChange('previousPassword', text),
                errors.previousPassword,
                'default',
                true,
                true,
                showPreviousPassword,
                () => setShowPreviousPassword(!showPreviousPassword)
              )}
              {renderInput(
                'New Password',
                passwordData.newPassword,
                (text) => handlePasswordChange('newPassword', text),
                errors.newPassword,
                'default',
                true,
                true,
                showNewPassword,
                () => setShowNewPassword(!showNewPassword)
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.changePasswordContainer}
            onPress={handleChangePassword}
          >
            <Text style={[styles.changePasswordText, isTablet && styles.changePasswordTextTablet]}>
              {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.updateButton, isTablet && styles.updateButtonTablet]}
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Text style={[styles.updateButtonText, isTablet && styles.updateButtonTextTablet]}>
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



