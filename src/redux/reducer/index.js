import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import department from './departmentReducer'
import product from './productReducer'
import variant from './variantsReducer'
import cart from './cartReducer'
import checkout from './checkoutReducer'
import filter from './filterReducer'
import CheckOutReducer from '../../pages/payment/reducer'
import TrackOrdersReducer from '../../pages/trackorders/reducer'
import OrderHistoryReducer from '../../pages/orderhistory/reducer'
import AdminReducer from '../../pages/admin/reducer'
import ResetReducer from './resetReducer'
import FAQReducer from '../../pages/faq/reducer'

export default combineReducers({
  token,
  signin,
  department,
  product,
  variant,
  cart,
  checkout,
  filter,
  CheckOutReducer: CheckOutReducer,
  TrackOrdersReducer: TrackOrdersReducer,
  OrderHistoryReducer: OrderHistoryReducer,
  AdminReducer: AdminReducer,
  ResetReducer: ResetReducer,
  FAQReducer:FAQReducer
})