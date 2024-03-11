import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENCE_KEY } from './user.slice';
import { saveState, saveCart } from './storage';
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';

//Конфигурация store
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

//Подписка на изменение состояния store, сохранение состояния
store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENCE_KEY);
  saveCart({ items: store.getState().cart.items }, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
