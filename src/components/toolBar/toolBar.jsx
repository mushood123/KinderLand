import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { styles } from './styles';

export const ToolBar = ({
  onGridPress = () => { },
  onListPress = () => { },
  onMenuPress = () => { },
  onAddNewPress = () => { },
  showGridIcon = true,
  showListIcon = false,
  showMenuIcon = true,
  showAddButton = true,
  addButtonText = 'Add New',
}) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  const handleGridPress = () => {
    console.log('Grid icon pressed');
    if (onGridPress) onGridPress();
  };

  const handleListPress = () => {
    console.log('List icon pressed');
    if (onListPress) onListPress();
  };

  const handleMenuPress = () => {
    console.log('Menu icon pressed');
    if (onMenuPress) onMenuPress();
  };

  const handleAddNewPress = () => {
    console.log('Add New button pressed');
    if (onAddNewPress) onAddNewPress();
  };

  const renderGridIcon = () => (
    <TouchableOpacity
      style={[styles.headerIconButton, isTablet && styles.headerIconButtonTablet]}
      onPress={handleGridPress}
      activeOpacity={0.6}
    >
      <View style={[styles.gridContainer, isTablet && styles.gridContainerTablet]}>
        <View style={[styles.gridSquare, styles.gridSquareTopLeft]} />
        <View style={[styles.gridSquare, styles.gridSquareTopRight]} />
        <View style={[styles.gridSquare, styles.gridSquareBottomLeft]} />
        <View style={[styles.gridSquare, styles.gridSquareBottomRight]} />
      </View>
    </TouchableOpacity>
  );

  const renderListIcon = () => (
    <TouchableOpacity
      style={[styles.headerIconButton, isTablet && styles.headerIconButtonTablet]}
      onPress={handleListPress}
      activeOpacity={0.6}
    >
      <View style={[styles.listContainer, isTablet && styles.listContainerTablet]}>
        <View style={[styles.listLine, isTablet && styles.listLineTablet]} />
        <View style={[styles.listLine, isTablet && styles.listLineTablet]} />
        <View style={[styles.listLine, isTablet && styles.listLineTablet]} />
      </View>
    </TouchableOpacity>
  );

  const renderMenuIcon = () => (
    <TouchableOpacity
      style={[styles.headerIconButton, isTablet && styles.headerIconButtonTablet]}
      onPress={handleMenuPress}
      activeOpacity={0.6}
    >
      <View style={[styles.menuContainer, isTablet && styles.menuContainerTablet]}>
        <View style={[styles.menuLine, isTablet && styles.menuLineTablet]} />
        <View style={[styles.menuLine, styles.menuLineMiddle, isTablet && styles.menuLineTablet]} />
        <View style={[styles.menuLine, isTablet && styles.menuLineTablet]} />
      </View>
    </TouchableOpacity>
  );

  const renderAddButton = () => (
    <TouchableOpacity
      style={[styles.headerAddButton, isTablet && styles.headerAddButtonTablet]}
      onPress={handleAddNewPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.headerAddButtonText, isTablet && styles.headerAddButtonTextTablet]}>
        {addButtonText}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.headerToolbar, isTablet && styles.headerToolbarTablet]}>
      {showGridIcon && renderGridIcon()}
      {showListIcon && renderListIcon()}
      {showMenuIcon && renderMenuIcon()}
      {showAddButton && renderAddButton()}
    </View>
  );
};


