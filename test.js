const cart = [];
let cartTotal = 0;

function addToCart(name, price, quantity, size) {
  const item = {
    name,
    price,
    quantity,
    size
  };

  cart.push(item);
  cartTotal += item.price * item.quantity;

  const cartTotalElement = document.querySelector('#cart-total');
  cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;

  const itemElement = document.createElement('div');
  itemElement.classList.add('cart-item');
  itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} - Size: ${item.size}`;

  const cartItemsElement = document.querySelector('#cart-items');
  cartItemsElement.appendChild(itemElement);
}

const sizeInputs = document.querySelectorAll('input[name="size"]');
const addToCartButton = document.querySelector('#add-to-cart');

addToCartButton.addEventListener('click', () => {
  const name = 'Example Item';
  const price = 9.99;
  const quantity = 1;
  let size;

  sizeInputs.forEach(input => {
    if (input.checked) {
      size = input.value;
    }
  });

  addToCart(name, price, quantity, size);
});
