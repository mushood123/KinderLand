import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  containerTablet: {
    paddingHorizontal: 40,
  },
  content: {
    padding: 20,
  },
  contentTablet: {
    padding: 32,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  section: {
    marginBottom: 24,
  },
  sectionTablet: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  sectionTitleTablet: {
    fontSize: 22,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  rowTablet: {
    marginBottom: 16,
    gap: 16,
  },
  addressRow: {
    flexDirection: "row",
    gap: 8,
  },
  addressRowTablet: {
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  halfWidthTablet: {
    flex: 1,
  },
  quarterWidth: {
    flex: 1,
  },
  quarterWidthTablet: {
    flex: 1,
  },
  fullWidth: {
    marginBottom: 12,
  },
  fullWidthTablet: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  textInputTablet: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    borderRadius: 10,
  },
  checkboxSection: {
    marginBottom: 24,
  },
  checkboxSectionTablet: {
    marginBottom: 32,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxRowTablet: {
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxTablet: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderRadius: 6,
  },
  checkmark: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkmarkTablet: {
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  checkboxLabelTablet: {
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  updateButtonTablet: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 60,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  updateButtonTextTablet: {
    fontSize: 18,
  },
});