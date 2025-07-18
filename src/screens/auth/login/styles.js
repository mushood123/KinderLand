import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#ffffff',
      marginHorizontal: 20,
      marginVertical: 50,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: '#333333',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 40,
      color: '#666666',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: '#333333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: '#fafafa',
    },
    inputError: {
      borderColor: '#ff4444',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#fafafa',
    },
    passwordInput: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    eyeButton: {
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    eyeText: {
      fontSize: 18,
    },
    errorText: {
      color: '#ff4444',
      fontSize: 14,
      marginTop: 5,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginBottom: 30,
    },
    forgotPasswordText: {
      color: '#007bff',
      fontSize: 14,
      fontWeight: '500',
    },
    loginButton: {
      backgroundColor: '#007bff',
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: '#666666',
      fontSize: 14,
    },
    signupLink: {
      color: '#007bff',
      fontSize: 14,
      fontWeight: '500',
    },
  });