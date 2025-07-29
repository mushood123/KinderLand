import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { styles } from './styles';
import { NotificationCard, ViewNotificationModal } from '../../../components';
import { ENDPOINTS, post } from '../../../api';
import { SVGVenettini } from '../../../assets';
import { UserContext } from '../../../context';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const { user } = useContext(UserContext);

  const fetchNotifications = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await post(ENDPOINTS.GET_EMPLOYEE_NOTIFICATION, {
        agent_email: user.email
      });

      if (response && Array.isArray(response)) {
        const transformedNotifications = response.map((notification, index) => ({
          id: notification._id || index.toString(),
          date: notification.date,
          time: notification.time,
          title: notification.content?.title || 'Notification',
          description: notification.content?.body || 'No description available',
          logo: <SVGVenettini />,
          logoBg: '#F3E8FF',
          isRead: notification.read_status === '1',
          originalData: notification,
        }));

        setNotifications(transformedNotifications);
      } else {
        setError('No notifications found');
      }
    } catch (err) {
      setError('Failed to load notifications. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setNotificationModalVisible(true);

    if (!notification.isRead) {
      const updatedNotifications = notifications.map(n =>
        n.id === notification.id ? { ...n, isRead: true } : n
      );
      setNotifications(updatedNotifications);
    }
  };

  const handleCloseModal = () => {
    setNotificationModalVisible(false);
  };

  const handleRetry = () => {
    fetchNotifications();
  };

  const onRefresh = () => {
    fetchNotifications(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={handleRetry}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>No notifications available</Text>
          </View>
        ) : (
          notifications?.map((notification) => (
            <NotificationCard
              key={notification.id}
              date={notification.date}
              time={notification.time}
              title={notification.title}
              description={notification.description}
              logoComponent={notification.logo}
              logoBackgroundColor={notification.logoBg}
              isRead={notification.isRead}
              onPress={() => handleNotificationPress(notification)}
            />
          ))
        )}
      </ScrollView>
      <ViewNotificationModal
        visible={notificationModalVisible}
        title={selectedNotification?.title}
        description={selectedNotification?.description}
        onClose={handleCloseModal}
        showCloseButton={true}
        animationType="fade"
      />
    </>
  );
}