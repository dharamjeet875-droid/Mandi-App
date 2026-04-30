hconst SUPABASE_URL = "https://jpaotjnlsetarbejlqry.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYW90am5sc2V0YXJiZWpscXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzQ5MzIsImV4cCI6MjA5MzExMDkzMn0.u3gKFA2Fy8W4eJIk0fu3zlkO2-Ujvhzi-8zxCeHnR3I";

// LOAD PRODUCTS
async function loadProducts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const data = await res.json();

    let grouped = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    let html = "";

    for (let cat in grouped) {
      html += `<h2>${cat}</h2>`;

      grouped[cat].forEach(item => {
        html += `
          <div style="margin-bottom:10px;">
            <span>${item.name}</span>
            <input type="number" id="${item.name}" placeholder="Qty" style="margin-left:10px;width:60px;">
          </div>
        `;
      });
    }

    document.getElementById("products").innerHTML = html;

  } catch (err) {
    alert("Error loading products: " + err.message);
  }
}

// SUBMIT ORDER
function submitOrder() {
  let order = [];

  document.querySelectorAll("input").forEach(input => {
    if (input.value && input.value > 0) {
      order.push({
        product: input.id,
        qty: input.value
      });
    }
  });

  if (order.length === 0) {
    alert("No items selected");
    return;
  }

  console.log("ORDER:", order);
  alert("Order captured (next step: save to database)");
}

// RUN ON PAGE LOAD
loadProducts();
fetch(SUPABASE_URL + "/rest/v1/products?select=*")
  .then(r => r.json())
  .then(d => alert(JSON.stringify(d)))
  .catch(e => alert(e.message));