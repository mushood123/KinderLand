import React, { useState, useContext } from "react";
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
import { ShippingContext, CartContext, UserContext } from "../../../context";
import { ENDPOINTS, post, get } from "../../../api";
import { useNavigation } from "@react-navigation/native";

export const ShippingInfo = ({ route }) => {
  const navigation = useNavigation();
  const { cartData, product, quantities, selectedSizes, selectedQuantity, customer } = route.params || {};

  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  const [showTermsModal, setShowTermsModal] = useState(false);

  const { shippingDetails, setShippingDetails } = useContext(ShippingContext);
  const { cart } = useContext(CartContext);
  console.log("cart", JSON.stringify(cart, null, 2))
  const { user } = useContext(UserContext);
  const [shippingInfo, setShippingInfo] = useState({
    selectedTerms: "",
    shippingStartDate: "",
    shippingCancelDate: "",
    companyName: customer.StoreName,
    streetAddress: customer.b_address1 || customer.b_address2 || customer.s_address1 || customer.s_address2,
    suite: "",
    city: customer.b_city || customer.s_city,
    state: customer.b_state || customer.s_state,
    zipCode: customer.b_postcode || customer.s_postcode,
    country: customer.b_country || customer.s_country,
  });
  const [orderId, setOrderId] = useState(null);

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
    setShippingInfo((prev) => {
      const updatedInfo = {
        ...prev,
        [field]: value,
      };

      if (field === "shippingStartDate" && value) {
        try {
          const [month, day, year] = value.split("-");
          if (month && day && year) {
            const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            const cancelDate = new Date(startDate);
            cancelDate.setDate(cancelDate.getDate() + 30);

            const cancelMonth = String(cancelDate.getMonth() + 1).padStart(2, '0');
            const cancelDay = String(cancelDate.getDate()).padStart(2, '0');
            const cancelYear = cancelDate.getFullYear();

            updatedInfo.shippingCancelDate = `${cancelMonth}-${cancelDay}-${cancelYear}`;
          }
        } catch (error) {
          console.log("Error calculating cancel date:", error);
        }
      }

      return updatedInfo;
    });
  };

  const formatDisplayDate = (dateString) => {
    try {
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

  const handleNext = async () => {
    if (!shippingInfo.selectedTerms) {
      Alert.alert("Validation Error", "Please select payment terms");
      return;
    }

    if (!shippingInfo.companyName || !shippingInfo.streetAddress || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode || !shippingInfo.country || !shippingInfo.shippingStartDate || !shippingInfo.shippingCancelDate) {
      Alert.alert("Validation Error", "Please fill in all required address fields");
      return;
    }

    try {
      const orderPayload = {
        orders: cart.productData.shoe1.map(item => ({
          storeName: cart.customer.StoreName,
          agentEmail: user.email || "agent@example.com",
          customerName: `${cart.customer.firstname} ${cart.customer.lastname}`,
          customerId: cart.customer.customerid,
          sku: cart.product.productCode,
          date: shippingInfo.shippingStartDate,
          Material1: cart.product.materials && cart.product.materials.length > 0 ? cart.product.materials[0] : cart.product.description,
          Material2: cart.product.materials && cart.product.materials.length > 1 ? cart.product.materials[1] : "",
          Material3: cart.product.materials && cart.product.materials.length > 2 ? cart.product.materials[2] : "",
          location1: cart.product.locations && cart.product.locations.length > 0 ? cart.product.locations[0] : "Upper",
          location2: cart.product.locations && cart.product.locations.length > 1 ? cart.product.locations[1] : "Sole",
          location3: cart.product.locations && cart.product.locations.length > 2 ? cart.product.locations[2] : "Lining",
          size: item.size.toString(),
          unitQuantity: item.quantity,
          unitFinalPrice: item.price,
          totalPrice: item.price * item.quantity,
          sales: item.price * item.quantity,
          status: "pending",
          brand: cart.product.brand || "Kinderland",
          styleName: cart.product.productName,
          styleFactory: cart.product.styleFactory || cart.product.factory ? `Factory ${cart.product.factory}` : "Factory A",
          shipTo: shippingInfo.companyName,
          shipTo_street: shippingInfo.streetAddress,
          shipTo_street2: shippingInfo.suite,
          shipTo_city: shippingInfo.city,
          shipTo_state: shippingInfo.state,
          shipTo_postcode: shippingInfo.zipCode,
          shipTo_country: shippingInfo.country,
          bow: "Standard",
          stitch: cart.product.stitch || "Double Stitch",
          outsoleType: cart.product.outsoleType || "Rubber",
          outsoleColor: cart.product.outsoleColor || "Black",
          orderNotes: `Payment Terms: ${shippingInfo.selectedTerms}, Shipping Start: ${shippingInfo.shippingStartDate}, Cancel Date: ${shippingInfo.shippingCancelDate}${cart.product.notes ? `, Product Notes: ${cart.product.notes}` : ""}`
        }))
      };

      console.log("Order payload:", JSON.stringify(orderPayload, null, 2));

      const response = await post(ENDPOINTS.CREATE_ORDER, orderPayload);
      console.log("Response:", JSON.stringify(response, null, 2));

      if (response.message?.includes('successfully') || response.order_number) {
        setOrderId(response.order_number);
        Alert.alert("Success", `Order created successfully! Order #${response.order_number}`);
        navigation.navigate('Digital Signature', {
          orderId: response.order_number,
        });
        setShippingDetails(shippingInfo);
        return;
      } else if (response.error || response.status === 'error') {
        Alert.alert("Error", response.message || response.error || "Failed to create order");
      } else {
        Alert.alert("Success", "Order created successfully!");
        setShippingDetails(shippingInfo);
      }
    } catch (error) {
      console.error("Error creating order:", error);

      if (error.message && error.message.includes('successfully')) {
        Alert.alert("Success", "Order created successfully!");
        setShippingDetails(shippingInfo);
      } else {
        Alert.alert("Error", error.message || "Failed to create order. Please try again.");
      }
    }
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

          {renderDateField("Shipping Start Date", shippingInfo.shippingStartDate, (text) =>
            updateField("shippingStartDate", text)
          )}

          {renderDateField("Shipping Cancel Date", shippingInfo.shippingCancelDate, (text) =>
            updateField("shippingCancelDate", text)
          )}

          <View style={[styles.addressSection, isTablet && styles.addressSectionTablet]}>
            <Text style={[styles.fieldLabel, isTablet && styles.fieldLabelTablet]}>Shipping Address</Text>

            {renderTextInput(shippingInfo.companyName, (text) => updateField("companyName", text), "Company Name", [
              styles.fullWidth,
              isTablet && styles.fullWidthTablet,
            ])}

            {renderTextInput(
              shippingInfo.streetAddress,
              (text) => updateField("streetAddress", text),
              "Street Address",
              [styles.fullWidth, isTablet && styles.fullWidthTablet]
            )}

            {renderTextInput(shippingInfo.suite, (text) => updateField("suite", text), "Suite/Unit", [
              styles.fullWidth,
              isTablet && styles.fullWidthTablet,
            ])}

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

      <View style={[styles.buttonContainer, isTablet && styles.buttonContainerTablet]}>
        <TouchableOpacity style={[styles.nextButton, isTablet && styles.nextButtonTablet]} onPress={handleNext}>
          <Text style={[styles.nextButtonText, isTablet && styles.nextButtonTextTablet]}>Next</Text>
        </TouchableOpacity>
      </View>

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

