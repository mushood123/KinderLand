import { View, Text } from 'react-native';
import { styles } from './styles';
import { NotificationCard } from '../../../components';
import { notifications } from './data';

export const Notifications = () => {
  const handleNotificationPress = (title) => {
    console.log('Notification pressed:', title);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB', paddingTop: 20 }}>
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
          onPress={() => handleNotificationPress(notification.title)}
        />
      ))}
    </View>
  );
}