import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {

    try {

        await Promise.all([
            loadProducts(), 
            loadCart()
        ]);

    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();