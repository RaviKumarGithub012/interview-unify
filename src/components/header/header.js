import React, { useState, useEffect } from 'react';
import { Nav, Form, Navbar, FormControl, Container, Image } from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../store/actions/searchAction';

const Header = () => {

  const updateProduct = useDispatch();
  const routeHistory = useHistory();

  const [isProductRoute, setisProductRoute] = useState('/');
  const [value, setValue] = useState('');
  const { cart, cartItem } = useSelector(state => state.products);

  const findProdcut = inValue => {
    setValue(inValue);
    updateProduct(searchAction(inValue));
  }

  useEffect(() => {
    setisProductRoute(routeHistory.location.pathname);
    if (isProductRoute === '/') {
      setValue('');
      updateProduct(searchAction(''));
    }
  }, [isProductRoute, routeHistory.location]);

  return (
    <header id="theme-header">
      <Container>
        <Navbar className='flex-wrap'>
          <Link className='navbar-brand' to="/">
            <img src='/images/logo.png' className='img-fluid h-100' alt='logo' />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              isProductRoute === '/' ? <Form inline className='mx-auto header_form position-relative' onSubmit={e => e.preventDefault()}>
                <FormControl value={value} onChange={e => findProdcut(e.target.value)} type="text" placeholder="Search your Product..." className="mr-sm-2" />
                <img src='/images/search.png' className='img-fluid' alt='search' />
              </Form>
                : null
            }
          </Navbar.Collapse>
            <Nav className={isProductRoute === '/' ? null : 'ml-auto'}>
              <NavLink className='nav-link mr-2' activeClassName='active-nav' exact to='/'>Products</NavLink>
              <NavLink className='nav-link' activeClassName='active-nav' exact to='/cart'><Image src='/images/cart.png' fluid className='cart-img' /> <span>({cart.length + cartItem})</span> </NavLink>
            </Nav>
        </Navbar>
      </Container>
    </header>
  );
}
export default Header;