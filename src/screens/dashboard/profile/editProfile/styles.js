import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  contentTablet: {
    paddingHorizontal: 60,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  profileImageContainerTablet: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImageTablet: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 0,
  },
  rowSmall: {
    flexDirection: 'column',
    gap: 0,
  },
  rowTablet: {
    gap: 24,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  passwordSection: {
    marginTop: 20,
  },
  changePasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  changePasswordText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
  changePasswordTextTablet: {
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  updateButtonTablet: {
    paddingVertical: 20,
    marginHorizontal: 40,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  updateButtonTextTablet: {
    fontSize: 20,
  },
});