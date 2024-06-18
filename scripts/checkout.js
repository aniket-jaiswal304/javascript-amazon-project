import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container">
            <div class="delivery-date">
                Delivery date&#58; Tuesday&#44; June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" 
                    src="${matchingProduct.image}">
                
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        &#36;${matchingProduct.priceCents / 100}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity&#58; <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option&#58;
                    </div>

                    <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-1">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday&#44; June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                            name="delivery-option-1">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday&#44; June 15
                            </div>
                            <div class="delivery-option-price">
                                &#36;4&#46;99 &#8209; Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                            name="delivery-option-1">
                        <div>
                            <div class="delivery-option-date">
                                Monday&#44; June 13
                            </div>
                            <div class="delivery-option-price">
                                &#36;9&#46;99 &#8209; Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

});


document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;