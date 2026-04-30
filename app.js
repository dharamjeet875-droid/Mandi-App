const SUPABASE_URL = "https://jpaotjnlsetarbejlqry.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYW90am5sc2V0YXJiZWpscXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzQ5MzIsImV4cCI6MjA5MzExMDkzMn0.u3gKFA2Fy8W4eJIk0fu3zlkO2-Ujvhzi-8zxCeHnR3I";

// LOAD PRODUCTS
async function loadProducts() {
  try {
    alert("Fetching products...");

    let res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    alert("Response status: " + res.status);

    let data = await res.json();

    alert("Data length: " + data.length);

    console.log(data);

    let html = "";

    data.forEach(p => {
      html += `
        <div>
          ${p.name}
          <input type="number" placeholder="Qty">
        </div>
      `;
    });

    document.getElementById("products").innerHTML = html;

  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
}

  let data = await res.json();

  let categories = {};

  data.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  let html = "";

  for (let cat in categories) {
    html += `<h3>${cat}</h3>`;

    categories[cat].forEach(p => {
      html += `
        <div>
          ${p.name}
          <input type="number" id="${p.name}" placeholder="Qty">
        </div>
      `;
    });
  }

  document.getElementById("products").innerHTML = html;
}

// SUBMIT ORDER (basic for now)
function submitOrder() {
  alert("Order button working (next step we save it)");
}

// RUN
loadProducts();