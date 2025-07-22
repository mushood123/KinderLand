import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { styles } from './styles';

export const ViewNotificationModal = ({
  visible,
  title,
  description,
  onClose,
  showCloseButton = true,
  animationType = 'fade',
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const handleClose = () => {
    console.log('Modal closed');
    onClose();
  };

  const handleOverlayPress = () => {
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={animationType}
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOverlayPress}
      >
        <TouchableOpacity
          style={[
            styles.modalContainer,
            isTablet && styles.modalContainerTablet
          ]}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          )}

          <Text style={[
            styles.title,
            isTablet && styles.titleTablet
          ]}>
            {title}
          </Text>
          <Text style={[
            styles.description,
            isTablet && styles.descriptionTablet
          ]}>
            {description}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

