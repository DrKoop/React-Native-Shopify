import axios from "axios";

const API_KEY = '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';
const SHOP_NAME = 'themevue.myshopify.com';


export const getProducts = async () => {
  try {
    const endpoints = [
      `https://${SHOP_NAME}/admin/api/2023-07/products.json`,
      `https://${SHOP_NAME}/admin/api/2023-07/products.json?fields=images`,/* 
      `https://${SHOP_NAME}/admin/api/2023-07/orders.json` */
      // Agrega más endpoints aquí según tus necesidades
    ];

    const allData = [];

    for (const endpoint of endpoints) {
      const response = await axios.get(endpoint, {
        headers: {
          'X-Shopify-Access-Token': API_KEY,
        },
      });

      allData.push(response.data);
    }

    return allData;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
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