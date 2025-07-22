import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardTablet: {
    padding: 28,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  poNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  poNumberTablet: {
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonTablet: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  editIcon: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  editIconTablet: {
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 14,
    color: "#EF4444",
  },
  deleteIconTablet: {
    fontSize: 16,
  },
  detailsSection: {
    marginBottom: 16,
    gap: 4,
  },
  productName: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  productNameTablet: {
    fontSize: 16,
  },
  customerName: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  customerNameTablet: {
    fontSize: 16,
  },
  orderDate: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "400",
  },
  orderDateTablet: {
    fontSize: 16,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
  },
  addressSection: {
    flex: 1,
    paddingRight: 16,
  },
  shippingLabel: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
    marginBottom: 4,
  },
  shippingLabelTablet: {
    fontSize: 14,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
    lineHeight: 18,
  },
  addressTextTablet: {
    fontSize: 16,
    lineHeight: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  statusTextTablet: {
    fontSize: 16,
  },
});