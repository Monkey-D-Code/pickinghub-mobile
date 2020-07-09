import React,{Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,

} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing selectors
import {
  selectBrandError,
  selectLoadingBrand,

} from './redux/website/Website.selectors';

import {
  selectIsAuth,
  selectActiveSeller,
  selectActiveUser,
} from './redux/user/User.selectors';

// importing actions
import {
  getBrand,

} from './redux/website/website.actions';

// importing pages
import Home from './components/generic/home';
import Contact from './components/generic/contact';

import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/auth/profile';
import Orders from './components/orders';

// seller page
import Seller from './components/Seller/Seller';
import Products from './components/Seller/products/Products';

import Terms from './components/generic/terms';
import Privacy from './components/generic/privacy';
import Return from './components/generic/return';

import Search from './components/generic/search';

import Department from './components/department';
import Category from './components/category';
import ProductDetails from './components/product_details';

// importing elements
import Navbar from './elements/navbar'
import Cart from './elements/cart';
import PickingHubLoader from './components/PickingHubLoader';

import './App.css';



class App extends Component{
  
  componentDidMount = () =>{
    this.props.getBrand();
  }
  
  render=()=>{
    const {
      brand_error,
      loading_brand,

      isAuth,
      user,
      seller,

    } = this.props;
    if(loading_brand){
      return(
        <PickingHubLoader
          text='Welcome To PickingHub'
        />
      )
    }
    return(
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
              {isAuth ?  <Redirect to='/profile' />: <Login />}
          </Route>
          <Route exact path='/register'>
              {isAuth ?  <Redirect to='/profile' />: <Register />}
          </Route>
          <Route path='/profile'>
              {isAuth ?  <Profile /> : <Redirect to='/login' />}
          </Route>
          <Route exact path='/cart'>
            {isAuth ? <Cart /> : <Redirect to='/login' />}
          </Route>
          <Route path='/orders'>
            {isAuth ? <Orders /> : <Redirect to='/login' />}
          </Route>
          <Route path='/seller'>
            {isAuth ?  <Redirect to='/profile' />: <Seller />}
          </Route>
          <Route exact path ='/terms'>
              <Terms />
          </Route>
          <Route exact path ='/contact'>
              <Contact />
          </Route>
          <Route exact path ='/privacy'>
              <Privacy />
          </Route>
          <Route exact path ='/return'>
              <Return />
          </Route>
          <Route exact path ='/search'>
              <Search />
          </Route>
          <Route path = '/department'>
            <Department />
          </Route>
          <Route path='/category/:id'>
            <Category />
          </Route>
          <Route path='/product/:id'>
              <ProductDetails />
          </Route>
          <Route path='/products'>
            <Products />
          </Route>
        </Switch>
        
      </Router>
    );
  }
}

const mapState = state =>({
  loading_brand : selectLoadingBrand(state),
  brand_error : selectBrandError(state),
  isAuth : selectIsAuth(state),
  seller : selectActiveSeller(state),
  user : selectActiveUser(state),
})

const mapDispatch = dispatch =>({
  getBrand : ()=>dispatch(getBrand()),
})

export default connect(
  mapState,
  mapDispatch,

)(App);
