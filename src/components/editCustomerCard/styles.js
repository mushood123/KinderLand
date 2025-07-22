import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  cardTablet: {
    padding: 28,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    paddingRight: 16,
  },
  customerNameTablet: {
    fontSize: 22,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonTablet: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  editIcon: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  editIconTablet: {
    fontSize: 18,
  },
  detailsSection: {
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  detailTextTablet: {
    fontSize: 16,
  },
  phoneNumber: {
    marginBottom: 8,
  },
  shippingLabel: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 8,
  },
  shippingLabelTablet: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  addressSection: {
    gap: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#111827',
    lineHeight: 20,
  },
  addressTextTablet: {
    fontSize: 16,
    lineHeight: 24,
  },
});