import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  headerToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 0,
    marginRight: 5,
  },
  headerToolbarTablet: {
    paddingHorizontal: 8,
    marginRight: 12,
  },
  headerIconButton: {
    padding: 8,
    marginHorizontal: 0.5,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  headerIconButtonTablet: {
    padding: 10,
    marginHorizontal: 3,
    borderRadius: 8,
  },
  gridContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  gridContainerTablet: {
    width: 24,
    height: 24,
  },
  gridSquare: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 1.5,
  },
  gridSquareTopLeft: {
    top: 0,
    left: 0,
  },
  gridSquareTopRight: {
    top: 0,
    right: 0,
  },
  gridSquareBottomLeft: {
    bottom: 0,
    left: 0,
  },
  gridSquareBottomRight: {
    bottom: 0,
    right: 0,
  },
  listContainer: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  listContainerTablet: {
    width: 24,
    height: 18,
  },
  listLine: {
    height: 2,
    backgroundColor: '#374151',
    borderRadius: 1,
    width: '100%',
  },
  listLineTablet: {
    height: 2.5,
  },
  menuContainer: {
    width: 20,
    height: 14,
    justifyContent: 'space-between',
  },
  menuContainerTablet: {
    width: 24,
    height: 16,
  },
  menuLine: {
    height: 2,
    backgroundColor: '#374151',
    borderRadius: 1,
    width: '100%',
  },
  menuLineTablet: {
    height: 2.5,
  },
  menuLineMiddle: {
    width: '80%',
    alignSelf: 'center',
  },
  headerAddButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  headerAddButtonTablet: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },
  headerAddButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  headerAddButtonTextTablet: {
    fontSize: 15,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6B7280',
  },
  toolbarTablet: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  iconButtonTablet: {
    padding: 12,
    borderRadius: 12,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonTablet: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonTextTablet: {
    fontSize: 16,
  },
});