import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items &#40;${cart.calculateCartQuantity()}&#41;&#58;</div>
            <div class="payment-summary-money">
                &#36;${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling&#58;</div>
            <div class="payment-summary-money">
                &#36;${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax&#58;</div>
            <div class="payment-summary-money">
                &#36;${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax &#40;10&#37;&#41;&#58;</div>
            <div class="payment-summary-money">
                &#36;${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total&#58;</div>
            <div class="payment-summary-money">
                &#36;${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
            try {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart.cartItems
                    })
                });
    
                const order = await response.json();
    
                addOrder(order);
                cart.resetCart();

            } catch(error) {
                console.log('Unexpected error. Try again later.');
            }

            window.location.href = 'orders.html';
        });
}