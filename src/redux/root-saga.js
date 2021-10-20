import { call, all } from "@redux-saga/core/effects";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { shopSagas } from "./shop/shop.sagas";
export default function* rootSaga() {
  yield all([call(userSagas), call(cartSagas), call(shopSagas)]);
}
