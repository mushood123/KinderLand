import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerTablet: {
    paddingHorizontal: 20,
  },

  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 16,
  },
  headerContainerTablet: {
    padding: 24,
    marginBottom: 20,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  controlsContainerTablet: {
    marginTop: 20,
  },

  layoutButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  layoutButtonTablet: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  layoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  layoutButtonTextTablet: {
    fontSize: 16,
  },

  resultsCount: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  resultsCountTablet: {
    fontSize: 16,
  },

  listContainer: {
    padding: 16,
  },
  listContainerTablet: {
    padding: 20,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  separator: {
    height: 16,
  },
  separatorTablet: {
    height: 20,
  },

  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTablet: {
    padding: 48,
  },

  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateTitleTablet: {
    fontSize: 24,
  },

  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyStateTextTablet: {
    fontSize: 18,
    lineHeight: 26,
  },

  clearButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  clearButtonTablet: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 20,
  },

  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  clearButtonTextTablet: {
    fontSize: 16,
  },

  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonTablet: {
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonTextTablet: {
    fontSize: 28,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTablet: {
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 8,
    flex: 1,
  },

  listCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listCardTablet: {
    padding: 16,
    marginBottom: 16,
  },

  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  imageContainerTablet: {
    width: 100,
    height: 100,
    marginRight: 20,
  },

  listImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  listImageContainerTablet: {
    width: 70,
    height: 70,
    marginRight: 16,
  },

  productImage: {
    width: '100%',
    height: '100%',
  },
  productImageTablet: {
    width: '100%',
    height: '100%',
  },

  listImage: {
    width: '100%',
    height: '100%',
  },
  listImageTablet: {
    width: '100%',
    height: '100%',
  },

  productDetails: {
    flex: 1,
    paddingRight: 16,
  },

  listInfo: {
    flex: 1,
    paddingRight: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  productNameTablet: {
    fontSize: 20,
  },

  listProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  listProductNameTablet: {
    fontSize: 18,
  },

  productCode: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  productCodeTablet: {
    fontSize: 16,
  },

  listProductCode: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  listProductCodeTablet: {
    fontSize: 14,
  },

  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  descriptionTablet: {
    fontSize: 16,
    lineHeight: 22,
  },

  listDescription: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 16,
    numberOfLines: 2,
  },
  listDescriptionTablet: {
    fontSize: 14,
    lineHeight: 18,
  },

  pricingSection: {
    alignItems: 'flex-end',
  },

  listPricing: {
    alignItems: 'flex-end',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  sizeRange: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
    minWidth: 40,
  },
  sizeRangeTablet: {
    fontSize: 14,
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  priceTablet: {
    fontSize: 16,
  },

  detailsSection: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },

  column: {
    flex: 1,
    paddingRight: 16,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  infoRowTablet: {
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    minWidth: 80,
    marginRight: 8,
  },
  infoLabelTablet: {
    fontSize: 14,
    minWidth: 100,
  },

  infoValue: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  infoValueTablet: {
    fontSize: 14,
  },
});