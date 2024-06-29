class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItems) {
            this.cartItems = [];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let addMessage;
        
        if (matchingItem) {
            matchingItem.quantity += quantity;
            
        } else {
            this.cartItems.push(
                {
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                }
            );
        }
        
        addMessage = document.querySelector(`.js-added-to-cart${productId}`);
    
        this.saveToStorage();

        addMessage.classList.add('added-to-cart-visible');

        let addedMessageTimeoutId;

        if(addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        }

        addedMessageTimeoutId = setTimeout(() => {
            addMessage.classList.remove('added-to-cart-visible');
        }, 3000);
    }

    removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToStorage();
    }
}

export const cart = new Cart('cart');

export async function loadCart() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const responseText = await response.text();

    return responseText;
}

export function resetCart() {
    cart.cartItems = [];
    cart.saveToStorage();
}