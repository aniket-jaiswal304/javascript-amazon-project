import { orders } from "../data/orders.js";
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProducts } from '../data/products.js';

async function loadPage() {

    await loadProducts();

    let ordersHTML = '';

    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
        
        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed&#58;</div>
                            <div>${orderTimeString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total&#58;</div>
                            <div>&#36;${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID&#58;</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${productListHTML(order)}
                </div>
            </div>
        `;
    });

    function productListHTML(order) {
        let productListHTML = '';
    
        order.products.forEach((productDetails) => {
            const product = getProduct(productDetails.productId);
            
            productListHTML += `
                <div class="product-image-container">
                    <img src=${product.image}>
                </div>
    
                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on&#58; ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
                    </div>
                    <div class="product-quantity">
                        Quantity&#58; ${productDetails.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>
    
                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `;
        });
    
        return productListHTML;
    }

    document.querySelector('.js-order-grid')
        .innerHTML = ordersHTML;
}

loadPage();