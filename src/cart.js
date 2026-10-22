
function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть > 0');
  }

  let existingItem = null;

  for (const item of cart) {
    if (item.id === product.id) {
      existingItem = item;
      break;
    }
  }

  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const targetQuantity = currentQuantity + quantity;

  if (targetQuantity > product.stock) {
    throw new RangeError(
      'Больше количества на складе'
    );
  }

  const updatedCart = [];
  let found = false;

  for (const item of cart) {
    if (item.id === product.id) {
      updatedCart.push({
        ...item,
        quantity: targetQuantity
      });
      found = true;
    } else {
      updatedCart.push(item);
    }
  }

  if (!found) {
    updatedCart.push({
      ...product,
      quantity: quantity
    });
  }

  return updatedCart;
}

function changeQuantity(cart, productId, quantity) {
  let targetItem = null;

  for (const item of cart) {
    if (item.id === productId) {
      targetItem = item;
      break;
    }
  }

  if (targetItem === null) {
    return cart;
  }

  if (quantity <= 0) {
    throw new RangeError(
      'Количество товара должно быть > 0'
    );
  }

  if (quantity > targetItem.stock) {
    throw new RangeError(
      'Больше количества на складе'
    );
  }

  const updatedCart = [];

  for (const item of cart) {
    if (item.id === productId) {
      updatedCart.push({
        ...item,
        quantity: quantity
      });
    } else {
      updatedCart.push(item);
    }
  }

  return updatedCart;
}

function removeFromCart(cart, productId) {
  const updatedCart = [];

  for (const item of cart) {
    if (item.id !== productId) {
      updatedCart.push(item);
    }
  }

  return updatedCart;
}

function calculateCartSubtotal(cart) {
  let total = 0;

  for (const item of cart) {
    total += item.price * item.quantity;
  }

  return total;
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  let delivery = 0;

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: total
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal
};

if (typeof module !== 'undefined') {
  module.exports = cartApi;
}

if (typeof window !== 'undefined') {
  window.cartApi = cartApi;
}