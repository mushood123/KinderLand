import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const isTablet = width > 768

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: "#6B7280",
    fontWeight: "400",
    lineHeight: isTablet ? 22 : 20,
  },
  itemsSection: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  summarySection: {
    paddingTop: 32,
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    paddingVertical: isTablet ? 18 : 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
})
