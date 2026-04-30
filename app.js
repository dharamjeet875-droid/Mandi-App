// Supabase configuration using environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch products from Supabase
async function loadProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error loading products:', error.message);
      return;
    }

    displayProducts(data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Display products on the page
function displayProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <p>Description: ${product.description}</p>
      <input type="number" min="0" value="0" data-product-id="${product.id}" class="quantity-input">
    `;
    productsContainer.appendChild(productDiv);
  });
}

// Submit order to Supabase
async function submitOrder() {
  try {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const orderItems = [];

    quantityInputs.forEach(input => {
      const quantity = parseInt(input.value);
      if (quantity > 0) {
        orderItems.push({
          product_id: input.dataset.productId,
          quantity: quantity
        });
      }
    });

    if (orderItems.length === 0) {
      alert('Please select at least one product');
      return;
    }

    // Insert order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          items: orderItems,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error submitting order:', error.message);
      alert('Failed to submit order');
      return;
    }

    alert('Order submitted successfully!');
    loadProducts(); // Reload products
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An error occurred while submitting the order');
  }
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
