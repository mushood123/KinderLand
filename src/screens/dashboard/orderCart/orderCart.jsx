import React, { useContext } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { styles } from "./styles"
import { ProductInventoryCard, CartSummaryCard } from "../../../components"
import { CartContext } from "../../../context"

export const OrderCart = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { cart, setCart } = useContext(CartContext)
  const { product, quantities, selectedSizes, selectedQuantity, customer } = route.params || {}
  console.log("Product", product)
  console.log("Quantities", quantities)
  console.log("Selected Sizes", selectedSizes)
  console.log("Selected Quantity", selectedQuantity)
  console.log("Customer", customer)

  const transformProductData = () => {
    if (!product || !quantities) return []

    const sizeQuantities = Object.entries(quantities).map(([size, quantity]) => ({
      size: parseInt(size),
      quantity: quantity
    })).filter(item => item.quantity > 0)

    const priceTiers = []
    if (product.pricing) {
      if (product.pricing.sizeRange1 && product.pricing.price1) {
        priceTiers.push({
          sizeRange: product.pricing.sizeRange1,
          price: parseFloat(product.pricing.price1.replace('$', ''))
        })
      }
      if (product.pricing.sizeRange2 && product.pricing.price2) {
        priceTiers.push({
          sizeRange: product.pricing.sizeRange2,
          price: parseFloat(product.pricing.price2.replace('$', ''))
        })
      }
    }

    return [{
      productName: product.productName,
      productCode: product.productCode,
      description: product.description,
      imageUrl: product.imageUrl,
      sizeQuantities: sizeQuantities,
      priceTiers: priceTiers
    }]
  }

  const cartProducts = transformProductData()

  const calculateCartTotals = () => {
    let totalPairs = 0
    let totalValue = 0

    cartProducts.forEach((product) => {
      product.sizeQuantities.forEach((sizeQty) => {
        totalPairs += sizeQty.quantity

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
  }

  const handleCardPress = (productName) => {
    console.log("Product inventory card pressed:", productName)
  }

  const handleNextPress = () => {
    console.log("Proceeding to next step with cart totals:", { totalPairs, totalValue })

    const productData = {}

    cartProducts.forEach((product, index) => {
      const productKey = `shoe${index + 1}`

      productData[productKey] = product.sizeQuantities.map((sizeQty) => {
        const tier = product.priceTiers.find((tier) => {
          const [min, max] = tier.sizeRange.split("-").map((s) => Number.parseInt(s.trim()))
          return sizeQty.size >= min && sizeQty.size <= max
        })

        return {
          size: sizeQty.size,
          quantity: sizeQty.quantity,
          price: tier ? tier.price : 0
        }
      })
    })

    const cartData = {
      products: cartProducts,
      totals: { totalPairs, totalValue },
      customer: customer,
      productData: productData,
      product: product,
    }
    setCart(cartData)

    Alert.alert("Next Step", "Proceeding to checkout or next screen", [
      { text: "OK", onPress: () => { navigation.navigate("Shipping Info", { cartData, product, quantities, selectedSizes, selectedQuantity, customer }) } },
    ])
  }

  if (cartProducts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Selected Items</Text>
          <Text style={styles.headerSubtitle}>No items in cart</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Selected Items</Text>
          <Text style={styles.headerSubtitle}>These items are currently added into order.</Text>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items in Cart</Text>

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

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <CartSummaryCard unitTotal={totalPairs} unitLabel="pairs" grandTotal={totalValue} currency="$" />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
