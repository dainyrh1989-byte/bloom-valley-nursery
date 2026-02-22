/*  Touchstone 3.2 - Web Storage (Option A)
    Bloom Valley Nursery
    - sessionStorage: Shopping Cart (Gallery page)
    - localStorage: Custom Order (About/Contact page)
*/

// ---------- Helpers ----------
function safeGetEl(id) {
  return document.getElementById(id);
}

function readCart() {
  const raw = sessionStorage.getItem("cartItems");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  sessionStorage.setItem("cartItems", JSON.stringify(items));
}

function clearCart() {
  sessionStorage.removeItem("cartItems");
}

// ---------- Subscribe (all pages) ----------
const subscribeBtn = safeGetEl("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    alert("Thank you for subscribing.");
  });
}

// ======================================================================
// GALLERY PAGE (sessionStorage cart + View Cart modal)
// Gallery page button IDs:
// addCartBtn, viewCartBtn, clearCartPageBtn, processOrderPageBtn
// Modal IDs:
// cartModal, cartItemsList, clearCartBtn, processOrderBtn, closeCartBtn
// ======================================================================

// Buttons on PAGE
const addCartBtn = safeGetEl("addCartBtn");
const viewCartBtn = safeGetEl("viewCartBtn");
const clearCartPageBtn = safeGetEl("clearCartPageBtn");
const processOrderPageBtn = safeGetEl("processOrderPageBtn");

// Buttons in MODAL
const clearCartBtn = safeGetEl("clearCartBtn");
const processOrderBtn = safeGetEl("processOrderBtn");
const closeCartBtn = safeGetEl("closeCartBtn");

// Modal elements
const cartModal = safeGetEl("cartModal");
const cartItemsList = safeGetEl("cartItemsList");

// Render cart contents into modal
function renderCartToModal() {
  if (!cartItemsList) return;

  const items = readCart();
  cartItemsList.innerHTML = "";

  if (items.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No items in cart.";
    cartItemsList.appendChild(p);
    return;
  }

  const ol = document.createElement("ol");
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Qty: ${item.qty})`;
    ol.appendChild(li);
  });

  cartItemsList.appendChild(ol);
}

function openCartModal() {
  if (!cartModal) return;
  renderCartToModal();

  if (typeof cartModal.showModal === "function") {
    cartModal.showModal();
  } else {
    cartModal.style.display = "block";
  }
}

function closeCartModal() {
  if (!cartModal) return;

  if (typeof cartModal.close === "function") {
    cartModal.close();
  } else {
    cartModal.style.display = "none";
  }
}

// Add to Cart => sessionStorage
if (addCartBtn) {
  addCartBtn.addEventListener("click", function () {
    const items = readCart();

    const itemName = "Plant Spotlight Item";
    const existing = items.find((i) => i.name === itemName);

    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ name: itemName, qty: 1 });
    }

    saveCart(items);
    alert("Item added to the cart.");
  });
}

// View Cart => modal reads sessionStorage
if (viewCartBtn) {
  viewCartBtn.addEventListener("click", function () {
    openCartModal();
  });
}

// CLEAR CART from PAGE button
if (clearCartPageBtn) {
  clearCartPageBtn.addEventListener("click", function () {
    clearCart();
    alert("Cart cleared.");
    renderCartToModal();
  });
}

// PROCESS ORDER from PAGE button
if (processOrderPageBtn) {
  processOrderPageBtn.addEventListener("click", function () {
    clearCart();
    alert("Thank you for your order.");
    renderCartToModal();
  });
}

// CLEAR CART from MODAL button
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    clearCart();
    alert("Cart cleared.");
    renderCartToModal();
  });
}

// PROCESS ORDER from MODAL button
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function () {
    clearCart();
    alert("Thank you for your order.");
    renderCartToModal();
  });
}

// Close modal
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", function () {
    closeCartModal();
  });
}

// Optional: click outside dialog to close (dialog only)
if (cartModal && typeof cartModal.addEventListener === "function") {
  cartModal.addEventListener("click", function (e) {
    if (e.target === cartModal && typeof cartModal.close === "function") {
      cartModal.close();
    }
  });
}

// ======================================================================
// ABOUT/CONTACT PAGE (localStorage custom order info)
// Supports ids: contactForm, name, email, orderType, orderNotes, submitBtn
// ======================================================================

const contactForm = safeGetEl("contactForm");
const nameInput = safeGetEl("name");
const emailInput = safeGetEl("email");

// Optional fields if you add them:
const orderTypeInput = safeGetEl("orderType");
const orderNotesInput = safeGetEl("orderNotes");

const submitBtn = safeGetEl("submitBtn");

function saveCustomOrderToLocalStorage() {
  const orderData = {
    name: nameInput ? nameInput.value.trim() : "",
    email: emailInput ? emailInput.value.trim() : "",
    orderType: orderTypeInput ? orderTypeInput.value.trim() : "",
    orderNotes: orderNotesInput ? orderNotesInput.value.trim() : "",
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem("customOrder", JSON.stringify(orderData));
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (nameInput && nameInput.hasAttribute("required") && !nameInput.value.trim()) return;
    if (emailInput && emailInput.hasAttribute("required") && !emailInput.value.trim()) return;

    saveCustomOrderToLocalStorage();
    alert("Thank you for your message.");
    contactForm.reset();
  });
} else if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    saveCustomOrderToLocalStorage();
    alert("Thank you for your message.");
  });
}
