import { StyleSheet } from 'react-native';
import { View, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';


export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ''));
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (setErrors = () => { }, formData, showPasswordFields, passwordData) => {
  const newErrors = {};

  // First Name validation
  if (!formData.firstname.trim()) {
    newErrors.firstname = 'First name is required';
  } else if (formData.firstname.trim().length < 2) {
    newErrors.firstname = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!formData.lastname.trim()) {
    newErrors.lastname = 'Last name is required';
  } else if (formData.lastname.trim().length < 2) {
    newErrors.lastname = 'Last name must be at least 2 characters';
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional but if provided, must be valid)
  if (formData.phone.trim() && !validatePhone(formData.phone)) {
    newErrors.phone = 'Please enter a valid phone number';
  }

  // Password validation (only if password fields are shown)
  if (showPasswordFields) {
    if (!passwordData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (!validatePassword(passwordData.confirmPassword)) {
      newErrors.confirmPassword = 'Password must be at least 8 characters long';
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const renderInput = (
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  const isSmallScreen = width < 400;
  return (
    <View style={[renderInputStyles.inputContainer, isTablet && renderInputStyles.inputContainerTablet]}>
      <View style={renderInputStyles.inputWrapper}>
        <TextInput
          style={[
            renderInputStyles.input,
            isTablet && renderInputStyles.inputTablet,
            error && renderInputStyles.inputError
          ]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
          autoCorrect={false}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={renderInputStyles.passwordToggle}
            onPress={onTogglePassword}
          >
            <Text style={renderInputStyles.passwordToggleText}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={renderInputStyles.errorText}>{error}</Text>}
    </View>
  )
};
const renderInputStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputContainerTablet: {
    marginBottom: 24,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  inputTablet: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 18,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  passwordToggleText: {
    fontSize: 18,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 20,
  },
});