document.addEventListener("DOMContentLoaded", function() {
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      const productsContainer = document.getElementById("products");
      const cartSection = document.getElementById("cart");
      const cartItems = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      const shopNowButton = document.getElementById("shopNow");
      let cart = [];

      data.forEach(product => {
        const productDiv = createProductElement(product);
        productsContainer.appendChild(productDiv);
      });

      function createProductElement(product) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <p class="hover-text">${product.hoverText}</p>
      </div>
          <h2>${product.name}</h2>
          <p>Price: $${product.price.toFixed(2)}</p>
          <button class="buy-now">Buy Now</button>
        `;
        const buyNowButton = productDiv.querySelector(".buy-now");
        buyNowButton.addEventListener("click", () => {
          addToCart(product);
        });
        
        const productImage = productDiv.querySelector(".product-image");
        const hoverText = productImage.querySelector(".hover-text");

        return productDiv;
      }

      function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        cartSection.style.display = "block";
        renderCart();
      }

      function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
      }

      function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
          const cartItem = document.createElement("li");
          const cartItemImage = document.createElement("img");
          cartItemImage.src = item.image;
          cartItemImage.alt = item.name;
          cartItem.appendChild(cartItemImage);
          cartItem.innerHTML += `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <br>
            <span>Quantity: ${item.quantity}</span>
            <button class="remove-item">x</button>
          `;
          const removeButton = cartItem.querySelector(".remove-item");
          removeButton.addEventListener("click", () => {
            removeFromCart(index);
          });
          cartItems.appendChild(cartItem);
          total += item.price * item.quantity;
        });
        cartTotal.innerText = total.toFixed(2);
      
        // Add Shop Now button
        if (cart.length > 0) {
          shopNowButton.style.display = "block";
          shopNowButton.addEventListener("click", handleShopNowClick);
          cartSection.style.display = "block"; // Show the cart section
        } else {
          shopNowButton.style.display = "none";
          cartSection.style.display = "none"; // Hide the cart section
          shopNowButton.removeEventListener("click", handleShopNowClick);
        }
      }

      function handleShopNowClick() {
        alert("Thank you for shopping with us!");
        cart = [];
        renderCart();
      }
    })
    .catch(error => console.error("Error fetching products:", error));

  let prevScrollpos = window.pageYOffset;
  const navbar = document.querySelector(".navbar");

  window.onscroll = function() {
    var currentScrollpos = window.pageYOffset;
    if (prevScrollpos > currentScrollpos) {
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
    prevScrollpos = currentScrollpos;
  };

  const toggleButton = document.getElementsByClassName('toggle-button')[0];
  const navbarLinks = document.getElementById('nav-list');

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });
});