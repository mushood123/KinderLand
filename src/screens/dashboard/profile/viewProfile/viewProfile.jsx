import React, { useLayoutEffect, useContext } from 'react';
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
import { UserContext } from '../../../../context';
import { useLogout } from '../../../../context/logoutContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const ViewProfile = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const handleLogout = useLogout();
  console.log('handleLogout from viewProfile (context):', handleLogout);
  console.log('handleLogout type:', typeof handleLogout);
  console.log('handleLogout is function:', typeof handleLogout === 'function');
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
              source={{ uri: user?.image }}
              style={[styles.profileImage, isTablet && styles.profileImageTablet]}
              resizeMode="cover"
            />
          </View>
          <Text style={[styles.userName, isTablet && styles.userNameTablet]}>
            {user?.firstname + ' ' + user?.lastname}
          </Text>
        </View>

        <View style={[styles.infoCard, isTablet && styles.infoCardTablet]}>
          {renderInfoRow('Email', user?.email)}
          {renderInfoRow('Store Phone', user?.phone)}
          {renderInfoRow('Store Name', user?.storeName)}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, isTablet && styles.logoutButtonTablet]}
          onPress={() => {
            if (typeof handleLogout === 'function') {
              handleLogout();
            } else {
              console.log('handleLogout is not a function:', handleLogout);
            }
          }}
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

