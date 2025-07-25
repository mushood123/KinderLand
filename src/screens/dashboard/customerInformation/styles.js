import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  orderHistoryText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginVertical: 20
  },
  loadingText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic'
  },
  noOrdersText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic'
  }
})