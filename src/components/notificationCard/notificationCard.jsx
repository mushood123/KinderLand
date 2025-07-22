import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { styles } from './styles';

export const NotificationCard = ({
  date,
  time,
  title,
  description,
  logoComponent,
  logoBackgroundColor = '#EFF6FF',
  isRead = false,
  onPress,
}) => {
  const handlePress = () => {
    console.log('Notification pressed:');
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isRead && styles.unreadCard
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.textContent}>
          <Text style={[styles.title, !isRead && styles.unreadTitle]} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>

      <View style={[styles.logoContainer, { backgroundColor: logoBackgroundColor }]}>
        {logoComponent}
      </View>

      {!isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
};

