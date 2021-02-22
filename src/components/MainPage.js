import React from 'react'
import PropTypes from 'prop-types'
import Catalog from './Catalog'
import TopSales from './TopSales'

function MainPage(props) {
    
    return (
        <React.Fragment>
            <TopSales />
            <Catalog toggle={true}/>
        </React.Fragment>
    )
}

MainPage.propTypes = {

}

export default MainPage

