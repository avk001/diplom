import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router, NavLink, Redirect} from 'react-router-dom';
import logo from '../img/header-logo.png';
import PropTypes from 'prop-types'
import { redirectToCart, setCartQuantity, setRedirectSearch, setSearchText } from '../actions/actionCreators';

function Header(props) {
    const {textSearch} = useSelector(state => state.catalog);
    const {quantity, redirect} = useSelector(state => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        let cartAmount = 0;
        const keys = JSON.parse(localStorage.getItem('keys'));
        if(keys !== null) {
            const products = keys.map(el => JSON.parse(localStorage.getItem(el)));
            products.map(el => el.map(el => cartAmount = cartAmount + 1));
            dispatch(setCartQuantity(cartAmount))
        }
    }, [dispatch])

    const handlerSearchVisible = (event) => {
        event.preventDefault();
        const searchForm = document.querySelector('[data-id="search-form"]');
        const allClass = searchForm.getAttribute('class').split(' ');
        const invisible = allClass.filter(el => el === 'invisible');
        if(invisible.length > 0) { 
            searchForm.setAttribute('class', 'header-controls-search-form form-inline');
        } else {
            if(textSearch.text.length > 0) {
                dispatch(setRedirectSearch(true))
                searchForm.setAttribute('class', 'header-controls-search-form form-inline invisible');
                const input = document.querySelector('[placeholder="Поиск"]');
                input.value = '';
            } else {
                searchForm.setAttribute('class', 'header-controls-search-form form-inline invisible');
            }
        }

    }

    const handlerInputChange = (event) => {
        dispatch(setSearchText(event.target.value))
    }

    const handlerToCart = () => {
        dispatch(redirectToCart(true))
    }

    return (
        <header className="container">
            {textSearch.redirect ? <Redirect to='/catalog'/> : null}
            {redirect ? <Redirect to='/cart' /> : null}
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="Bosa Noga" />
                    </NavLink>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink exact className="nav-link" to="/">Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/catalog">Каталог</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/about">О магазине</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/contacts">Контакты</NavLink>
                            </li>
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handlerSearchVisible}></div>
                                {/* Do programmatic navigation on click to /cart.html */}
                                <div className="header-controls-pic header-controls-cart" onClick={handlerToCart}>
                                    {quantity > 0 ? <div className="header-controls-cart-full">{quantity}</div> : null}
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                            <form data-id="search-form" className='header-controls-search-form form-inline invisible' onSubmit={handlerSearchVisible}>
                                <input className="form-control" placeholder="Поиск" onChange={handlerInputChange}/>
                            </form>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
      </header>
    )
}

Header.propTypes = {

}

export default Header

