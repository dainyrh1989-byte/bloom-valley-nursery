// Subscribe button (all pages)
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    alert("Thank you for subscribing.");
  });
}

// Gallery buttons
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

// Contact form submit (About page)
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    alert("Thank you for your message.");
  });
}
