import React from 'react'
import PropTypes from 'prop-types'
import Banner from './Banner'

function Error(props) {
    return (
        <main class="container">
        <div class="row">
            <div class="col">
                <Banner />
                <section class="top-sales">
                    <h2 class="text-center">Страница не найдена</h2>
                    <p>
                        Извините, такая страница не найдена!
                    </p>
                </section>
            </div>
        </div>
    </main>
    )
}

Error.propTypes = {

}

export default Error

