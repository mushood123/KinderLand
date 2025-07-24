export const transformProductData = (backendProduct) => {
  const materials = [
    backendProduct.Material1,
    backendProduct.Material2,
    backendProduct.Material3,
    backendProduct.Material4,
    backendProduct.Material5,
    backendProduct.Material6
  ].filter(material => material !== null);

  const locations = [
    backendProduct.Location1,
    backendProduct.Location2,
    backendProduct.Location3,
    backendProduct.Location4,
    backendProduct.Location5,
    backendProduct.Location6
  ].filter(location => location !== null);

  const pricing = {
    sizeRange1: backendProduct.Size1 || '',
    price1: backendProduct.Price1 ? `$${backendProduct.Price1}` : '',
    sizeRange2: backendProduct.Size2 || '',
    price2: backendProduct.Price2 ? `$${backendProduct.Price2}` : ''
  };

  return {
    id: backendProduct._id,
    productName: backendProduct.Stylename || '',
    productCode: backendProduct.sku || '',
    description: backendProduct.Description || '',
    imageUrl: backendProduct.Picture || 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&h=60&w=60',
    pricing,
    materials,
    locations,
    notes: backendProduct.Notes || '',
    brand: backendProduct.Brand,
    factory: backendProduct.Factory,
    season: backendProduct.Season,
    outsoleColor: backendProduct.Outsolecolor,
    outsoleType: backendProduct.Outsoletype,
    stitch: backendProduct.Stitch,
    styleFactory: backendProduct.StyleFactory,
    articleName: backendProduct.ArticleName
  };
};

export const filterProducts = (products, searchText, selectedFilter) => {
  let filtered = products;

  if (searchText.trim()) {
    const searchLower = searchText.toLowerCase().trim();

    filtered = filtered.filter(product => {
      if (product.productName.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (product.productCode.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (product.description.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (product.materials.some(material =>
        material.toLowerCase().includes(searchLower)
      )) {
        return true;
      }

      if (product.notes && product.notes.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (product.brand && product.brand.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (product.articleName && product.articleName.toLowerCase().includes(searchLower)) {
        return true;
      }

      return false;
    });
  }

  if (selectedFilter) {
    switch (selectedFilter) {
      case 'sku':
        filtered = filtered.filter(product =>
          product.productCode.includes('-') && product.productCode.length >= 6
        );
        break;

      case 'styleName':
        const styleKeywords = ['pro', 'elite', 'classic', 'vintage', 'retro', 'urban', 'street'];
        filtered = filtered.filter(product =>
          styleKeywords.some(keyword =>
            product.productName.toLowerCase().includes(keyword)
          )
        );
        break;

      case 'articleName':
        filtered = filtered.filter(product =>
          product.description.length > 50 &&
          (product.description.toLowerCase().includes('running') ||
            product.description.toLowerCase().includes('casual') ||
            product.description.toLowerCase().includes('performance'))
        );
        break;

      case 'color':
        const colorMaterials = ['leather', 'suede', 'canvas', 'mesh', 'knit'];
        filtered = filtered.filter(product =>
          product.materials.some(material =>
            colorMaterials.some(colorMaterial =>
              material.toLowerCase().includes(colorMaterial)
            )
          )
        );
        break;

      default:
        break;
    }
  }

  return filtered;
};

export const extractProductsData = (res) => {
  if (Array.isArray(res)) {
    return res;
  } else if (res && Array.isArray(res.data)) {
    return res.data;
  } else if (res && res.products && Array.isArray(res.products)) {
    return res.products;
  } else if (res && res.result && Array.isArray(res.result)) {
    return res.result;
  }
  return null;
};
