import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
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
    borderColor: "#E5E7EB",
  },
  cardTablet: {
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  productNameTablet: {
    fontSize: 20,
    marginBottom: 4,
  },
  productCode: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  productCodeTablet: {
    fontSize: 16,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonTablet: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  deleteIcon: {
    fontSize: 16,
    color: "#EF4444",
  },
  deleteIconTablet: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 16,
  },
  descriptionTablet: {
    fontSize: 16,
    marginBottom: 20,
  },
  mainContent: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#F9FAFB",
  },
  imageContainerTablet: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productImageTablet: {
    width: "100%",
    height: "100%",
  },
  gridScrollView: {
    flex: 1,
  },
  gridScrollContent: {
    paddingRight: 16,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: "row",
  },
  gridCell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  gridCellTablet: {
    width: 45,
    height: 45,
  },
  sizeCell: {
    backgroundColor: "#F9FAFB",
  },
  quantityCell: {
    backgroundColor: "#FFFFFF",
  },
  sizeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  sizeTextTablet: {
    fontSize: 14,
  },
  quantityText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
    textAlign: "center",
  },
  quantityTextTablet: {
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  priceTier: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
    marginRight: 16,
  },
  priceTierTablet: {
    fontSize: 14,
    marginRight: 20,
  },
  customPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  equalSign: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
    marginRight: 4,
  },
  equalSignTablet: {
    fontSize: 14,
  },
  customPriceInput: {
    width: 60,
    height: 24,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
  },
  customPriceInputTablet: {
    width: 80,
    height: 32,
    fontSize: 14,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPairs: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  totalPairsTablet: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "700",
  },
  totalValueTablet: {
    fontSize: 16,
  },
});