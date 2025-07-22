import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerTablet: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginHorizontal: 24,
    marginVertical: 12,
    borderRadius: 30,
  },
  iconButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonTablet: {
    padding: 16,
  },
  searchIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  searchIconTablet: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputTablet: {
    fontSize: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  inputNoIcon: {
    paddingLeft: 16,
  },
  clearButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  clearButtonTablet: {
    padding: 12,
  },
  clearButtonBackground: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonBackgroundTablet: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  clearIcon: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  clearIconTablet: {
    fontSize: 14,
  },
  searchButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonTablet: {
    padding: 16,
  },
});