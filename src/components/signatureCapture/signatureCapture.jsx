import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

export const SignatureCapture = ({ onSignatureCapture, onClear }) => {
  const [hasSignature, setHasSignature] = useState(false);
  const signatureRef = useRef(null);

  const handleSignature = signature => {
    setHasSignature(true);
    console.log('Signature captured');
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
    setHasSignature(false);
    onClear && onClear();
  };

  const handleSave = () => {
    if (!hasSignature) {
      Alert.alert('Error', 'Please provide a signature before saving.');
      return;
    }

    signatureRef.current.saveSignature();
  };

  const handleSaveImage = result => {
    // result.encoded - for the base64 encoded png
    // result.pathName - for the file path name
    console.log('Signature saved:', result);

    // Create file object for upload
    const signatureFile = {
      uri: result.pathName,
      type: 'image/png',
      name: 'signature.png',
    };

    onSignatureCapture && onSignatureCapture(signatureFile);
  };

  const handleEmpty = () => {
    setHasSignature(false);
  };

  const handleGetData = () => {
    // Returns the image data and data URL
    signatureRef.current.getData();
  };

  const handleGetDataUrl = () => {
    // Returns the data URL of the signature
    signatureRef.current.getDataUrl();
  };

  const style = `
    .m-signature-pad {
      box-shadow: none;
      border: none;
    }
    .m-signature-pad--body {
      border: none;
    }
    .m-signature-pad--footer {
      display: none;
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
          onEnd={handleSignature}
          webStyle={style}
          backgroundColor="#4A5C63"
          strokeWidth={3}
          strokeColor="#FFFFFF"
          minWidth={3}
          maxWidth={4}
          canvasProps={{
            width: width * 0.9,
            height: height * 0.4,
            className: 'signature-canvas',
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !hasSignature && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!hasSignature}
        >
          <Text style={styles.saveButtonText}>Save Signature</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
