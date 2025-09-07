document.addEventListener('DOMContentLoaded', () => {
    const iceCreamFlavorSelect = document.getElementById('ice-cream-flavor');
    const iceCreamQuantityInput = document.getElementById('ice-cream-quantity');
    const addToCartButton = document.getElementById('add-to-cart-btn');

    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const emptyCartMessage = document.querySelector('.cart-items .empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');

    const notificationContainer = document.getElementById('notification-container');
    let notificationTimeout;

    let cart = [];

    // ✅ Nieuwe prijzen
    const products = {
        'vanille': { name: 'Vanille-ijs', price: 6.71 },
        'framboos': { name: 'Frambozen-ijs', price: 5.08 }
    };

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                itemCount += item.quantity;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-details">${item.quantity}L x €${item.price.toFixed(2)} = €${itemTotal.toFixed(2)}</p>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">Verwijder</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        cartTotalSpan.textContent = `€${total.toFixed(2)}`;
        cartCountSpan.textContent = itemCount;
    }

    // Meldingen bovenaan het scherm (toast)
    function showNotification(message) {
        if (notificationContainer.firstChild) {
            notificationContainer.firstChild.remove();
            clearTimeout(notificationTimeout);
        }

        const notificationDiv = document.createElement('div');
        notificationDiv.classList.add('notification');
        notificationDiv.textContent = message;
        notificationContainer.appendChild(notificationDiv);

        setTimeout(() => {
            notificationDiv.classList.add('show');
        }, 10);

        notificationTimeout = setTimeout(() => {
            notificationDiv.classList.remove('show');
            notificationDiv.addEventListener('transitionend', () => {
                notificationDiv.remove();
            }, { once: true });
        }, 3000);
    }

    addToCartButton.addEventListener('click', () => {
        const selectedFlavor = iceCreamFlavorSelect.value;
        const quantity = parseInt(iceCreamQuantityInput.value);

        if (!selectedFlavor) {
            alert('Kies alstublieft een smaak.');
            return;
        }
        if (isNaN(quantity) || quantity <= 0) {
            alert('Voer alstublieft een geldig aantal liters in.');
            return;
        }

        const product = products[selectedFlavor];
        if (product) {
            const existingItemIndex = cart.findIndex(item => item.name === product.name);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
            updateCartUI();
            showNotification(`${product.name} (${quantity}L) is toegevoegd!`);
            iceCreamFlavorSelect.value = '';
            iceCreamQuantityInput.value = '1';
        } else {
            alert('Er is een probleem opgetreden. Selecteer een geldige smaak.');
        }
    });

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const indexToRemove = parseInt(event.target.dataset.index);
            const removedItemName = cart[indexToRemove].name;
            cart.splice(indexToRemove, 1);
            updateCartUI();
            showNotification(`${removedItemName} is verwijderd.`);
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Bedankt voor je bestelling! Je totaal is: ' + cartTotalSpan.textContent);
            cart = [];
            updateCartUI();
            closeCart();
        } else {
            alert('Je winkelmandje is leeg!');
        }
    });

    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    updateCartUI();
});
