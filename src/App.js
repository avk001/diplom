import './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import Catalog from './components/Catalog';
import InfoPage from './components/InfoPage';
import Contacts from './components/Contacts';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Route exact path='/' component={MainPage}/>
            <Route exact path='/catalog' component={Catalog} />
            <Route exact path='/catalog/:id' component={ProductPage} />
            <Route exact path='/about' component={InfoPage} />
            <Route exact path='/contacts' component={Contacts} />
            <Route exact path='/cart' component={Cart} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
