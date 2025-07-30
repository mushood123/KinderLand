import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

export const SignatureCapture = ({ onSignatureCapture, onClear }) => {
  const [hasSignature, setHasSignature] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const signatureRef = useRef(null);

  useEffect(() => {
    return () => {
      if (signatureRef.current) {
        try {
          signatureRef.current.clearSignature();
        } catch (error) {
          console.log('Cleanup error:', error);
        }
      }
    };
  }, []);

  const handleSignature = signature => {
    console.log('handleSignature called with:', signature);
    console.log('Platform: iOS - onEnd callback (signature data not available here)');
    setHasSignature(true);
    console.log('Signature drawing completed');
  };

  const handleClear = () => {
    try {
      if (signatureRef.current) {
        signatureRef.current.clearSignature();
      }
      setHasSignature(false);
      setIsProcessing(false);
      console.log('Signature cleared');

      if (onClear) {
        onClear();
      }
    } catch (error) {
      console.error('Error clearing signature:', error);
      Alert.alert('Error', 'Failed to clear signature. Please try again.');
    }
  };

  const handleSave = () => {
    console.log('Save button pressed, hasSignature:', hasSignature);

    if (!hasSignature) {
      Alert.alert('Error', 'Please provide a signature before saving.');
      return;
    }

    if (isProcessing) {
      console.log('Already processing, ignoring save request');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Attempting to get signature data...');
      if (signatureRef.current) {
        console.log('Calling readSignature...');
        signatureRef.current.readSignature();
      } else {
        throw new Error('Signature reference is null');
      }
    } catch (error) {
      console.error('Error calling readSignature:', error);

      try {
        console.log('Fallback: Calling getData...');
        if (signatureRef.current) {
          signatureRef.current.getData();
        }
      } catch (fallbackError) {
        console.error('Fallback getData also failed:', fallbackError);
        setIsProcessing(false);
        Alert.alert('Error', 'Failed to save signature. Please try again.');
      }
    }
  };

  const handleSaveImage = result => {
    console.log('=== handleSaveImage called ===');
    console.log('Result type:', typeof result);
    console.log('Result:', result);

    setIsProcessing(false);

    if (!result) {
      console.error('No result received in handleSaveImage');
      Alert.alert('Error', 'Failed to capture signature data. Please try again.');
      return;
    }

    try {
      let signatureFile;

      if (typeof result === 'string') {
        console.log('Processing string result (base64)');
        let uri = result;

        if (!uri.startsWith('data:')) {
          uri = `data:image/png;base64,${uri}`;
        }

        signatureFile = {
          uri: uri,
          type: 'image/png',
          name: 'signature.png',
        };
      }
      else if (result && typeof result === 'object') {
        console.log('Processing object result');
        console.log('Object keys:', Object.keys(result));

        const uri = result.encoded || result.pathName || result.base64 || result.dataURL || result.signature;

        if (!uri) {
          console.error('No valid URI found in result object:', result);
          throw new Error('No signature data found in result');
        }

        let processedUri = uri;
        if (typeof uri === 'string' && !uri.startsWith('data:')) {
          processedUri = `data:image/png;base64,${uri}`;
        }

        signatureFile = {
          uri: processedUri,
          type: 'image/png',
          name: 'signature.png',
        };
      } else {
        console.error('Unexpected result type:', typeof result);
        throw new Error('Invalid signature result format');
      }

      console.log('Created signatureFile:', {
        hasUri: !!signatureFile.uri,
        uriLength: signatureFile.uri ? signatureFile.uri.length : 0,
        type: signatureFile.type,
        name: signatureFile.name
      });

      if (!signatureFile.uri) {
        throw new Error('Signature URI is missing');
      }

      if (signatureFile.uri.includes('base64,')) {
        const base64Part = signatureFile.uri.split('base64,')[1];
        if (!base64Part || base64Part.length < 100) {
          console.warn('Base64 signature seems too short:', base64Part?.length);
        }
      }

      if (onSignatureCapture) {
        console.log('Calling onSignatureCapture callback');
        onSignatureCapture(signatureFile);
        console.log('onSignatureCapture callback completed');
      } else {
        console.error('onSignatureCapture callback is not provided');
        Alert.alert('Error', 'Callback function not available.');
      }
    } catch (error) {
      console.error('Error processing signature:', error);
      Alert.alert('Error', `Failed to process signature: ${error.message}`);
    }

    console.log('=== handleSaveImage completed ===');
  };

  const handleEmpty = () => {
    console.log('Signature canvas is empty');
    setHasSignature(false);
    setIsProcessing(false);

    if (onClear) {
      onClear();
    }
  };

  const handleGetData = (data) => {
    console.log('handleGetData called with:', typeof data === 'string' ? data.substring(0, 100) + '...' : data);
    handleSaveImage(data);
  };

  const handleGetDataUrl = (dataUrl) => {
    console.log('handleGetDataUrl called with:', typeof dataUrl === 'string' ? dataUrl.substring(0, 100) + '...' : dataUrl);
    handleSaveImage(dataUrl);
  };

  const handleReadSignature = (signature) => {
    console.log('handleReadSignature called with:', typeof signature === 'string' ? signature.substring(0, 100) + '...' : signature);

    if (signature) {
      handleSaveImage(signature);
    } else {
      console.error('No signature data received from readSignature');
      Alert.alert('Error', 'Failed to read signature image. Please try again.');
    }
  };

  const style = `
    .m-signature-pad {
      box-shadow: none;
      border: none;
      border-radius: 8px;
    }
    .m-signature-pad--body {
      border: none;
      border-radius: 8px;
    }
    .m-signature-pad--footer {
      display: none;
    }
    body {
      margin: 0;
      padding: 0;
    }
  `;

  return (
    <View style={styles.container}>
      <View style={styles.signatureArea}>
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleSaveImage}
          onEmpty={handleEmpty}
          onGetData={handleGetData}
          onGetDataUrl={handleGetDataUrl}
          onReadSignature={handleReadSignature}
          onEnd={handleSignature}
          onBegin={() => {
            console.log('Signature started');
            setHasSignature(true);
          }}
          webStyle={style}
          backgroundColor="#4A5C63"
          strokeWidth={3}
          strokeColor="#FFFFFF"
          minWidth={3}
          maxWidth={4}
          penColor="#FFFFFF"
          clearText="Clear"
          confirmText="Save"
          descriptionText="Sign above"
          dataURL=""
          imageType="image/png"
          canvasProps={{
            width: width * 0.9,
            height: height * 0.4,
            className: 'signature-canvas',
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
          disabled={isProcessing}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!hasSignature || isProcessing) && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!hasSignature || isProcessing}
        >
          <Text style={styles.saveButtonText}>
            {isProcessing ? 'Processing...' : 'Save Signature'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};