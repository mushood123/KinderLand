import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { styles } from './styles';

export const Header = ({
  userName = 'Danny',
  notificationCount = 10,
  onNotificationPress = () => { },
  onProfilePress = () => { },
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed, count:', notificationCount);
    onNotificationPress?.();
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    onProfilePress?.();
  };


  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>
          {getGreeting()}, {userName} !
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNotificationPress}
        >
          <View style={styles.notificationContainer}>
            <Text style={styles.bellIcon}>🔔</Text>
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleProfilePress}
        >
          <View style={styles.profileAvatar}>
            <Image
              source={{ uri: 'https://abs.twimg.com/favicons/twitter.3.ico' }}
              style={styles.avatarImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
