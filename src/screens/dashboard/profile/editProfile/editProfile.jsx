import React, { useState, useContext } from 'react';
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
import { ENDPOINTS, get, post, put, del } from '../../../../api';
import { UserContext } from '../../../../context';


export const EditProfile = () => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  const isSmallScreen = width < 400;
  const { user } = useContext(UserContext);
  console.log('user', user);
  const [formData, setFormData] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    storeName: user?.storeName,
    email: user?.email,
    phone: user?.phone,
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
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
      setPasswordData({ password: '', confirmPassword: '' });
      setErrors(prev => ({
        ...prev,
        password: undefined,
        confirmPassword: undefined,
      }));
    }
  };

  const handleUpdate = async () => {
    console.log('formDatasss', formData);
    console.log('passwordData', passwordData);
    console.log('showPasswordFields', showPasswordFields);

    const isValid = validateForm(setErrors, formData, showPasswordFields, passwordData);
    console.log('Validation result:', isValid);

    if (isValid) {
      try {
        console.log('Form Data:', formData);

        // Prepare the request data
        const requestData = { ...formData };

        // Add password data if password change is requested
        if (showPasswordFields) {
          console.log('Password Change Requested');
          requestData.password = passwordData.password;
          requestData.confirmPassword = passwordData.confirmPassword;
        }

        // Replace the email parameter in the URL
        const url = ENDPOINTS.UPDATE_PROFILE.replace(':email', formData.email);

        console.log('Making API call to:', url);
        console.log('Request data:', requestData);

        const res = await post(url, requestData);
        console.log('API Response:', res);

        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert(
          'Error',
          error.message || 'Failed to update profile. Please try again.'
        );
      }
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
              source={{ uri: user?.image }}
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
                formData.firstname,
                (text) => handleInputChange('firstname', text),
                errors.firstname
              )}
            </View>
            <View style={[styles.halfWidth, isSmallScreen && styles.fullWidth]}>
              {renderInput(
                'Last Name',
                formData.lastname,
                (text) => handleInputChange('lastname', text),
                errors.lastname
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
                formData.storeName,
                (text) => handleInputChange('storeName', text),
                errors.storeName
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
                'Password',
                passwordData.password,
                (text) => handlePasswordChange('password', text),
                errors.password,
                'default',
                true,
                true,
                showPreviousPassword,
                () => setShowPreviousPassword(!showPreviousPassword)
              )}
              {renderInput(
                'Confirm Password',
                passwordData.confirmPassword,
                (text) => handlePasswordChange('confirmPassword', text),
                errors.confirmPassword,
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



