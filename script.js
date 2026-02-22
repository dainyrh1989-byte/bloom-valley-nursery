/* =========================================================
   Touchstone 3.2 — Bloom Valley Nursery
   - sessionStorage: Shopping cart (Gallery page)
   - localStorage: Contact/custom order form (About page)
   ========================================================= */

/* ---------------------------
   Helpers
--------------------------- */
function safeParseJSON(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function getCartItems() {
  const raw = sessionStorage.getItem("cartItems");
  return raw ? safeParseJSON(raw, []) : [];
}

function setCartItems(items) {
  sessionStorage.setItem("cartItems", JSON.stringify(items));
}

function clearCart() {
  sessionStorage.removeItem("cartItems");
}

function formatCartForDisplay(items) {
  if (!items || items.length === 0) return "Your cart is empty.";

  // Simple readable list
  let lines = ["Items in your cart:"];
  items.forEach((item, i) => {
    const name = item.name || "Item";
    const qty = item.qty || 1;
    lines.push(`${i + 1}. ${name} (Qty: ${qty})`);
  });
  return lines.join("\n");
}

/* ---------------------------
   Subscribe (All Pages) — still works for 3.2
--------------------------- */
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    alert("Thank you for subscribing.");
  });
}

/* ---------------------------
   Gallery (Cart) — sessionStorage
   IDs expected (recommended):
   - addCartBtn
   - viewCartBtn
   - clearCartBtn
   - processOrderBtn
--------------------------- */
const addCartBtn = document.getElementById("addCartBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const processOrderBtn = document.getElementById("processOrderBtn");

// View Cart button might exist with id="viewCartBtn".
// If you don't have it, this code will also try to find a button with text "View Cart".
let viewCartBtn = document.getElementById("viewCartBtn");
if (!viewCartBtn) {
  const buttons = Array.from(document.querySelectorAll("button"));
  viewCartBtn = buttons.find((b) => (b.textContent || "").trim().toLowerCase() === "view cart") || null;
}

/* ---- Add to Cart ---- */
if (addCartBtn) {
  addCartBtn.addEventListener("click", function () {
    // Since your Gallery has placeholder items, we’ll store a simple item name.
    // If you later add real item names, you can replace this string.
    const itemName = "Plant Spotlight Item";

    const items = getCartItems();

    // If same item already exists, increase qty; otherwise add new
    const existing = items.find((it) => it.name === itemName);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      items.push({ name: itemName, qty: 1 });
    }

    setCartItems(items);
    alert("Item added to the cart.");
  });
}

/* ---------------------------
   View Cart Modal (created dynamically)
   Requirement: modal displays items read from sessionStorage
   Requirement: Clear Cart + Process Order IN the modal clear sessionStorage
--------------------------- */
function ensureCartModal() {
  let overlay = document.getElementById("cartModalOverlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "cartModalOverlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.5)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "16px";
  overlay.style.zIndex = "9999";

  const modal = document.createElement("div");
  modal.id = "cartModal";
  modal.style.background = "#fff";
  modal.style.maxWidth = "520px";
  modal.style.width = "100%";
  modal.style.borderRadius = "10px";
  modal.style.padding = "16px";
  modal.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";

  const title = document.createElement("h3");
  title.textContent = "Shopping Cart";

  const content = document.createElement("pre");
  content.id = "cartModalContent";
  content.style.whiteSpace = "pre-wrap";
  content.style.margin = "12px 0";
  content.style.fontFamily = "inherit";

  const btnRow = document.createElement("div");
  btnRow.style.display = "flex";
  btnRow.style.gap = "8px";
  btnRow.style.flexWrap = "wrap";

  const modalClearBtn = document.createElement("button");
  modalClearBtn.id = "modalClearCartBtn";
  modalClearBtn.type = "button";
  modalClearBtn.textContent = "Clear Cart";

  const modalProcessBtn = document.createElement("button");
  modalProcessBtn.id = "modalProcessOrderBtn";
  modalProcessBtn.type = "button";
  modalProcessBtn.textContent = "Process Order";

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.id = "modalCloseBtn";
  modalCloseBtn.type = "button";
  modalCloseBtn.textContent = "Close";

  btnRow.appendChild(modalClearBtn);
  btnRow.appendChild(modalProcessBtn);
  btnRow.appendChild(modalCloseBtn);

  modal.appendChild(title);
  modal.appendChild(content);
  modal.appendChild(btnRow);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on clicking overlay background
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) hideCartModal();
  });

  // Modal buttons: Clear/Process must clear sessionStorage
  modalClearBtn.addEventListener("click", function () {
    clearCart();
    updateCartModalContent();
    alert("Cart cleared.");
  });

  modalProcessBtn.addEventListener("click", function () {
    clearCart();
    updateCartModalContent();
    alert("Thank you for your order.");
  });

  modalCloseBtn.addEventListener("click", function () {
    hideCartModal();
  });

  return overlay;
}

function updateCartModalContent() {
  const items = getCartItems();
  const content = document.getElementById("cartModalContent");
  if (content) content.textContent = formatCartForDisplay(items);
}

function showCartModal() {
  const overlay = ensureCartModal();
  updateCartModalContent();
  overlay.style.display = "flex";
}

function hideCartModal() {
  const overlay = document.getElementById("cartModalOverlay");
  if (overlay) overlay.style.display = "none";
}

/* ---- View Cart ---- */
if (viewCartBtn) {
  viewCartBtn.addEventListener("click", function () {
    showCartModal();
  });
}

/* ---- Clear Cart (page button) ---- */
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    clearCart();
    alert("Cart cleared.");
  });
}

/* ---- Process Order (page button) ---- */
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function () {
    clearCart();
    alert("Thank you for your order.");
  });
}

/* ---------------------------
   About Us / Contact Form — localStorage
   Requirement: Save customer info + custom order info in localStorage
   Expected IDs from your page:
   - name (input, required)
   - email (input type=email, required)
   Optional (if you have one): message/order textarea with id:
   - orderDetails OR message OR customOrder
--------------------------- */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Find a reasonable "order/message" field if it exists
const orderField =
  document.getElementById("orderDetails") ||
  document.getElementById("message") ||
  document.getElementById("customOrder") ||
  null;

// Use the first form on the page (your About page uses a <form>)
const firstForm = document.querySelector("form");

if (firstForm && (nameInput || emailInput || orderField)) {
  firstForm.addEventListener("submit", function (event) {
    // Let browser show built-in validation messages
    if (!firstForm.checkValidity()) {
      event.preventDefault();
      firstForm.reportValidity();
      return;
    }

    // Valid → prevent page reload so storage stays visible for testing
    event.preventDefault();

    const customerName = nameInput ? nameInput.value.trim() : "";
    const customerEmail = emailInput ? emailInput.value.trim() : "";
    const customOrderInfo = orderField ? orderField.value.trim() : "";

    // Save in localStorage (persists)
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("customerEmail", customerEmail);
    localStorage.setItem("customOrderInfo", customOrderInfo);

    alert("Thank you for your message.");
  });
}
