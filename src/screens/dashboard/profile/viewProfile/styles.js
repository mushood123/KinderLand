import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  contentTablet: {
    paddingHorizontal: 60,
    paddingTop: 60,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImageTablet: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  userNameTablet: {
    fontSize: 28,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoCardTablet: {
    padding: 32,
    maxWidth: 500,
    marginBottom: 80,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
    minWidth: 120,
  },
  infoValue: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 60,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonTablet: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    minWidth: 250,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButtonTextTablet: {
    fontSize: 20,
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  editProfileText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black',
  },
});

