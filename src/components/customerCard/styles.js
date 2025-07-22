import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  listContainerTablet: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  listLeftSection: {
    flex: 1,
    marginRight: 16,
  },
  listRightSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  listShopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  listShopNameTablet: {
    fontSize: 20,
    marginBottom: 6,
  },
  listName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
    marginBottom: 6,
  },
  listNameTablet: {
    fontSize: 18,
    marginBottom: 8,
  },
  listAddress: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  listAddressTablet: {
    fontSize: 16,
    lineHeight: 20,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    width: (width - 48) / 2, // Calculate width for 2 columns with margins
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardContainerTablet: {
    padding: 20,
    margin: 12,
    width: (width - 72) / 2, // Adjusted for tablet margins
    minHeight: 220,
    borderRadius: 20,
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardShopName: {
    fontSize: 16, // Slightly smaller for grid layout
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardShopNameTablet: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 22,
  },
  cardName: {
    fontSize: 14, // Slightly smaller for grid layout
    fontWeight: '500',
    color: '#3B82F6',
    marginBottom: 8,
  },
  cardNameTablet: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardAddress: {
    fontSize: 12, // Smaller for grid layout
    color: '#6B7280',
    lineHeight: 16,
    flex: 1,
  },
  cardAddressTablet: {
    fontSize: 14,
    lineHeight: 18,
  },
  idBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  idBadgeTablet: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  idText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  idTextTablet: {
    fontSize: 14,
  },
  cardIdBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardIdBadgeTablet: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  cardIdText: {
    fontSize: 11, // Smaller for grid layout
    fontWeight: '600',
    color: '#6B7280',
  },
  cardIdTextTablet: {
    fontSize: 13,
  },
});