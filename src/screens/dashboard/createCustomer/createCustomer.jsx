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
import { styles } from "./styles";
import { ENDPOINTS } from '../../../api/endpoints';
import { post } from '../../../api/apiClient';

export const CreateCustomer = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const [customerData, setCustomerData] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    companyName: "",
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    cell2: "",
    shippingAddress: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    },
    billingAddress: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    },
    hasSecondContact: false,
    hasThirdContact: false,
  });

  const [loading, setLoading] = useState(false);

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

  const generateCustomerId = () => {
    // Generate a unique customer ID (you can customize this logic)
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `CUST${timestamp}${randomNum}`;
  };

  const resetForm = () => {
    setCustomerData({
      customerId: "",
      firstName: "",
      lastName: "",
      companyName: "",
      email1: "",
      email2: "",
      phone1: "",
      phone2: "",
      cell2: "",
      shippingAddress: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
      },
      billingAddress: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
      },
      hasSecondContact: false,
      hasThirdContact: false,
    });
  };

  const handleCreateCustomer = async () => {
    // Basic validation
    if (!customerData.firstName || !customerData.lastName || !customerData.email1) {
      Alert.alert("Validation Error", "Please fill in all required fields (First Name, Last Name, Email)");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email1)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    // Optional: Validate second email if provided
    if (customerData.email2 && !emailRegex.test(customerData.email2)) {
      Alert.alert("Validation Error", "Please enter a valid second email address");
      return;
    }

    // Map customerData to required API format
    const apiPayload = {
      firstname: customerData.firstName,
      lastname: customerData.lastName,
      StoreName: customerData.companyName,
      email_1: customerData.email1,
      email_2: customerData.email2,
      StorePhone: customerData.phone1,
      cell_1: customerData.phone1, // Assuming phone1 is main cell
      cell_2: customerData.cell2,
      // Second Contact (if hasSecondContact is true, otherwise leave blank)
      sc_firstname: customerData.hasSecondContact ? customerData.sc_firstname || '' : '',
      sc_lastname: customerData.hasSecondContact ? customerData.sc_lastname || '' : '',
      sc_email: customerData.hasSecondContact ? customerData.sc_email || '' : '',
      sc_OfficePhone: customerData.hasSecondContact ? customerData.sc_OfficePhone || '' : '',
      sc_cell_1: customerData.hasSecondContact ? customerData.sc_cell_1 || '' : '',
      sc_cell_2: customerData.hasSecondContact ? customerData.sc_cell_2 || '' : '',
      // Third Contact (if hasThirdContact is true, otherwise leave blank)
      tc_firstname: customerData.hasThirdContact ? customerData.tc_firstname || '' : '',
      tc_lastname: customerData.hasThirdContact ? customerData.tc_lastname || '' : '',
      tc_email: customerData.hasThirdContact ? customerData.tc_email || '' : '',
      tc_OfficePhone: customerData.hasThirdContact ? customerData.tc_OfficePhone || '' : '',
      tc_cell_1: customerData.hasThirdContact ? customerData.tc_cell_1 || '' : '',
      tc_cell_2: customerData.hasThirdContact ? customerData.tc_cell_2 || '' : '',
      // Shipping Address
      s_address1: customerData.shippingAddress.address1,
      s_address2: customerData.shippingAddress.address2,
      s_street: customerData.shippingAddress.address1, // Assuming address1 is street
      s_postcode: customerData.shippingAddress.zip,
      s_city: customerData.shippingAddress.city,
      s_state: customerData.shippingAddress.state,
      s_country: customerData.shippingAddress.country,
      // Billing Address
      b_address1: customerData.billingAddress.address1,
      b_address2: customerData.billingAddress.address2,
      b_street: customerData.billingAddress.address1, // Assuming address1 is street
      b_postcode: customerData.billingAddress.zip,
      b_city: customerData.billingAddress.city,
      b_state: customerData.billingAddress.state,
      b_country: customerData.billingAddress.country,
    };

    setLoading(true);
    try {
      const response = await post(ENDPOINTS.ADD_CUSTOMER, apiPayload);
      console.log('Customer created:', response);
      setLoading(false);
      Alert.alert(
        "Success",
        "Customer has been created successfully!",
        [
          {
            text: "Create Another",
            onPress: resetForm
          },
          {
            text: "Done",
            style: "cancel"
          }
        ]
      );
    } catch (error) {
      setLoading(false);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error && typeof error === 'object') {
        if (error.message) {
          errorMessage = error.message;
        } else if (error.error) {
          errorMessage = error.error;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
      }
      console.log('Error creating customer:', error);
      Alert.alert('Error', errorMessage);
    }
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
    required = false
  ) => (
    <TextInput
      style={[styles.textInput, isTablet && styles.textInputTablet, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={required ? `${placeholder} *` : placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
    />
  );

  return (
    <ScrollView style={[styles.container, isTablet && styles.containerTablet]}>
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        {/* Basic Information Section */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Basic Information</Text>

          <View style={[styles.row, isTablet && styles.rowTablet]}>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(customerData.customerId, (text) => updateField("customerId", text), "Customer ID (optional)")}
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
              {renderTextInput(customerData.firstName, (text) => updateField("firstName", text), "First Name", undefined, "default", true)}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(customerData.lastName, (text) => updateField("lastName", text), "Last Name", undefined, "default", true)}
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
                true
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

        {/* Action Buttons */}
        <View style={[styles.row, isTablet && styles.rowTablet, { marginTop: 20 }]}>
          <TouchableOpacity
            style={[styles.secondaryButton, isTablet && styles.secondaryButtonTablet, { marginRight: 10 }]}
            onPress={resetForm}
          >
            <Text style={[styles.secondaryButtonText, isTablet && styles.secondaryButtonTextTablet]}>Clear Form</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.updateButton, isTablet && styles.updateButtonTablet, { flex: 1 }]}
            onPress={handleCreateCustomer}
            disabled={loading}
          >
            <Text style={[styles.updateButtonText, isTablet && styles.updateButtonTextTablet]}>
              {loading ? 'Creating...' : 'Create Customer'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};