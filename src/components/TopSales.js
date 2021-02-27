import React, {useEffect} from 'react'
import {nanoid} from 'nanoid'
import {useSelector, useDispatch} from 'react-redux'
import { addHitSuccess, addHitRequest} from '../actions/actionCreators'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'



function TopSales(props) {
    const {itemsHit, loaddingHit} = useSelector(state => state.topSales);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addHitRequest())
        const fetchHadlerHit = async () => {
            const response = await fetch('http://localhost:7070/api/top-sales');
            const hit = await response.json();
            dispatch(addHitSuccess(hit))
        }
        fetchHadlerHit();
    }, [dispatch])

    return (
        <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <div className="row">
                {itemsHit.sort((a, b) => {return a.price - b.price}).map(el =>                         
                    <div key={nanoid()} className="col-4">
                        <div className="card">
                            <img src={el.images[0]}
                                onError={(e) => {e.target.src = 'https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg'; e.target.onError = null;}}
                                className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
                            <div className="card-body">
                                <p className="card-text">{el.title}</p>
                                <p className="card-text">{el.price} руб.</p>
                                <NavLink exact className="btn btn-outline-primary" to={`/catalog/${el.id}`}>Заказать</NavLink>
                            </div>
                        </div>
                    </div>    
                )}
                </div>
                {loaddingHit ?
                    <div className="preloader">
                       <span></span>
                       <span></span>
                       <span></span>
                       <span></span>
                    </div> : null
                }
            </section>
    )
}

TopSales.propTypes = {

}

export default TopSales

