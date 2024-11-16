// script.js

document.addEventListener('DOMContentLoaded', () => {
    const claw = document.getElementById('claw');
    const startButton = document.getElementById('startButton');
    const result = document.getElementById('result');
    const prizes = document.querySelectorAll('.prize');
    let isGrabbing = false;
  
    // Function to move claw down and attempt to grab a prize
    function startClawMachine() {
      if (isGrabbing) return; // Prevent multiple grabs at once
      console.log("Start button clicked, claw moving...");
      
      result.textContent = "Claw is moving...";
      
      // Move the claw down
      claw.style.top = '150px';
  
      // Wait for the claw to reach the prize area
      setTimeout(() => {
        claw.style.top = '80px'; // Move claw back up
        checkCollision();
      }, 1000);
    }
  
    // Function to check if a prize is grabbed
    function checkCollision() {
      let grabbedPrize = null;
      const clawRect = claw.getBoundingClientRect();
  
      prizes.forEach(prize => {
        const prizeRect = prize.getBoundingClientRect();
        
        // Collision check
        if (
          clawRect.left < prizeRect.right &&
          clawRect.right > prizeRect.left &&
          clawRect.bottom > prizeRect.top &&
          clawRect.top < prizeRect.bottom
        ) {
          grabbedPrize = prize;
        }
      });
  
      if (grabbedPrize) {
        result.textContent = "You won a prize!";
        grabbedPrize.style.opacity = 0.5; // Visual cue for won prize
      } else {
        result.textContent = "Try again!";
      }
  
      isGrabbing = false;
    }
  
    // Event listener to start the claw machine
    startButton.addEventListener('click', startClawMachine);
  });

//SHOPPING CART//

if(document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i]
  button.addEventListener('click', removeCartItem)
    
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) { 
      var button = addToCartButtons[i]
      button.addEventListener('click' , addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

  }

  function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    
  }


function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
    }
    updateCartTotal()
 }

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()

}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++ ) {
      if (cartItemNames[i].innerText == title){
        alert('This item is already added to the cart')
        return
    }

  }
  var cartRowContents = `
      <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
           <input class="cart-quantity-input" type="number" value="1">
           <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
      cartRow.innerHTML = cartRowContents

  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged )



}




function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for(var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('€', ''))
    var quantity = quantityElement.value
    total = total+ (price * quantity)

  }
  total = Math.round(total * 100) /100
  document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total

}
 