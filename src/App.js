import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/pages/home/home';
import SingleProducts from './components/pages/products/single-product';
import NoteFound from './components/pages/note-found';
import Cart from './components/pages/products/cart';

function App() {
  return (
    <main>
      <Router>
        <Header />
        <div className="change-route-section">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/product/:id' component={SingleProducts} />
            <Route exact path='/cart' component={Cart} />
            <Route component={NoteFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </main>
  );
}

export default App;