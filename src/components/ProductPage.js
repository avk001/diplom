import React, {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getItemLocalStorage } from '../actions/actionCreators';




function ProductPage({match}) {
    const {data} = useSelector(state => state.localStorage);
    const dispatch = useDispatch();
    
    const [state, setstate] = useState({
        product: {},
        choiseSize: null,
        amount: 1,
        toCart: false
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:7070/api/items/${match.params.id}`);
            const product = await response.json();
            setstate(prevstate => ({...prevstate, product: product, toCart: false}))
            dispatch(getItemLocalStorage(product.title))
        }
        fetchProduct();

        const tocartBtn = document.querySelector('.btn-danger');
        tocartBtn.setAttribute('disabled', 'disabled');
    }, [match])

    const handlerChoiceSize = (event, size) => {

        const parent = event.target.parentNode;
        const selected = parent.querySelector('.selected');
        if(selected !== null) {
            selected.classList.remove('selected');
        } 
        event.target.classList.add('selected')

        const tocartBtn = document.querySelector('.btn-danger');
        tocartBtn.removeAttribute('disabled');

        setstate((prevstate) => ({...prevstate, choiseSize: size}))
    }

    const handlerCount = (event) => {
        if(event.target.innerHTML === '+') {
            setstate(prevstate => ({...prevstate, amount: prevstate.amount ? prevstate.amount < 10 ? prevstate.amount + 1 : 10 : 1}))
        } else {
            setstate(prevstate => ({...prevstate, amount: prevstate.amount > 1 ? prevstate.amount - 1 : 1}))
        }
    }

    const handlerAddToCart = () => {
        const productNew = {
            id: state.product.id,
            productName: state.product.title,
            productPrice: state.product.price,
            productSize: state.choiseSize,
            count: state.amount
        }

        const titleInSorage = localStorage.getItem(state.product.title);
        console.log(titleInSorage, data)

        if(data) {
            const products =  data//JSON.parse(titleInSorage);
            const sizeInStorage = products.filter(el => el.productSize === state.choiseSize);
            const newProductArray = sizeInStorage.length > 0 ? products.map(function(el){ 
                    if(el.productSize === state.choiseSize) {
                        el.count = el.count + state.amount;
                        return el
                    } else {
                        return el
                    }
                }) 
            : [...products, productNew];
            if(sizeInStorage.length === 0) {
                dispatch(addToCart())
            }
            localStorage.removeItem(state.product.title);
            localStorage.setItem(state.product.title, JSON.stringify(newProductArray));
        } else {
            const newProductArray = [productNew]
            localStorage.setItem(state.product.title, JSON.stringify(newProductArray))
            dispatch(addToCart())
        }
        
        if(localStorage.getItem('keys') !== null) {
            const keys = JSON.parse(localStorage.getItem('keys'));
            
            const sameKey = keys.filter(el => el === productNew.productName);

            if(sameKey.length === 0) {
                keys.push(productNew.productName);
            }

            localStorage.setItem('keys', JSON.stringify(keys));

        } else {
            const keys = [productNew.productName];
            localStorage.setItem('keys', JSON.stringify(keys))
        }

        setstate(prevstate => ({...prevstate, toCart: true}))
    }

    return (
        <section className="catalog-item">
            {state.toCart ? <Redirect to='/cart'/> : null}
            <h2 className="text-center">{state.product.title ? state.product.title : null}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={state.product.images ? state.product.images[0] : ''}
                         onError={(e) => {e.target.src = 'https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg'; e.target.onError = null;}}
                         className="img-fluid" alt="" />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                            <td>{state.product.sku ? state.product.sku : ''}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>
                                    {state.product.manufacturer ? state.product.manufacturer : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>
                                    {state.product.color ? state.product.color : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>
                                    {state.product.material ? state.product.material : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>
                                    {state.product.season ? state.product.season : ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>
                                    {state.product.reason ? state.product.reason : ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии: 
                            {state.product.sizes ? state.product.sizes
                                .map(el => el.avalible ? <span className="catalog-item-size" onClick={(event) => handlerChoiceSize(event, el.size)}>{el.size}</span> : null) 
                            : null}
                        </p>
                        <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" onClick={handlerCount}>-</button>
                                <span className="btn btn-outline-primary">{state.amount ? state.amount : 1}</span>
                                <button className="btn btn-secondary" onClick={handlerCount}>+</button>
                            </span>
                        </p>
                    </div>
                    <button className="btn btn-danger btn-block btn-lg" onClick={handlerAddToCart}>В корзину</button>
                </div>
            </div>
        </section>
    )
}

ProductPage.propTypes = {

}

export default ProductPage

