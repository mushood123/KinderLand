import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { styles } from './styles';

export const SearchBar = ({
  placeholder = 'Search...',
  value = '',
  onChangeText,
  onSearch,
  onClear,
  onFocus,
  onBlur,
  showClearButton = true,
  showSearchIcon = true,
  autoFocus = false,
  editable = true,
  style,
  containerStyle,
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const [searchText, setSearchText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleChangeText = (text) => {
    setSearchText(text);
    onChangeText?.(text);
  };

  const handleSearch = () => {
    console.log('Search triggered:', searchText);
    onSearch?.(searchText);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setSearchText('');
    onChangeText?.('');
    onClear?.();
    console.log('Search cleared');
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmitEditing = () => {
    handleSearch();
  };

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D1D5DB', '#3B82F6'],
  });

  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F9FAFB', '#FFFFFF'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isTablet && styles.containerTablet,
        {
          borderColor: animatedBorderColor,
          backgroundColor: animatedBackgroundColor,
        },
        containerStyle,
      ]}
    >
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          isTablet && styles.inputTablet,
          !showSearchIcon && styles.inputNoIcon,
          style,
        ]}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
        autoFocus={autoFocus}
        editable={editable}
        placeholderTextColor="#9CA3AF"
      />


      {showClearButton && searchText.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={[
            styles.clearButton,
            isTablet && styles.clearButtonTablet,
          ]}
        >
          <View
            style={[
              styles.clearButtonBackground,
              isTablet && styles.clearButtonBackgroundTablet,
            ]}
          >
            <Text
              style={[
                styles.clearIcon,
                isTablet && styles.clearIconTablet,
              ]}
            >
              ✕
            </Text>
          </View>
        </TouchableOpacity>
      )}


      {showSearchIcon && searchText.length === 0 && (
        <TouchableOpacity
          onPress={handleSearch}
          style={[
            styles.iconButton,
            isTablet && styles.iconButtonTablet,
          ]}
        >
          <Text
            style={[
              styles.searchIcon,
              isTablet && styles.searchIconTablet,
            ]}
          >
            🔍
          </Text>
        </TouchableOpacity>
      )}


      {showSearchIcon && searchText.length > 0 && (
        <TouchableOpacity
          onPress={handleSearch}
          style={[
            styles.searchButton,
            isTablet && styles.searchButtonTablet,
          ]}
        >
          <Text
            style={[
              styles.searchIcon,
              isTablet && styles.searchIconTablet,
              { color: '#3B82F6' }
            ]}
          >
            🔍
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

