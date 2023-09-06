import axios from "axios";

const API_KEY = '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';
const SHOP_NAME = 'themevue.myshopify.com';

export const getProducts = async () => {
  try {
    const endpoints = [
      `https://${SHOP_NAME}/admin/api/2023-07/products.json`,
      `https://${SHOP_NAME}/admin/api/2023-07/products.json?fields=images`,
      // Agrega más endpoints aquí según tus necesidades
    ];

    const allData = await Promise.all(endpoints.map(async (endpoint) => {
      const response = await axios.get(endpoint, {
        headers: {
          'X-Shopify-Access-Token': API_KEY,
        },
      });
      return response.data;
    }));

    return allData;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};

export const getProduct = async (productId) => {
  try {
    const allData = await getProducts();
    const filteredData = allData.flatMap((data) => data.products);
    const product = filteredData.find((product) => product.id === productId);



    return product;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
};

export const addToCart = async (productId) => {
  try {
    // Lógica para agregar un producto al carrito de compras
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
  }
};

// Otras funciones relacionadas con la API de Shopify