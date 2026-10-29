const prices = {
  "Pancit Canton": 24.99,
  "Century Tuna": 44.99,
  "San Marino": 49.99,
  "555 Sardines": 34.99
};

const productSelect = document.getElementById("products");
const qtyInput = document.getElementById("productQuantity");
const itemsBox = document.getElementById("receiptItems");
const totalBox = document.getElementById("receiptTotal");
const discountSelect = document.getElementById("discount");
const subtotalBox = document.getElementById("receiptSubtotal");
const discountBox = document.getElementById("receiptDiscount");
const discountLabel = document.getElementById("discountLabel");

const order = {};

function peso(n) {
  return "₱ " + n.toFixed(2);
}

function renderReceipt() {
  itemsBox.innerHTML = "";
  let subtotal = 0;

  for (const name in order) {
    const lineTotal = prices[name] * order[name];
    subtotal += lineTotal;

    const row = document.createElement("div");
    row.className = "receipt-row";
    row.innerHTML =
      `<span>${name}<br><small>${order[name]} × ${peso(prices[name])}</small></span>` +
      `<span>${peso(lineTotal)}</span>`;
    itemsBox.appendChild(row);
  }

  const percent = Number(discountSelect.value);
  const discount = subtotal * (percent / 100);

  subtotalBox.textContent = peso(subtotal);
  discountLabel.textContent = percent ? `Discount (${percent}%)` : "Discount";
  discountBox.textContent = "- " + peso(discount);
  totalBox.textContent = peso(subtotal - discount);
}

// When a product is picked: add it (qty 1) or show its current qty
productSelect.addEventListener("change", () => {
  const name = productSelect.value;
  if (!name) return;
  if (!order[name]) order[name] = 1;
  qtyInput.value = order[name];
  renderReceipt();
});

// When the quantity changes: update that product's line
qtyInput.addEventListener("input", () => {
  const name = productSelect.value;
  if (!name) return;
  const qty = Math.max(0, Math.floor(Number(qtyInput.value) || 0));
  if (qty === 0) delete order[name];
  else order[name] = qty;
  renderReceipt();
});

// Automatic date
document.getElementById("receiptDate").textContent =
  new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });

// Update the receipt when the discount changes
discountSelect.addEventListener("change", renderReceipt);