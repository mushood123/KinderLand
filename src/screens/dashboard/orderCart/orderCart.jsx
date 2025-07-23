import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { styles } from "./styles"
import { ProductInventoryCard, CartSummaryCard } from "../../../components"
import { cartProducts } from "./data.js"

export const OrderCart = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { product, quantities, selectedSizes, selectedQuantity } = route.params || {}

  console.log("Product", product)
  console.log("Quantities", quantities)
  console.log("Selected Sizes", selectedSizes)
  console.log("Selected Quantity", selectedQuantity)

  // Sample cart data - in real app, this would come from state/context


  // Calculate totals from all products
  const calculateCartTotals = () => {
    let totalPairs = 0
    let totalValue = 0

    cartProducts.forEach((product) => {
      product.sizeQuantities.forEach((sizeQty) => {
        totalPairs += sizeQty.quantity

        // Find the appropriate price tier for this size
        const tier = product.priceTiers.find((tier) => {
          const [min, max] = tier.sizeRange.split("-").map((s) => Number.parseInt(s.trim()))
          return sizeQty.size >= min && sizeQty.size <= max
        })

        if (tier) {
          totalValue += sizeQty.quantity * tier.price
        }
      })
    })

    return { totalPairs, totalValue }
  }

  const { totalPairs, totalValue } = calculateCartTotals()

  const handleDeleteProduct = (productName) => {
    console.log("Delete product:", productName)
    Alert.alert("Delete Product", `Are you sure you want to remove ${productName} from the cart?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Product deleted") },
    ])
  }

  const handleQuantityChange = (productName, size, quantity) => {
    console.log(`Product: ${productName}, Size: ${size}, Quantity changed to:`, quantity)
    // In real app, update cart state here
  }

  const handleCardPress = (productName) => {
    console.log("Product inventory card pressed:", productName)
  }

  const handleNextPress = () => {
    console.log("Proceeding to next step with cart totals:", { totalPairs, totalValue })
    Alert.alert("Next Step", "Proceeding to checkout or next screen", [
      { text: "OK", onPress: () => { navigation.navigate("Shipping Info") } },
    ])
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Selected Items</Text>
          <Text style={styles.headerSubtitle}>These items are currently added into order.</Text>
        </View>

        {/* Items in Cart Section */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items in Cart</Text>

          {/* Product Cards */}
          {cartProducts.map((product, index) => (
            <ProductInventoryCard
              key={`${product.productCode}-${index}`}
              productName={product.productName}
              productCode={product.productCode}
              description={product.description}
              imageUrl={product.imageUrl}
              sizeQuantities={product.sizeQuantities}
              priceTiers={product.priceTiers}
              onDeletePress={() => handleDeleteProduct(product.productName)}
              onQuantityChange={(size, quantity) => handleQuantityChange(product.productName, size, quantity)}
              onCardPress={() => handleCardPress(product.productName)}
            />
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <CartSummaryCard unitTotal={totalPairs} unitLabel="pairs" grandTotal={totalValue} currency="$" />
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
