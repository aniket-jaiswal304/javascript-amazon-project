import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import Cart from '../data/cart.js';

async function loadPage() {
    try {
        await loadProducts();
        await loadCart();

    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    updateCartQuantity();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

export function updateCartQuantity() {
    const cart = new Cart('cart');
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
}