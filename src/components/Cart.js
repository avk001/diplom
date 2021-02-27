import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { redirectToCart, removeFromCart, setCartQuantity } from '../actions/actionCreators';
import '../form.css'

function Cart(props) {

    const [state, setstate] = useState({
        products:[],
        totalAmount: 0,
        owner: {
            phone: '',
            address: ''
        },
        checked: false,
        ordered: false,
        fields:{
            phone: false,
            address: false,
        }
    })
    
    const dispatch = useDispatch();

    useEffect(() => {
        const keys = JSON.parse(localStorage.getItem('keys'));
        if(keys !== null) {
            const productsNew = keys.map(el => JSON.parse(localStorage.getItem(el)));
            productsNew.map(el => el.map(el => setstate(prevstate => ({...prevstate, totalAmount: prevstate.totalAmount + (el.productPrice * el.count)}))));
            setstate(prevstate => ({...prevstate, products: productsNew, ordered: false}))
        }
        dispatch(redirectToCart(false))
    }, [dispatch])

    const handlerDeletItem = (size, title, price, count) => {
        const item = JSON.parse(localStorage.getItem(title));
        const newItem = item.filter(el => el.productSize !== size);
        if(newItem.length > 0) {
            localStorage.removeItem(title);
            localStorage.setItem(title, JSON.stringify(newItem));
            const keys = JSON.parse(localStorage.getItem('keys'));
            const productsNew = keys.map(el => JSON.parse(localStorage.getItem(el)));
            setstate(prevstate => ({...prevstate, products: productsNew, totalAmount: prevstate.totalAmount - (price * count)}))
            dispatch(removeFromCart())

        } else {
            localStorage.removeItem(title);
            const keys = JSON.parse(localStorage.getItem('keys'))
            const newKeys = keys.filter(el => el !== title);
            localStorage.removeItem('keys');
            localStorage.setItem('keys', JSON.stringify(newKeys));
            const productsNew = newKeys.map(el => JSON.parse(localStorage.getItem(el)));
            setstate(prevstate => ({...prevstate, products: productsNew, totalAmount: prevstate.totalAmount - (price * count)}))
            dispatch(removeFromCart())
        }
    }

    const handlerChange = (event) => {
        if(event.target.id === 'address') {
            setstate(prevstate => ({...prevstate, owner: {...prevstate.owner, address: event.target.value}}));
            setstate(prevstate => ({...prevstate, fields: {...prevstate.owner, address: true}}));
        } else if(event.target.id === 'phone') {
            setstate(prevstate => ({...prevstate, owner: {...prevstate.owner, phone: event.target.value}}));
            setstate(prevstate => ({...prevstate, fields: {...prevstate.owner, phone: true}}));
        } else {
            setstate(prevstate => ({...prevstate, checked: event.target.checked}))
        }    
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();
        if(state.owner.phone !== '' && state.owner.address !== '' && state.checked === true) {
            const arrayProducts = [];
            state.products.map(el => el.map(el => arrayProducts.push({id: el.id, price: el.productPrice, count: el.count})));
            const order = JSON.stringify({owner: state.owner, items: arrayProducts});

            try {

                const response = await fetch('http://localhost:7070/api/order',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: order
                })

                console.log(response.status)

            } catch (error) {
                console.log(error)
            }

            const checked = document.querySelector('#agreement');
            checked.checked = false;
            setstate({products: [], totalAmount: 0, owner: {phone: '', address: ''}, checked: false, ordered: true})
            localStorage.clear();
            dispatch(setCartQuantity(0));
        } else {
            console.log('Заполните форму!')
        }
        
    }

    const errorClass = (error) => {
        return(!error ? '' : 'has-error');
    }
    
    return (
        <div>
            <section className="cart">
                    <h2 className="text-center">Корзина</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Стоимость</th>
                                <th scope="col">Итого</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                        {state.products ? state.products.map(el => el.map((el, index) => 
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td><a href="/products/1.html">{el.productName}</a></td>
                                <td>{el.productSize}</td>
                                <td>{el.count}</td>
                                <td>{el.productPrice}</td>
                                <td>{el.productPrice * el.count}</td>
                                <td><button className="btn btn-outline-danger btn-sm" onClick={() => handlerDeletItem(el.productSize, el.productName, el.productPrice, el.count)}>Удалить</button></td>
                            </tr>
                        )) 
                        : null}
                            <tr>
                                <td colSpan="5" className="text-right">Общая стоимость</td>
                                <td>{state.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                
                </section>
                
                <section className="order">
                    <h2 className="text-center">Оформить заказ</h2>
                    {state.ordered ? <p>Спасибо! Ваш заказ успешно оформлен.</p> : 
                        <div className="card" style={{maxWidth: 30 + 'rem', margin: 0 +'auto'}}>
                            <form className="card-body" onSubmit={handlerSubmit}>
                                <div className="form-group">
                                    <label htmlFor="phone">Телефон</label>
                                    <input className={`form-control ${errorClass(state.owner.phone.trim().length === 0 && state.fields.phone ?1:0)}`} id="phone" placeholder="Ваш телефон" onChange={handlerChange} value={state.owner.phone}/>
                                    {/*{*/}
                                    {/*    (state.owner.phone.trim() =='' && state.fields.phone)? <p>Заполните поле</p>: null*/}
                                    {/*}*/}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Адрес доставки</label>
                                    <input className={`form-control ${errorClass(state.owner.address.trim().length === 0 && state.fields.address?1:0)}`} id="address" placeholder="Адрес доставки" onChange={handlerChange} value={state.owner.address}/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="agreement" onChange={handlerChange}/>
                                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                                </div>
                                <button type="submit" className="btn btn-secondary " disabled={state.owner.phone !== '' && state.owner.address !== '' && state.checked === true?0:1}>Оформить</button>
                            </form>
                        </div>
                    }
                </section>
        </div>
    )
}

Cart.propTypes = {

}

export default Cart

