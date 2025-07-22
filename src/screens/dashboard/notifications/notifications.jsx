import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { NotificationCard, ViewNotificationModal } from '../../../components';
import { notifications } from './data';

export const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:');
    setSelectedNotification(notification);
    setNotificationModalVisible(true);
    notification.isRead = true;
  };
  const handleCloseModal = () => {
    console.log('Modal closed');
    setNotificationModalVisible(false);
  }
  return (
    <>
      <View style={styles.container}>
        {notifications?.map((notification) => (
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
        ))}
      </View>
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