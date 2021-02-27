import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types'
import Search from './Search'
import { addCatalogRequst, addCatalogSuccess, addCategoriesRequest, addCategoriesSuccess, addNextItemsRequest, addNextItemsSuccess, fetchCategoryItemsRequest, fetchCategoryItemsSuccess, setRedirectSearch, setSearchText } from '../actions/actionCreators';
import { NavLink } from 'react-router-dom';


function Catalog(props) {

    const {categories, itemsAll, nextItemsLength, offset, currentCategory, loaddingCatalog, textSearch} = useSelector(state => state.catalog);
    const toggle = props.toggle;
    const dispatch = useDispatch();
    
    const fetchHadlerCatalogCategory = async (id, dispatch) => {
        dispatch(fetchCategoryItemsRequest(id));
        const response = textSearch.text.length > 0 ? await fetch(`http://localhost:7070/api/items?categoryId=${id}&q=${textSearch.text}`) : await fetch(`http://localhost:7070/api/items?categoryId=${id}`);
        const categoriesItems = await response.json();
        dispatch(fetchCategoryItemsSuccess(categoriesItems))

        const parent = document.querySelector('.catalog-categories');
        const activElement = parent.querySelector('.active');
        activElement.classList.remove('active');
        const category = document.getElementById(`${id}`)
        category.classList.add('active')
    }

    const fetchHadlerCatalogAll = async (dispatch) => {
        
        dispatch(addCatalogRequst());
        
        const parent = document.querySelector('.catalog-categories');
        if(parent !== null) {
            const activElement = parent.querySelector('.active');
            activElement.classList.remove('active');
            const category = document.getElementById('All')
            category.classList.add('active')
        }
        
        const response = textSearch.text.length > 0 ? await fetch(`http://localhost:7070/api/items?q=${textSearch.text}`) : await fetch('http://localhost:7070/api/items');
        const allItems = await response.json();
        dispatch(addCatalogSuccess(allItems))
    }

    useEffect(() => {
        dispatch(addCategoriesRequest())
        const fetchHadlerCategories = async () => {
            const response = await fetch('http://localhost:7070/api/categories');
            const categories = await response.json();
            dispatch(addCategoriesSuccess(categories))
        }
        fetchHadlerCategories();
    }, [dispatch])

    useEffect(() => {
        if(toggle) {
            dispatch(setSearchText());
        }
        if(textSearch.text.length > 0) {
            const fetchHeaderSearch = async () => {
                dispatch(addCategoriesRequest())
                const response = currentCategory !== null ? await fetch(`http://localhost:7070/api/items?categoryId=${currentCategory}&q=${textSearch.text}`) : await fetch(`http://localhost:7070/api/items?q=${textSearch.text}`)
                const itemsSearch = await response.json();
                dispatch(addCatalogSuccess(itemsSearch));
                dispatch(setRedirectSearch(false))
            }
            fetchHeaderSearch()            
        } else {
            fetchHadlerCatalogAll(dispatch);
        }
    }, [dispatch])

    const handleFetchNextItems = async () => {
        dispatch(addNextItemsRequest())
        const response = currentCategory === null ? await fetch(`http://localhost:7070/api/items?offset=${offset}`) : await fetch(`http://localhost:7070/api/items?categoryId=${currentCategory}&offset=${offset}`);
        const nextItems = await response.json();
        dispatch(addNextItemsSuccess(nextItems))
    }

    const handleCategorie = (event, id = null) => {
        event.preventDefault();
        if(id !== null) {
            fetchHadlerCatalogCategory(id, dispatch)
        } else {
            fetchHadlerCatalogAll(dispatch)
        }
    }
    
    return (
        <React.Fragment>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                {!toggle ? <Search /> : null}
                {categories.length > 0 ? 
                    <ul className="catalog-categories nav justify-content-center">
                        <li key={nanoid()} className="nav-item">
                            <a id='All' className='nav-link active' href='#' onClick={(event) => handleCategorie(event)}>Все</a>
                        </li>
                        {categories.map(el => 
                            <li key={nanoid()} className="nav-item">
                                <a id={el.id} className="nav-link" href='#' onClick={(event) => handleCategorie(event, el.id)}>{el.title}</a>
                            </li>
                        )}
                    </ul>      
                : null}
                
                {
                    <React.Fragment>
                        <div className="row">
                            {itemsAll.map(el => 
                                <div key={nanoid()} className="col-4">
                                    <div className="card catalog-item-card">
                                        <img src={el.images[0]}
                                             onError={(e) => {e.target.src = 'https://populus.ru/wp-content/uploads/2019/11/no-image-500x500.jpg'; e.target.onError = null;}}
                                             className="card-img-top img-fluid" alt={el.title}
                                        />
                                        <div className="card-body">
                                            <p className="card-text">{el.title}</p>
                                            <p className="card-text">{el.price}</p>
                                            <NavLink exact className="btn btn-outline-primary" to={`/catalog/${el.id}`}>Заказать</NavLink>
                                        </div>
                                    </div>
                                </div>    
                            )}
                        </div>
                        {
                            loaddingCatalog ?
                                <div className="preloader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                :
                                    <div className="text-center">
                                    {nextItemsLength < 6 ? null :
                                        <button className="btn btn-outline-primary" onClick={handleFetchNextItems}>Загрузить
                                            ещё</button>}
                                    </div>

                        }
                    </React.Fragment>

                }
            </section>
        </React.Fragment>
    )
}

Catalog.propTypes = {

}

export default Catalog

