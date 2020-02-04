import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// importing reducers
import websiteReducer from './website/Website.reducer';
import departmentReducer from './department/Department.reducer';
import categoryReducer from './category/Category.reducer';
import productReducer from './product/Product.reducer';
import userReducer from './user/User.reducer';
import cartReducer from './cart/Cart.reducer';
import orderReducer from './order/Order.reducer';

const persistConfig = {
    key : 'pickinghub-mobile',
    storage,
    whitelist : [
        'user',
        'cart',
    ],
}

const rootReducer = combineReducers({
    website : websiteReducer,
    department : departmentReducer,
    category : categoryReducer,
    product : productReducer,
    user : userReducer,
    cart : cartReducer,
    order : orderReducer,

});

export default persistReducer(persistConfig , rootReducer);