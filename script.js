// ===============================
// PRODUCT DATA
// ===============================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 3999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Laptop Backpack",
        price: 1499,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Running Shoes",
        price: 2999,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Casual T-Shirt",
        price: 799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Denim Jacket",
        price: 1999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Classic Sunglasses",
        price: 999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Sports Sneakers",
        price: 3499,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 9,
        name: "Bluetooth Speaker",
        price: 1799,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 10,
        name: "Leather Wallet",
        price: 899,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 11,
        name: "Hoodie",
        price: 1299,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 12,
        name: "Gaming Mouse",
        price: 1199,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    }
];


// ===============================
// LOCAL STORAGE
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ===============================
// PRODUCT CARD
// ===============================

function createProductCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="product-card">

            <button
                class="wishlist"
                onclick="toggleWishlist(${product.id})">
                ${isWishlisted ? "❤️" : "🤍"}
            </button>

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString()}
                </p>

                <button
                    class="btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>
    `;
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(productList, elementId = "productGrid") {

    const container = document.getElementById(elementId);

    if (!container) return;

    if (productList.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                No products found.
            </p>
        `;

        return;
    }

    container.innerHTML = productList
        .map(product => createProductCard(product))
        .join("");
}


// ===============================
// FEATURED PRODUCTS
// ===============================

function displayFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) return;

    displayProducts(products.slice(0, 4), "featuredProducts");
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(`${product.name} added to cart!`);
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const container = document.getElementById("cartItems");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `
            <div style="text-align:center;padding:50px;">
                <h2>Your cart is empty 🛒</h2>
                <br>
                <a href="products.html" class="btn">
                    Start Shopping
                </a>
            </div>
        `;

        updateCartSummary();

        return;
    }

    container.innerHTML = cart.map(item => `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>${item.category}</p>

                <p class="price">
                    ₹${item.price.toLocaleString()}
                </p>

            </div>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>

        </div>

    `).join("");

    updateCartSummary();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(productId, amount) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }

    saveCart();

    displayCart();

    updateCartCount();
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    displayCart();

    updateCartCount();
}


// ===============================
// CART SUMMARY
// ===============================

function updateCartSummary() {

    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("delivery");

    const totalElement =
        document.getElementById("total");

    if (!subtotalElement) return;

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const delivery = subtotal === 0
        ? 0
        : subtotal >= 3000
            ? 0
            : 99;

    const total = subtotal + delivery;

    subtotalElement.textContent =
        subtotal.toLocaleString();

    deliveryElement.textContent =
        delivery.toLocaleString();

    totalElement.textContent =
        total.toLocaleString();
}


// ===============================
// CHECKOUT
// ===============================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}


// ===============================
// CHECKOUT SUMMARY
// ===============================

function displayCheckout() {

    const container =
        document.getElementById("checkoutItems");

    const totalElement =
        document.getElementById("checkoutTotal");

    if (!container || !totalElement) return;

    container.innerHTML = cart.map(item => `

        <div class="checkout-item">

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                ₹${(
                    item.price * item.quantity
                ).toLocaleString()}
            </strong>

        </div>

    `).join("");

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const delivery = subtotal >= 3000 ? 0 : 99;

    totalElement.textContent =
        (subtotal + delivery).toLocaleString();
}


// ===============================
// WISHLIST
// ===============================

function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(
            id => id !== productId
        );

    } else {

        wishlist.push(productId);

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayProducts(
        getFilteredProducts()
    );
}


// ===============================
// FILTER PRODUCTS
// ===============================

function getFilteredProducts() {

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    let result = [...products];

    if (searchInput) {

        const search =
            searchInput.value.toLowerCase();

        result = result.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );
    }

    if (categoryFilter) {

        const category =
            categoryFilter.value;

        if (category !== "All") {

            result = result.filter(
                product =>
                    product.category === category
            );
        }
    }

    if (sortFilter) {

        const sort = sortFilter.value;

        if (sort === "low") {

            result.sort(
                (a, b) => a.price - b.price
            );

        } else if (sort === "high") {

            result.sort(
                (a, b) => b.price - a.price
            );

        } else if (sort === "name") {

            result.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );
        }
    }

    return result;
}


// ===============================
// SEARCH & FILTER EVENTS
// ===============================

function setupFilters() {

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => displayProducts(
                getFilteredProducts()
            )
        );
    }

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            () => displayProducts(
                getFilteredProducts()
            )
        );
    }

    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            () => displayProducts(
                getFilteredProducts()
            )
        );
    }
}


// ===============================
// CATEGORY FROM URL
// ===============================

function loadCategoryFromURL() {

    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    const categoryFilter =
        document.getElementById("categoryFilter");

    if (category && categoryFilter) {

        categoryFilter.value = category;

        displayProducts(
            getFilteredProducts()
        );
    }
}


// ===============================
// LOGIN
// ===============================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            if (password.length < 6) {

                document.getElementById(
                    "loginMessage"
                ).textContent =
                    "Password must contain at least 6 characters.";

                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: email
                })
            );

            document.getElementById(
                "loginMessage"
            ).textContent =
                "Login successful!";

            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 1000);
        }
    );
}


// ===============================
// SIGNUP DEMO
// ===============================

function showSignup() {

    const name =
        prompt("Enter your name:");

    const email =
        prompt("Enter your email:");

    const password =
        prompt("Create a password:");

    if (!name || !email || !password) {

        alert("Please fill all details.");

        return;
    }

    localStorage.setItem(
        "user",
        JSON.stringify({
            name: name,
            email: email
        })
    );

    alert("Account created successfully!");

    window.location.href = "index.html";
}


// ===============================
// PLACE ORDER
// ===============================

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert("Your cart is empty!");

                return;
            }

            const orderId =
                "ORD" +
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );

            localStorage.setItem(
                "lastOrder",
                orderId
            );

            cart = [];

            saveCart();

            alert(
                `Order placed successfully!\n\nOrder ID: ${orderId}`
            );

            window.location.href =
                "index.html";
        }
    );
}


// ===============================
// INITIALIZE WEBSITE
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayFeaturedProducts();

        displayProducts(
            getFilteredProducts()
        );

        displayCart();

        displayCheckout();

        setupFilters();

        loadCategoryFromURL();

    }
);