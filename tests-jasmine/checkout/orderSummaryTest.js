import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import { loadFromCart } from '../../data/cart.js';
import { loadProducts} from '../../data/products.js'

beforeAll((done) => {
    loadProducts( () => {
        done();
    });
})
describe('test suite : renderOrderSummary', () => {
    afterEach(() => {document.querySelector('.js-test-container').innerHTML = ``;});
    
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary" ></div>`;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : productId1,
                quantity : 1 ,
                deliveryOptionId : '1' 
            }]);
        });
        loadFromCart();
        renderOrderSummary();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1')
    })

    it('removes a product' , () => {
        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary" ></div> <div class="js-payment-summary" > </div>`;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : productId1,
                quantity : 1 ,
                deliveryOptionId : '1' 
            }]);
        });
        loadFromCart();

        renderOrderSummary();

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0)
    })
}) 