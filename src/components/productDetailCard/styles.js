import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  listCardTablet: {
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 24,
    borderRadius: 10,
  },
  listContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  listImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#F9FAFB",
  },
  listImageContainerTablet: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  listImage: {
    width: "100%",
    height: "100%",
  },
  listImageTablet: {
    width: "100%",
    height: "100%",
  },
  listInfo: {
    flex: 1,
    paddingRight: 12,
  },
  listProductName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  listProductNameTablet: {
    fontSize: 18,
    marginBottom: 4,
  },
  listProductCode: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 2,
  },
  listProductCodeTablet: {
    fontSize: 14,
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "400",
  },
  listDescriptionTablet: {
    fontSize: 14,
  },
  listPricing: {
    alignItems: "flex-end",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sizeRange: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
    marginRight: 8,
  },
  sizeRangeTablet: {
    fontSize: 16,
    marginRight: 10,
  },
  price: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  priceTablet: {
    fontSize: 16,
  },
  detailsSection: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
    marginTop: 16,
  },
  detailsSectionTablet: {
    paddingTop: 20,
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingRight: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  infoRowTablet: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
    minWidth: 80,
  },
  infoLabelTablet: {
    fontSize: 14,
    minWidth: 100,
  },
  infoValue: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "400",
    flex: 1,
  },
  infoValueTablet: {
    fontSize: 14,
  },
});