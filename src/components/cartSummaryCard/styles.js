import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  containerTablet: {
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 10,
  },
  iconContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 16,
  },
  iconContainerTablet: {
    width: 60,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  cartIcon: {
    fontSize: 20,
    color: "#6B7280",
  },
  cartIconTablet: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 8,
  },
  contentTablet: {
    paddingVertical: 20,
    paddingRight: 20,
    paddingLeft: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  rowTablet: {
    paddingVertical: 6,
  },
  separator: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 8,
  },
  separatorTablet: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  labelTablet: {
    fontSize: 16,
  },
  unitValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  unitValueTablet: {
    fontSize: 16,
  },
  grandTotalValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
  },
  grandTotalValueTablet: {
    fontSize: 18,
  },
});