const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      updatedItems = [...state.items, { ...action.item, quantity: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    return { ...state, items: updatedItems };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }
  if (action.type === 'CLEAR_CART') {
    localStorage.removeItem('cart');
    return { ...state, items: [] };
  }
  return state;
};

export default cartReducer;
