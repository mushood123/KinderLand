import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export const EditCustomer = () => {
  const route = useRoute();
  const { customer } = route.params;
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const [customerData, setCustomerData] = useState({
    customerId: customer.id,
    firstName: customer.lastName,
    lastName: "BITTMAN",
    companyName: "14TH AVENUE SHOES",
    email1: "shoes4311@gmail.com",
    email2: "",
    phone1: "7184366910",
    phone2: "7188128972",
    cell2: "",
    shippingAddress: {
      address1: customer.address,
      address2: "",
      city: "BROOKLYN",
      state: "NY",
      zip: "11219",
      country: "USA",
    },
    billingAddress: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    hasSecondContact: false,
    hasThirdContact: false,
  });

  const updateField = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setCustomerData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCustomerData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleUpdateCustomer = () => {
    // Basic validation
    if (!customerData.firstName || !customerData.lastName || !customerData.email1) {
      Alert.alert("Validation Error", "Please fill in all required fields (First Name, Last Name, Email)");
      return;
    }

    console.log("Updating customer:", customerData);
    Alert.alert("Success", "Customer information has been updated successfully!");
  };

  const renderCheckbox = (checked, onPress) => (
    <TouchableOpacity style={[styles.checkbox, isTablet && styles.checkboxTablet]} onPress={onPress}>
      {checked && <Text style={[styles.checkmark, isTablet && styles.checkmarkTablet]}>✓</Text>}
    </TouchableOpacity>
  );

  const renderTextInput = (
    value,
    onChangeText,
    placeholder,
    style,
    keyboardType = "default",
  ) => (
    <TextInput
      style={[styles.textInput, isTablet && styles.textInputTablet, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
    />
  );

  return (
    <ScrollView style={[styles.container, isTablet && styles.containerTablet]}>
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        {/* Basic Information Section */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(customerData.customerId, (text) => updateField("customerId", text), "Customer ID")}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.companyName,
                (text) => updateField("companyName", text),
                "Company Name",
              )}
            </View>
          </View>

          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(customerData.firstName, (text) => updateField("firstName", text), "First Name")}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(customerData.lastName, (text) => updateField("lastName", text), "Last Name")}
            </View>
          </View>

          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.email1,
                (text) => updateField("email1", text),
                "Email 1",
                undefined,
                "email-address",
              )}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.email2,
                (text) => updateField("email2", text),
                "Email 2",
                undefined,
                "email-address",
              )}
            </View>
          </View>

          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.phone1,
                (text) => updateField("phone1", text),
                "Phone 1",
                undefined,
                "phone-pad",
              )}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.phone2,
                (text) => updateField("phone2", text),
                "Phone 2",
                undefined,
                "phone-pad",
              )}
            </View>
          </View>

          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.cell2,
                (text) => updateField("cell2", text),
                "Cell 2",
                undefined,
                "phone-pad",
              )}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]} />
          </View>
        </View>

        {/* Contact Options */}
        <View style={[styles.checkboxSection, isTablet && styles.checkboxSectionTablet]}>
          <View style={[styles.checkboxRow, isTablet && styles.checkboxRowTablet]}>
            {renderCheckbox(customerData.hasSecondContact, () =>
              updateField("hasSecondContact", !customerData.hasSecondContact),
            )}
            <Text style={[styles.checkboxLabel, isTablet && styles.checkboxLabelTablet]}>2nd Contact</Text>
          </View>

          <View style={[styles.checkboxRow, isTablet && styles.checkboxRowTablet]}>
            {renderCheckbox(customerData.hasThirdContact, () =>
              updateField("hasThirdContact", !customerData.hasThirdContact),
            )}
            <Text style={[styles.checkboxLabel, isTablet && styles.checkboxLabelTablet]}>3rd Contact</Text>
          </View>
        </View>

        {/* Shipping Address Section */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Shipping Address</Text>

          {renderTextInput(
            customerData.shippingAddress.address1,
            (text) => updateField("shippingAddress.address1", text),
            "Address 1",
            [styles.fullWidth, isTablet && styles.fullWidthTablet],
          )}

          {renderTextInput(
            customerData.shippingAddress.address2,
            (text) => updateField("shippingAddress.address2", text),
            "Address 2",
            [styles.fullWidth, isTablet && styles.fullWidthTablet],
          )}

          <View style={[styles.addressRow, isTablet && styles.addressRowTablet]}>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.shippingAddress.city,
                (text) => updateField("shippingAddress.city", text),
                "City",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.shippingAddress.state,
                (text) => updateField("shippingAddress.state", text),
                "State",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.shippingAddress.zip,
                (text) => updateField("shippingAddress.zip", text),
                "Zip",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.shippingAddress.country,
                (text) => updateField("shippingAddress.country", text),
                "Country",
              )}
            </View>
          </View>
        </View>

        {/* Billing Address Section */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Billing Address</Text>

          {renderTextInput(
            customerData.billingAddress.address1,
            (text) => updateField("billingAddress.address1", text),
            "Address 1",
            [styles.fullWidth, isTablet && styles.fullWidthTablet],
          )}

          {renderTextInput(
            customerData.billingAddress.address2,
            (text) => updateField("billingAddress.address2", text),
            "Address 2",
            [styles.fullWidth, isTablet && styles.fullWidthTablet],
          )}

          <View style={[styles.addressRow, isTablet && styles.addressRowTablet]}>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.billingAddress.city,
                (text) => updateField("billingAddress.city", text),
                "City",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.billingAddress.state,
                (text) => updateField("billingAddress.state", text),
                "State",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.billingAddress.zip,
                (text) => updateField("billingAddress.zip", text),
                "Zip",
              )}
            </View>
            <View style={[styles.quarterWidth, isTablet && styles.quarterWidthTablet]}>
              {renderTextInput(
                customerData.billingAddress.country,
                (text) => updateField("billingAddress.country", text),
                "Country",
              )}
            </View>
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.updateButton, isTablet && styles.updateButtonTablet]}
          onPress={handleUpdateCustomer}
        >
          <Text style={[styles.updateButtonText, isTablet && styles.updateButtonTextTablet]}>Update Customer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};