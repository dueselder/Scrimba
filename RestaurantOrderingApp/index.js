import { menuArray } from './data.js';

let cartItemHtml = '';
let cartArray = [];
let totalPriceValue = 0;
const cart = document.getElementById('cart');
const totalPrice = document.getElementById('total-price');
const modal = document.getElementById('modal');
const payButton = document.getElementById('pay-button');
const cardHolderName = document.getElementById('card-holder-name');

console.log(cardHolderName)

// Event listeners
document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        AddToCart(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        RemoveFromCart(e.target.dataset.remove)
    } else if(e.target.id === 'checkout-button') {
        modal.style.display = 'block';
    } else if(e.target.id === 'close-button') {
        modal.style.display = 'none';
    } 
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    paymentSuccessful();
});

function AddToCart(item) { 
    const itemObj = menuArray.find(menuItem =>menuItem.name === item)
    let itemInCart = cartArray.find(cartItem => cartItem.id === itemObj.id)

    if(itemInCart) {
        itemInCart.quantity += 1;
    } else {
        itemInCart = {...itemObj, quantity: 1, price: itemObj.price};
        cartArray.push(itemInCart);
    }

    renderCart();
}

function RemoveFromCart(itemId) {
    cartArray = cartArray.filter(item => item.id != itemId)
    renderCart();
}

function renderCart() {
    document.getElementById("cart-items").innerHTML = '';

    cartArray.map((item) => {

        console.log(item.quantity);
        const cartItemHtml = `
        <div class="cart-item" data-cart-item="${item.id}">
            <div class="cart-item-left">
                <h2>${item.name} ${item.quantity > 1 ? 'x' + item.quantity : ''}</h2>
                <p data-remove="${item.id}" class="remove-item-class">remove</p>
            </div>
            <div class="cart-item-right">
                <p class="price-tag">$${item.price*item.quantity}</p>
            </div>
        </div>
        `
        document.getElementById("cart-items").innerHTML += cartItemHtml;
        calculateTotal();
    })

    if(cartArray.length > 0) {
        cart.style.display = 'block';
    }
}

function calculateTotal() {
    totalPriceValue = 0;
    cartArray.map((item) => {        
        totalPriceValue += item.price * item.quantity;
    })
    totalPrice.innerHTML = `$${totalPriceValue}`;
}
 
function paymentSuccessful() {
    //alert('Payment Successful')
    modal.style.display = 'none';
    document.getElementById("cart").innerHTML = `
    <div class="success">
            <h2>Thanks ${cardHolderName.value}! Your order is on its way!!</h2>
    </div>`
}

// Building the menu list
let menuListHTML = ``

menuArray.map((item) => {
    menuListHTML += `
    <div class="menu-item">
        <div class="menu-container">
            <div class="menu-icon">
                ${item.emoji}
            </div>
            <div class="menu-item-inner">
                <div class="menu-item-left">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <p class="price-tag">$${item.price}</p>
                </div>
                <div class="menu-item-right">
                    <img data-add="${item.name}" class="add-item-class" src="./public/images/plus-sign-button.png" alt="Add Item Symbol" >
                </div>
            </div>
        </div>
    </div>
    `
})
document.getElementById("menu-list").innerHTML = menuListHTML

renderCart();