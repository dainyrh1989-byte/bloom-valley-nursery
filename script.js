// ===============================
// Subscribe button (ALL pages)
// ===============================
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    alert("Thank you for subscribing.");
  });
}

// ===============================
// Gallery page buttons
// ===============================
const addCartBtn = document.getElementById("addCartBtn");
if (addCartBtn) {
  addCartBtn.addEventListener("click", function () {
    alert("Item added to the cart.");
  });
}

const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    alert("Cart cleared.");
  });
}

const processOrderBtn = document.getElementById("processOrderBtn");
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function () {
    alert("Thank you for your order.");
  });
}

// ===============================
// IMPORTANT NOTE (About Us page)
// ===============================
// NO JavaScript alert for the contact form.
// The form uses built-in HTML validation (required fields and email type).
// This allows the browser to display automatic validation messages,
// which is required for Touchstone Task 3.1.
