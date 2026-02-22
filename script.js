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
  // Stored as JSON string: [{ name: "Plant Spotlight Item", qty: 1 }, ...]
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
// Expected IDs (based on your work):
// addCartBtn, viewCartBtn, clearCartBtn, processOrderBtn
// modal container: cartModal (or shoppingCartModal)
// modal close button: closeCartBtn (or closeModalBtn)
// modal item list container: cartItemsList (or cartList)
// ======================================================================

// Buttons on page
const addCartBtn = safeGetEl("addCartBtn");
const viewCartBtn = safeGetEl("viewCartBtn");
const clearCartBtn = safeGetEl("clearCartBtn");
const processOrderBtn = safeGetEl("processOrderBtn");

// Modal elements (supporting multiple possible IDs)
const cartModal =
  safeGetEl("cartModal") ||
  safeGetEl("shoppingCartModal") ||
  safeGetEl("modal");

const closeCartBtn =
  safeGetEl("closeCartBtn") ||
  safeGetEl("closeModalBtn") ||
  safeGetEl("closeBtn");

const cartItemsList =
  safeGetEl("cartItemsList") ||
  safeGetEl("cartList") ||
  safeGetEl("itemsList");

// Render cart contents into modal
function renderCartToModal() {
  if (!cartItemsList) return;

  const items = readCart();

  // Clear current display
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

  // Support <dialog> or regular div modal
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

    // Add a simple placeholder item required by assignment
    // If item exists, increase qty
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

// View Cart => reads sessionStorage and shows modal
if (viewCartBtn) {
  viewCartBtn.addEventListener("click", function () {
    openCartModal();
  });
}

// Clear Cart (page button) => clears sessionStorage
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    clearCart();
    alert("Cart cleared.");

    // If modal is open, refresh it
    if (cartModal) renderCartToModal();
  });
}

// Process Order (page button) => clears sessionStorage
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function () {
    clearCart();
    alert("Thank you for your order.");

    // If modal is open, refresh it
    if (cartModal) renderCartToModal();
  });
}

// Modal close
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", function () {
    closeCartModal();
  });
}

// If modal background click should close (optional, safe)
if (cartModal && typeof cartModal.addEventListener === "function") {
  cartModal.addEventListener("click", function (e) {
    // For <dialog>, clicking outside content sets target to dialog itself
    if (e.target === cartModal && typeof cartModal.close === "function") {
      cartModal.close();
    }
  });
}

// ======================================================================
// ABOUT/CONTACT PAGE (localStorage custom order info)
// Requirement: About Us form should save customer information + custom order
// This script supports common IDs; you can match them in about.html.
// ======================================================================

// If you have a form, give it id="contactForm" OR use submitBtn click
const contactForm = safeGetEl("contactForm");

// Common input IDs (edit these in about.html if needed)
const nameInput = safeGetEl("name");
const emailInput = safeGetEl("email");

// Optional custom order fields (if you add them)
const orderTypeInput = safeGetEl("orderType");     // e.g., dropdown
const orderNotesInput = safeGetEl("orderNotes");   // e.g., textarea
const submitBtn = safeGetEl("submitBtn");

// Save contact/order data to localStorage
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

// If you used a real <form> with required fields, browser validation will handle empty fields.
// We only save after successful submission.
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Let browser validate first; if invalid, submission is blocked automatically.
    // Prevent page reload so alert is visible and storage is saved without navigation.
    e.preventDefault();

    // If required fields exist and are empty, the browser will not reach here in most cases,
    // but for safety:
    if (nameInput && nameInput.hasAttribute("required") && !nameInput.value.trim()) return;
    if (emailInput && emailInput.hasAttribute("required") && !emailInput.value.trim()) return;

    saveCustomOrderToLocalStorage();
    alert("Thank you for your message.");
    contactForm.reset();
  });
} else if (submitBtn) {
  // If you are not using a real form submit event, still store on button click
  submitBtn.addEventListener("click", function () {
    saveCustomOrderToLocalStorage();
    alert("Thank you for your message.");
  });
}
