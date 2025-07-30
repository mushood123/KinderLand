import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { UserContext, CartContext, ShippingContext } from '../../../context';
import { uploadPDF, ENDPOINTS } from '../../../api';

export const GeneratePdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { shippingDetails } = useContext(ShippingContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  console.log('orderId', orderId)
  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to storage to save PDF files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // HTML content for the PDF
  const createHTMLContent = () => {
    const currentDate = new Date().toLocaleDateString();

    // Generate product rows
    const generateProductRows = () => {
      if (!cart?.products || cart.products.length === 0) return '';

      return cart.products.map(product => {
        return product.sizeQuantities.map(sizeQty => {
          const priceForSize = product.priceTiers.find(tier => {
            const [min, max] = tier.sizeRange.split('-').map(Number);
            return sizeQty.size >= min && sizeQty.size <= max;
          });

          const unitPrice = priceForSize?.price || 0;
          const lineTotal = unitPrice * sizeQty.quantity;

          return `
            <tr>
              <td>${product.productName} (${product.productCode})</td>
              <td>${product.description}</td>
              <td>Size ${sizeQty.size}</td>
              <td>${sizeQty.quantity}</td>
              <td>$${unitPrice.toFixed(2)}</td>
              <td>$${lineTotal.toFixed(2)}</td>
            </tr>
          `;
        }).join('');
      }).join('');
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>VENETTINI Order - ${cart?.customer?.StoreName || 'Order'}</title>
          <style>
            @page {
              margin: 40px;
              size: A4;
            }
            
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              line-height: 1.6;
              color: #2c3e50;
              font-size: 13px;
              background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            }
            
            /* Elegant Header with Premium Feel */
            .header {
              text-align: center;
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
              color: white;
              padding: 35px 25px;
              border-radius: 15px;
              margin-bottom: 35px;
              box-shadow: 0 8px 25px rgba(30, 60, 114, 0.3);
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              pointer-events: none;
            }
            
            .header h1 {
              margin: 0;
              font-size: 42px;
              font-weight: 300;
              letter-spacing: 8px;
              text-transform: uppercase;
              position: relative;
              z-index: 1;
            }
            
            .header .brand-tagline {
              font-size: 16px;
              font-weight: 300;
              font-style: italic;
              margin: 8px 0 20px 0;
              opacity: 0.9;
              letter-spacing: 1px;
            }
            
            .header .order-info {
              background: rgba(255, 255, 255, 0.15);
              backdrop-filter: blur(10px);
              padding: 15px 25px;
              border-radius: 25px;
              display: inline-block;
              margin-top: 15px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .order-info .order-title {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 5px;
            }
            
            .order-info .order-date {
              font-size: 14px;
              opacity: 0.9;
            }
            
            /* Premium Card Layout */
            .content-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 25px;
              margin-bottom: 35px;
            }
            
            .info-card {
              background: white;
              padding: 25px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              border: 1px solid #e8ecf0;
              position: relative;
              transition: all 0.3s ease;
            }
            
            .info-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #1e3c72, #2a5298);
              border-radius: 12px 12px 0 0;
            }
            
            .info-card h3 {
              margin: 0 0 20px 0;
              color: #1e3c72;
              font-size: 18px;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .info-card p {
              margin: 12px 0;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid #f1f3f5;
            }
            
            .info-card p:last-child {
              border-bottom: none;
            }
            
            .info-card strong {
              color: #2c3e50;
              font-weight: 600;
              min-width: 100px;
            }
            
            .info-value {
              color: #495057;
              font-weight: 500;
              text-align: right;
            }
            
            .highlight {
              background: linear-gradient(120deg, #ffd700, #ffed4e);
              color: #8b4513;
              padding: 4px 12px;
              border-radius: 20px;
              font-weight: 600;
              font-size: 13px;
              box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
            }
            
            /* Shipping Section */
            .shipping-section {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 15px;
              margin: 35px 0;
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            }
            
            .shipping-section h3 {
              margin: 0 0 25px 0;
              font-size: 22px;
              font-weight: 300;
              text-align: center;
              letter-spacing: 1px;
            }
            
            .shipping-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
            }
            
            .shipping-column {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 10px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .shipping-column p {
              margin: 10px 0;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              padding: 8px 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .shipping-column p:last-child {
              border-bottom: none;
            }
            
            /* Premium Table Design */
            .table-container {
              margin: 35px 0;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
              background: white;
            }
            
            .table-header {
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
              color: white;
              padding: 20px;
              text-align: center;
            }
            
            .table-header h2 {
              margin: 0;
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 2px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
            }
            
            th {
              background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
              color: white;
              padding: 18px 12px;
              font-size: 13px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              text-align: center;
              border: none;
            }
            
            td {
              padding: 16px 12px;
              font-size: 13px;
              border-bottom: 1px solid #eef2f7;
              text-align: center;
              color: #495057;
            }
            
            td:first-child {
              text-align: left;
              font-weight: 600;
              color: #2c3e50;
            }
            
            tr:nth-child(even) {
              background: #f8f9fa;
            }
            
            tr:hover {
              background: #e3f2fd;
              transition: all 0.3s ease;
            }
            
            .total-row {
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
              color: white !important;
              font-weight: 700;
              font-size: 15px;
              border-top: 3px solid #34495e;
            }
            
            .total-row td {
              color: white !important;
              border-bottom: none;
              padding: 20px 12px;
            }
            
            /* Product Details Premium Card */
            .product-showcase {
              background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
              padding: 30px;
              border-radius: 15px;
              margin: 35px 0;
              box-shadow: 0 8px 25px rgba(255, 154, 158, 0.3);
              color: #5d4037;
            }
            
            .product-showcase h3 {
              margin: 0 0 25px 0;
              font-size: 22px;
              font-weight: 300;
              text-align: center;
              color: #3e2723;
              letter-spacing: 1px;
            }
            
            .specs-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
            }
            
            .spec-item {
              background: rgba(255, 255, 255, 0.3);
              padding: 15px;
              border-radius: 10px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.4);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .spec-label {
              font-weight: 600;
              color: #3e2723;
            }
            
            .spec-value {
              font-weight: 500;
              color: #5d4037;
            }
            
            /* Order Summary Premium Box */
            .summary-box {
              background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
              padding: 30px;
              border-radius: 15px;
              margin: 35px 0;
              box-shadow: 0 8px 25px rgba(168, 237, 234, 0.4);
              text-align: center;
            }
            
            .summary-box h3 {
              margin: 0 0 25px 0;
              font-size: 24px;
              font-weight: 300;
              color: #2c3e50;
              letter-spacing: 1px;
            }
            
            .summary-stats {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            
            .stat-card {
              background: rgba(255, 255, 255, 0.4);
              padding: 20px;
              border-radius: 12px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.5);
            }
            
            .stat-value {
              font-size: 28px;
              font-weight: 700;
              color: #1e3c72;
              margin-bottom: 5px;
            }
            
            .stat-label {
              font-size: 14px;
              color: #495057;
              font-weight: 500;
            }
            
            /* Elegant Footer */
            .footer {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: white;
              padding: 40px 30px;
              border-radius: 15px;
              margin-top: 50px;
              text-align: center;
              box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
            }
            
            .footer-brand {
              font-size: 32px;
              font-weight: 300;
              letter-spacing: 4px;
              margin-bottom: 15px;
              color: #ecf0f1;
            }
            
            .footer-tagline {
              font-size: 16px;
              font-style: italic;
              margin-bottom: 25px;
              opacity: 0.9;
            }
            
            .footer-contact {
              background: rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 10px;
              backdrop-filter: blur(10px);
              margin-top: 20px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .footer-contact p {
              margin: 8px 0;
              font-size: 14px;
            }
            
            .footer-signature {
              margin-top: 25px;
              font-size: 13px;
              opacity: 0.8;
              font-style: italic;
            }
            
            /* Responsive adjustments for PDF */
            @media print {
              body { background: white; }
              .header, .shipping-section, .product-showcase, .summary-box, .footer {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>VENETTINI</h1>
            <div class="brand-tagline">Premium Children's Footwear</div>
            <div class="order-date">ORDER SUMMARY</div>
            <p><strong>Generated:</strong> ${currentDate}</p>
          </div>
          
          <div class="company-info">
            <div class="info-section">
              <h3>Sales Representative</h3>
              <p><strong>Name:</strong> ${user?.firstname || ''} ${user?.lastname || ''}</p>
              <p><strong>Email:</strong> ${user?.email || ''}</p>
              <p><strong>Phone:</strong> ${user?.phone || ''}</p>
              <p><strong>Store:</strong> ${user?.storeName || ''}</p>
            </div>
            
            <div class="info-section">
              <h3>Customer Information</h3>
              <p><strong>Store:</strong> <span class="highlight">${cart?.customer?.StoreName || ''}</span></p>
              <p><strong>Contact:</strong> ${cart?.customer?.firstname || ''} ${cart?.customer?.lastname || ''}</p>
              <p><strong>Email:</strong> ${cart?.customer?.email_1 || ''}</p>
              <p><strong>Store Phone:</strong> ${cart?.customer?.StorePhone || ''}</p>
              <p><strong>Cell:</strong> ${cart?.customer?.cell_1 || ''}</p>
              <p><strong>Customer ID:</strong> ${cart?.customer?.customerid || ''}</p>
            </div>
          </div>
          
          <div class="shipping-info">
            <h3>📦 Shipping & Delivery Details</h3>
            <div class="shipping-content">
              <div class="shipping-column">
                <p><strong>Company:</strong> ${shippingDetails?.companyName || ''}</p>
                <p><strong>Address:</strong> ${shippingDetails?.streetAddress || ''}</p>
                ${shippingDetails?.suite ? `<p><strong>Suite:</strong> ${shippingDetails.suite}</p>` : ''}
                <p><strong>City:</strong> ${shippingDetails?.city || ''}</p>
                <p><strong>State:</strong> ${shippingDetails?.state || ''}</p>
                <p><strong>ZIP Code:</strong> ${shippingDetails?.zipCode || ''}</p>
                <p><strong>Country:</strong> ${shippingDetails?.country || ''}</p>
              </div>
              <div class="shipping-column">
                <p><strong>Payment Terms:</strong> <span class="highlight">${shippingDetails?.selectedTerms || ''}</span></p>
                <p><strong>Ship Start Date:</strong> ${shippingDetails?.shippingStartDate || ''}</p>
                <p><strong>Cancel Date:</strong> ${shippingDetails?.shippingCancelDate || ''}</p>
              </div>
            </div>
          </div>
          
          <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px; margin-top: 30px;">📋 Order Details</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              ${generateProductRows()}
              <tr class="total-row">
                <td colspan="3"><strong>ORDER TOTAL</strong></td>
                <td><strong>${cart?.totals?.totalPairs || 0} pairs</strong></td>
                <td></td>
                <td><strong>$${cart?.totals?.totalValue?.toFixed(2) || '0.00'}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div class="product-details">
            <h4>🔍 Product Specifications</h4>
            <p><strong>Brand:</strong> ${cart?.product?.brand || 'VENETTINI'}</p>
            <p><strong>Season:</strong> ${cart?.product?.season || ''}</p>
            <p><strong>Style Factory:</strong> ${cart?.product?.styleFactory || ''}</p>
            <p><strong>Outsole Color:</strong> ${cart?.product?.outsoleColor || ''}</p>
            <p><strong>Outsole Type:</strong> ${cart?.product?.outsoleType || ''}</p>
            <p><strong>Stitch:</strong> ${cart?.product?.stitch || ''}</p>
            ${cart?.product?.materials?.length > 0 ? `<p><strong>Materials:</strong> ${cart.product.materials.join(', ')}</p>` : ''}
            ${cart?.product?.notes && cart.product.notes !== 'No additional notes' ? `<p><strong>Notes:</strong> ${cart.product.notes}</p>` : ''}
          </div>
          
          <div class="order-summary">
            <h3>📊 Order Summary</h3>
            <p><strong>Total Pairs:</strong> <span class="highlight">${cart?.totals?.totalPairs || 0} pairs</span></p>
            <p><strong>Total Order Value:</strong> <span class="highlight">$${cart?.totals?.totalValue?.toFixed(2) || '0.00'}</span></p>
            <p><strong>Payment Terms:</strong> ${shippingDetails?.selectedTerms || ''}</p>
            <p><strong>Order Generated By:</strong> ${user?.firstname || ''} ${user?.lastname || ''}</p>
          </div>
          
          <div class="footer">
            <p><strong>VENETTINI - Premium Children's Footwear</strong></p>
            <p>This order summary was generated on ${currentDate}</p>
            <p>For questions regarding this order, please contact:</p>
            <p>${user?.firstname || ''} ${user?.lastname || ''} | ${user?.email || ''} | ${user?.phone || ''}</p>
            <p><em>Thank you for choosing VENETTINI for your premium children's footwear needs.</em></p>
          </div>
        </body>
      </html>
    `;
  };

  // Generate PDF function
  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Check permissions
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required to save PDF files.');
        setIsGenerating(false);
        return;
      }

      const customerName = cart?.customer?.StoreName?.replace(/\s+/g, '_') || 'Customer';
      const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

      // PDF generation options
      const options = {
        html: createHTMLContent(),
        fileName: `VENETTINI_Order_${customerName}_${timestamp}`,
        directory: 'Documents',
        width: 612, // A4 width in points
        height: 792, // A4 height in points
        padding: 24,
        bgColor: '#FFFFFF',
      };

      // Generate PDF
      const pdf = await RNHTMLtoPDF.convert(options);

      Alert.alert(
        '✅ Order PDF Generated Successfully!',
        `Order summary created for ${cart?.customer?.StoreName || 'customer'}\n\nTotal: $${cart?.totals?.totalValue?.toFixed(2) || '0.00'} (${cart?.totals?.totalPairs || 0} pairs)`,
        [
          {
            text: 'Share PDF',
            onPress: () => sharePDF(pdf.filePath),
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
                // Create proper file object for React Native
                const fileData = {
                  uri: `file://${pdf.filePath}`,
                  type: 'application/pdf',
                  name: `VENETTINI_Order_${orderId}.pdf`,
                };

                const response = await uploadPDF(ENDPOINTS.UPLOAD_PDF, fileData, `pdf_${orderId}`, orderId);
                console.log('PDF upload response:', response);

                if (response.message && response.message.includes('inserted')) {
                  Alert.alert('✅ Success', 'PDF uploaded successfully!');
                  setTimeout(() => {
                    navigation.navigate('Home');
                  }, 2000);
                } else {
                  Alert.alert('❌ Upload Failed', response.message || 'Failed to upload PDF');
                }
              } catch (error) {
                console.error('PDF upload error:', error);
                Alert.alert('Upload Error', 'Failed to upload PDF. Please try again.');
              }
            },
            style: 'default',
          },
        ]
      );

    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert('❌ Error', 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Share PDF function
  const sharePDF = async (filePath) => {
    try {
      const shareOptions = {
        title: 'Share VENETTINI Order Summary',
        url: `file://${filePath}`,
        type: 'application/pdf',
        subject: `VENETTINI Order - ${cart?.customer?.StoreName || 'Customer Order'}`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share cancelled or error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Order PDF</Text>
      <Text style={styles.description}>
        Create a professional order summary for{' '}
        <Text style={styles.customerName}>{cart?.customer?.StoreName || 'your customer'}</Text>
        {'\n'}Total: ${cart?.totals?.totalValue?.toFixed(2) || '0.00'} ({cart?.totals?.totalPairs || 0} pairs)
      </Text>

      <TouchableOpacity
        style={[styles.button, isGenerating && styles.buttonDisabled]}
        onPress={generatePDF}
        disabled={isGenerating}
      >
        <Text style={styles.buttonText}>
          {isGenerating ? '📄 Generating PDF...' : '📄 Generate Order PDF'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📋 Order Summary Includes:</Text>
        <Text style={styles.infoText}>• Complete customer & sales rep details</Text>
        <Text style={styles.infoText}>• Product specifications and pricing</Text>
        <Text style={styles.infoText}>• Size breakdown and quantities</Text>
        <Text style={styles.infoText}>• Shipping address & payment terms</Text>
        <Text style={styles.infoText}>• Professional VENETTINI branding</Text>
        <Text style={styles.infoText}>• Order totals and line items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c5aa0',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  customerName: {
    fontWeight: 'bold',
    color: '#2c5aa0',
  },
  button: {
    backgroundColor: '#2c5aa0',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    elevation: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2c5aa0',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c5aa0',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    paddingLeft: 5,
  },
});