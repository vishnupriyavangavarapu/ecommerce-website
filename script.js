const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 15999,
        category: "electronics",
        image: "https://image.made-in-china.com/2f0j00rOqoksSnpZcH/Brand-New-4G-Smart-Phone-Original-3GB-64GB-6-5inch-Smartphone-Mobile-Phone-Android-9-Fast-Charge-cellular-Mobile-Phone-Low-Price.webp"
    },
    {
        id: 2,
        name: "Laptop",
        price: 54999,
        category: "electronics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbRX4P5ykLNYSaM2Hmn2sno_f3jEUzEZq5LAbvMXR1kQ&s=10"
    },
    {
        id: 3,
        name: "Headphones",
        price: 1999,
        category: "electronics",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zc86eb8oIu4eOwyIRNcCoPuxNAWf-W1EHw9y5Ro0ew&s=10"
    },
    {
        id: 4,
        name: "T-Shirt",
        price: 799,
        category: "fashion",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZG4u7vQ9TfQt4iRjpl67DD70szOEiBldAkZ8njEds2g&s=10"
    },
    {
        id: 5,
        name: "Jeans",
        price: 1499,
        category: "fashion",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_y3sqO7EUKWiIJOd51fzBK-lInViLM7DC4CVLIXz8uA&s"
    },
    {
        id: 6,
        name: "Watch",
        price: 2499,
        category: "accessories",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbMYmVQMq-GPGca5FmlCK66VA5llZD4JIxAUK_UgYfsg&s=10"
    }
];

/* CART */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function addToCart(id) {
    let cart = getCart();

    const existingProduct = cart.find(function(item) {
        return item.id === id;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = products.find(function(item) {
            return item.id === id;
        });

        if (!product) {
            return;
        }

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert("Product added to cart!");
}

/* PRODUCTS */

function displayProducts(productList) {
    const container = document.getElementById("productContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    productList.forEach(function(product) {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button class="btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter(function(product) {
        return product.category === category;
    });

    displayProducts(filteredProducts);
}

/* CART PAGE */

function displayCart() {
    const container = document.getElementById("cartContainer");
    const totalElement = document.getElementById("cartTotal");

    if (!container) {
        return;
    }

    const cart = getCart();

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <p style="text-align: center;">
                Your cart is empty.
            </p>
        `;

        if (totalElement) {
            totalElement.textContent = "0";
        }

        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <strong>₹${itemTotal}</strong>
                <br><br>
                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;

        container.appendChild(div);
    });

    if (totalElement) {
        totalElement.textContent = total;
    }
}

function removeFromCart(id) {
    let cart = getCart();

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    saveCart(cart);

    updateCartCount();
    displayCart();
}

/* LOGIN */

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all the registration fields.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    document.getElementById("registerForm").reset();
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}

/* CHECKOUT */

function placeOrder(event) {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !email || !phone || !address || !payment) {
        alert("Please fill all the fields.");
        return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}

/* PAGE LOAD */

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();

    if (document.getElementById("productContainer")) {
        displayProducts(products);
    }

    if (document.getElementById("cartContainer")) {
        displayCart();
    }

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", placeOrder);
    }
});
