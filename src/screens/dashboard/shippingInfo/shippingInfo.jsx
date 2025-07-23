import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { styles } from "./styles";

export const ShippingInfo = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const [showTermsModal, setShowTermsModal] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    selectedTerms: "",
    shippingStartDate: "07-11-2025",
    shippingCancelDate: "07-11-2025",
    companyName: "VENETTINI.COM",
    streetAddress: "15807 BISCAYNE BLVD",
    suite: "SUITE 217",
    city: "NMB",
    state: "FL",
    zipCode: "33160",
    country: "USA",
  });

  // Sample terms options
  const termsOptions = [
    "Pre-Paid Factor",
    "30% DEP./PREPAY BAL",
    "Factory Net 30",
    "Factory Net 45",
    "Factory Net 60",
    "Credit Card",
    "As Usual",
    "COD Factor",
    "Net 30",
    "Net 45",
    "Net 60",
    "Net 90",
  ];

  const updateField = (field, value) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDisplayDate = (dateString) => {
    try {
      // Parse MM-DD-YYYY format
      const [month, day, year] = dateString.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleTermsSelect = (term) => {
    updateField("selectedTerms", term);
    setShowTermsModal(false);
  };

  const handleNext = () => {
    // Basic validation
    if (!shippingInfo.selectedTerms) {
      Alert.alert("Validation Error", "Please select payment terms");
      return;
    }

    if (!shippingInfo.companyName || !shippingInfo.streetAddress || !shippingInfo.city) {
      Alert.alert("Validation Error", "Please fill in all required address fields");
      return;
    }

    console.log("Shipping info:", shippingInfo);
    // Simulate navigation or action without props
    Alert.alert("Success", "Shipping information submitted!");
  };

  const renderTextInput = (value, onChangeText, placeholder, style, keyboardType = "default") => (
    <TextInput
      style={[styles.textInput, isTablet && styles.textInputTablet, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
    />
  );

  const renderDateField = (label, value, onChangeText) => (
    <View style={[styles.dateSection, isTablet && styles.dateSectionTablet]}>
      <Text style={[styles.fieldLabel, isTablet && styles.fieldLabelTablet]}>{label}</Text>
      <View style={[styles.dateRow, isTablet && styles.dateRowTablet]}>
        <TextInput
          style={[styles.dateInput, isTablet && styles.dateInputTablet]}
          value={value}
          onChangeText={onChangeText}
          placeholder="MM-DD-YYYY"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />
        <Text style={[styles.dateDisplay, isTablet && styles.dateDisplayTablet]}>{formatDisplayDate(value)}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isTablet && styles.containerTablet]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, isTablet && styles.contentTablet]}>
          {/* Terms Dropdown */}
          <View style={[styles.fieldSection, isTablet && styles.fieldSectionTablet]}>
            <TouchableOpacity
              style={[styles.dropdown, isTablet && styles.dropdownTablet]}
              onPress={() => setShowTermsModal(true)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  isTablet && styles.dropdownTextTablet,
                  !shippingInfo.selectedTerms && styles.placeholderText,
                ]}
              >
                {shippingInfo.selectedTerms || "Select Terms"}
              </Text>
              <Text style={[styles.dropdownArrow, isTablet && styles.dropdownArrowTablet]}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Shipping Start Date */}
          {renderDateField("Shipping Start Date", shippingInfo.shippingStartDate, (text) =>
            updateField("shippingStartDate", text)
          )}

          {/* Shipping Cancel Date */}
          {renderDateField("Shipping Cancel Date", shippingInfo.shippingCancelDate, (text) =>
            updateField("shippingCancelDate", text)
          )}

          {/* Shipping Address */}
          <View style={[styles.addressSection, isTablet && styles.addressSectionTablet]}>
            <Text style={[styles.fieldLabel, isTablet && styles.fieldLabelTablet]}>Shipping Address</Text>

            {/* Company Name */}
            {renderTextInput(shippingInfo.companyName, (text) => updateField("companyName", text), "Company Name", [
              styles.fullWidth,
              isTablet && styles.fullWidthTablet,
            ])}

            {/* Street Address */}
            {renderTextInput(
              shippingInfo.streetAddress,
              (text) => updateField("streetAddress", text),
              "Street Address",
              [styles.fullWidth, isTablet && styles.fullWidthTablet]
            )}

            {/* Suite */}
            {renderTextInput(shippingInfo.suite, (text) => updateField("suite", text), "Suite/Unit", [
              styles.fullWidth,
              isTablet && styles.fullWidthTablet,
            ])}

            {/* City, State, Zip, Country Row */}
            <View style={[styles.addressRow, isTablet && styles.addressRowTablet]}>
              <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
                {renderTextInput(shippingInfo.city, (text) => updateField("city", text), "City")}
              </View>
              <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
                {renderTextInput(shippingInfo.state, (text) => updateField("state", text), "State")}
              </View>
              <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
                {renderTextInput(shippingInfo.zipCode, (text) => updateField("zipCode", text), "Zip Code")}
              </View>
              <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
                {renderTextInput(shippingInfo.country, (text) => updateField("country", text), "Country")}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={[styles.buttonContainer, isTablet && styles.buttonContainerTablet]}>
        <TouchableOpacity style={[styles.nextButton, isTablet && styles.nextButtonTablet]} onPress={handleNext}>
          <Text style={[styles.nextButtonText, isTablet && styles.nextButtonTextTablet]}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Terms Selection Modal */}
      <Modal visible={showTermsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
            <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
              <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Select Payment Terms</Text>
              <TouchableOpacity onPress={() => setShowTermsModal(false)}>
                <Text style={[styles.modalClose, isTablet && styles.modalCloseTablet]}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={termsOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalOption, isTablet && styles.modalOptionTablet]}
                  onPress={() => handleTermsSelect(item)}
                >
                  <Text style={[styles.modalOptionText, isTablet && styles.modalOptionTextTablet]}>{item}</Text>
                  {shippingInfo.selectedTerms === item && (
                    <Text style={[styles.checkmark, isTablet && styles.checkmarkTablet]}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

