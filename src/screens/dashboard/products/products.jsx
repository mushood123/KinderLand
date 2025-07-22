import { View, FlatList, Dimensions } from 'react-native';
import { styles } from './styles';
import { SearchBar } from '../../../components';
import { ProductDetailCard } from '../../../components'
import { products } from './data';
import { useState } from 'react';

export const Products = () => {
  const [layout, setLayout] = useState('list')
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;
  return (
    <View style={styles.container}>
      <SearchBar />
      {products.map((product) => (
        <ProductDetailCard
          productName={product.productName}
          productCode={product.productCode}
          description={product.description}
          imageUrl={product.imageUrl}
          pricing={product.pricing}
          materials={product.materials}
          Locations={product.locations}
          layout='list'
          onPress={() => { }}
          onEditPress={() => { }}
          notes={product.notes}
        />
      ))}
    </View>
  );
};
