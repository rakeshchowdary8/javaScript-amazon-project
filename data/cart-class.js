class Cart {
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromCart();
    }

    loadFromCart(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))
    if(!this.cartItems) {
    this.cartItems = [];}}

    saveToStorage() {
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems))}
    
    addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach( cartItem => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    })
    if(matchingItem){
      matchingItem.quantity++;
    } else {
        this.cartItems.push({
        productId : productId,
        quantity : 1,
        deliveryOptionId: '1'
      })
    }
    this.saveToStorage();}

    removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach( cartItem => {
      if(productId !== cartItem.productId){
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveToStorage();}

    updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

      this.cartItems.forEach( cartItem => {
        if (productId === cartItem.productId)
          matchingItem = cartItem;
      })
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();}


}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
