import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

let {
  userName = 'Danny Farago',
  email = 'danny@venettini.app',
  storePhone = '+1 234 567 8900',
  storeName = 'Great Store',
  profileImage = '/placeholder.svg?height=120&width=120',
} = {};

export const ViewProfile = ({ }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.editProfileContainer}
          onPress={handleEditProfile}
        >
          <Text style={styles.editProfileText}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);



  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
    console.log('Edit Profile pressed');
  };
  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const renderInfoRow = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label} :</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.profileSection}>
          <View style={[styles.profileImageContainer, isTablet && styles.profileImageContainerTablet]}>
            <Image
              source={{ uri: profileImage }}
              style={[styles.profileImage, isTablet && styles.profileImageTablet]}
              resizeMode="cover"
            />
          </View>
          <Text style={[styles.userName, isTablet && styles.userNameTablet]}>
            {userName}
          </Text>
        </View>

        <View style={[styles.infoCard, isTablet && styles.infoCardTablet]}>
          {renderInfoRow('Email', email)}
          {renderInfoRow('Store Phone', storePhone)}
          {renderInfoRow('Store Name', storeName)}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, isTablet && styles.logoutButtonTablet]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={[styles.logoutButtonText, isTablet && styles.logoutButtonTextTablet]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

