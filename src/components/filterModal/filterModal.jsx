import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { styles } from './styles';

export const FilterModal = ({
  filterOptions,
  visible,
  selectedFilter,
  onClose,
  onFilterSelect,
}) => {

  const handleFilterSelect = (filter) => {
    console.log('Filter selected:', filter);
    onFilterSelect(filter);
  };

  const handleClose = () => {
    console.log('Filter modal closed');
    onClose();
  };

  const handleClearFilter = () => {
    console.log('Filter cleared');
    onFilterSelect(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />

        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Filter Options</Text>
            <TouchableOpacity onPress={handleClearFilter}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* <Text style={styles.subtitle}>Select a filter option to sort products</Text> */}

            <View style={styles.filterContainer}>
              {filterOptions?.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.filterButton,
                    selectedFilter === option.id && styles.filterButtonSelected
                  ]}
                  onPress={() => handleFilterSelect(option.id)}
                >
                  <View style={styles.filterButtonContent}>
                    <Text style={styles.filterIcon}>{option.icon}</Text>
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedFilter === option.id && styles.filterButtonTextSelected
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {selectedFilter === option.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

