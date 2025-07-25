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
import { ENDPOINTS } from '../../../api/endpoints';
import { post } from '../../../api/apiClient';

export const EditCustomer = () => {
  const route = useRoute();
  const { customer } = route.params;
  console.log("Customer:", customer);
  console.log("Customer originalData:", customer?.originalData);
  console.log("Customer name:", customer?.name);
  console.log("Customer shopName:", customer?.shopName);
  console.log("Customer address:", customer?.address);
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  // Parse address to extract city, state, zip
  const parseAddress = (addressString) => {
    if (!addressString) return { address1: '', city: '', state: '', zip: '' };

    const parts = addressString.split(' ');
    if (parts.length >= 4) {
      // Assuming format: "4311 14TH AVENUE BROOKLYN NY 11219"
      const address1 = parts.slice(0, -3).join(' '); // "4311 14TH AVENUE"
      const city = parts[parts.length - 3]; // "BROOKLYN"
      const state = parts[parts.length - 2]; // "NY"
      const zip = parts[parts.length - 1]; // "11219"

      return { address1, city, state, zip };
    }
    return { address1: addressString, city: '', state: '', zip: '' };
  };

  const parsedAddress = parseAddress(customer.address);

  const [customerData, setCustomerData] = useState({
    customerId: customer.id || customer.originalData?.customerid || customer.originalData?._id || '',
    firstName: customer.originalData?.firstname || customer.name?.split(' ')[0] || '',
    lastName: customer.originalData?.lastname || customer.name?.split(' ').slice(1).join(' ') || '',
    companyName: customer.shopName || customer.originalData?.StoreName || '',
    email1: customer.originalData?.email_1 || customer.originalData?.email || '',
    email2: customer.originalData?.email_2 || '',
    storePhone: customer.originalData?.StorePhone || '',
    phone1: customer.originalData?.cell_1 || customer.originalData?.phone || '',
    phone2: customer.originalData?.cell_2 || '',
    // Second Contact
    scFirstName: customer.originalData?.sc_firstname || '',
    scLastName: customer.originalData?.sc_lastname || '',
    scEmail: customer.originalData?.sc_email || '',
    scOfficePhone: customer.originalData?.sc_OfficePhone || '',
    scCell1: customer.originalData?.sc_cell_1 || '',
    scCell2: customer.originalData?.sc_cell_2 || '',
    // Third Contact
    tcFirstName: customer.originalData?.tc_firstname || '',
    tcLastName: customer.originalData?.tc_lastname || '',
    tcEmail: customer.originalData?.tc_email || '',
    tcOfficePhone: customer.originalData?.tc_OfficePhone || '',
    tcCell1: customer.originalData?.tc_cell_1 || '',
    tcCell2: customer.originalData?.tc_cell_2 || '',
    // Shipping Address
    shippingAddress: {
      address1: customer.originalData?.s_address1 || parsedAddress.address1 || '',
      address2: customer.originalData?.s_address2 || '',
      street: customer.originalData?.s_street || '',
      city: customer.originalData?.s_city || parsedAddress.city || '',
      state: customer.originalData?.s_state || parsedAddress.state || '',
      postcode: customer.originalData?.s_postcode || parsedAddress.zip || '',
      country: customer.originalData?.s_country || "USA",
    },
    // Billing Address
    billingAddress: {
      address1: customer.originalData?.b_address1 || '',
      address2: customer.originalData?.b_address2 || '',
      street: customer.originalData?.b_street || '',
      city: customer.originalData?.b_city || '',
      state: customer.originalData?.b_state || '',
      postcode: customer.originalData?.b_postcode || '',
      country: customer.originalData?.b_country || "USA",
    },
    hasSecondContact: false,
    hasThirdContact: false,
  });

  console.log("CustomerData initialized:", customerData);

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

  const handleUpdateCustomer = async () => {
    // Basic validation
    if (!customerData.firstName || !customerData.lastName || !customerData.email1) {
      Alert.alert("Validation Error", "Please fill in all required fields (First Name, Last Name, Email)");
      return;
    }

    try {
      // Prepare the data for API call according to the expected structure
      const updateData = {
        customerid: customerData.customerId,
        firstname: customerData.firstName,
        lastname: customerData.lastName,
        StoreName: customerData.companyName,
        email_1: customerData.email1,
        email_2: customerData.email2,
        StorePhone: customerData.storePhone,
        cell_1: customerData.phone1,
        cell_2: customerData.phone2,

        // Second Contact
        sc_firstname: customerData.scFirstName,
        sc_lastname: customerData.scLastName,
        sc_email: customerData.scEmail,
        sc_OfficePhone: customerData.scOfficePhone,
        sc_cell_1: customerData.scCell1,
        sc_cell_2: customerData.scCell2,

        // Third Contact
        tc_firstname: customerData.tcFirstName,
        tc_lastname: customerData.tcLastName,
        tc_email: customerData.tcEmail,
        tc_OfficePhone: customerData.tcOfficePhone,
        tc_cell_1: customerData.tcCell1,
        tc_cell_2: customerData.tcCell2,

        // Shipping Address
        s_address1: customerData.shippingAddress.address1,
        s_address2: customerData.shippingAddress.address2,
        s_street: customerData.shippingAddress.street,
        s_postcode: customerData.shippingAddress.postcode,
        s_city: customerData.shippingAddress.city,
        s_state: customerData.shippingAddress.state,
        s_country: customerData.shippingAddress.country,

        // Billing Address
        b_address1: customerData.billingAddress.address1,
        b_address2: customerData.billingAddress.address2,
        b_street: customerData.billingAddress.street,
        b_postcode: customerData.billingAddress.postcode,
        b_city: customerData.billingAddress.city,
        b_state: customerData.billingAddress.state,
        b_country: customerData.billingAddress.country,
      };

      // Replace the :id placeholder with actual customer ID
      const updateUrl = ENDPOINTS.UPDATE_CUSTOMER.replace(':id', customerData.customerId);

      console.log("Updating customer with URL:", updateUrl);
      console.log("Update data:", updateData);

      const response = await post(updateUrl, updateData);

      console.log("Update response:", response);
      Alert.alert("Success", "Customer information has been updated successfully!");

    } catch (error) {
      console.error("Error updating customer:", error);
      Alert.alert("Error", error.message || "Failed to update customer. Please try again.");
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
                customerData.storePhone,
                (text) => updateField("storePhone", text),
                "Store Phone",
                undefined,
                "phone-pad",
              )}
            </View>
            <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
              {renderTextInput(
                customerData.phone2,
                (text) => updateField("phone2", text),
                "Cell 2",
                undefined,
                "phone-pad",
              )}
            </View>
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

        {/* Second Contact Section */}
        {customerData.hasSecondContact && (
          <View style={[styles.section, isTablet && styles.sectionTablet]}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Second Contact</Text>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scFirstName,
                  (text) => updateField("scFirstName", text),
                  "First Name"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scLastName,
                  (text) => updateField("scLastName", text),
                  "Last Name"
                )}
              </View>
            </View>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scEmail,
                  (text) => updateField("scEmail", text),
                  "Email",
                  undefined,
                  "email-address"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scOfficePhone,
                  (text) => updateField("scOfficePhone", text),
                  "Office Phone",
                  undefined,
                  "phone-pad"
                )}
              </View>
            </View>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scCell1,
                  (text) => updateField("scCell1", text),
                  "Cell 1",
                  undefined,
                  "phone-pad"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.scCell2,
                  (text) => updateField("scCell2", text),
                  "Cell 2",
                  undefined,
                  "phone-pad"
                )}
              </View>
            </View>
          </View>
        )}

        {/* Third Contact Section */}
        {customerData.hasThirdContact && (
          <View style={[styles.section, isTablet && styles.sectionTablet]}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Third Contact</Text>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcFirstName,
                  (text) => updateField("tcFirstName", text),
                  "First Name"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcLastName,
                  (text) => updateField("tcLastName", text),
                  "Last Name"
                )}
              </View>
            </View>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcEmail,
                  (text) => updateField("tcEmail", text),
                  "Email",
                  undefined,
                  "email-address"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcOfficePhone,
                  (text) => updateField("tcOfficePhone", text),
                  "Office Phone",
                  undefined,
                  "phone-pad"
                )}
              </View>
            </View>

            <View style={[styles.row, isTablet && styles.rowTablet]}>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcCell1,
                  (text) => updateField("tcCell1", text),
                  "Cell 1",
                  undefined,
                  "phone-pad"
                )}
              </View>
              <View style={[styles.halfWidth, isTablet && styles.halfWidthTablet]}>
                {renderTextInput(
                  customerData.tcCell2,
                  (text) => updateField("tcCell2", text),
                  "Cell 2",
                  undefined,
                  "phone-pad"
                )}
              </View>
            </View>
          </View>
        )}

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

          {renderTextInput(
            customerData.shippingAddress.street,
            (text) => updateField("shippingAddress.street", text),
            "Street",
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
                customerData.shippingAddress.postcode,
                (text) => updateField("shippingAddress.postcode", text),
                "Postcode",
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

          {renderTextInput(
            customerData.billingAddress.street,
            (text) => updateField("billingAddress.street", text),
            "Street",
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
                customerData.billingAddress.postcode,
                (text) => updateField("billingAddress.postcode", text),
                "Postcode",
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