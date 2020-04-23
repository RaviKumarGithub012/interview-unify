import React, { useState, useEffect } from 'react';
import { Nav, Form, Navbar, FormControl, Container, Image, Button } from 'react-bootstrap';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../store/actions/searchAction';
import AddProduct from '../product-modal/add-product';


const Header = () => {

  // redux store
  const updateProduct = useDispatch();
  const { cart, cartItem } = useSelector(state => state.cart);

  // react hooks
  const routeHistory = useHistory();
  const [isProductRoute, setisProductRoute] = useState('/');
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);


  // action functions
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

  const handleShow = () => { setShow(true); }

  const handleClose = () => { setShow(false); }

  return (
    <header id="theme-header">
      <Container>
        <Navbar className='flex-wrap pl-0'>
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
          <Nav className={'align-items-center' + (isProductRoute === '/' ? null : 'ml-auto')}>
            <NavLink className='nav-link mr-1 mr-md-2' activeClassName='active-nav' exact to='/'>Home</NavLink>
            <NavLink className='nav-link mr-1 mr-md-2' activeClassName='active-nav' exact to='/todos'><span className='d-inline-block d-md-none'>+</span> <span className='d-none d-md-inline-block'>Add</span> Todos</NavLink>
            <Button className='theme-btn add_product mr-1 mr-md-2' title='Add your Product' onClick={handleShow}><span className='d-none d-md-inline-block'>Add Product</span> <span>+</span></Button>
            <span className='divider'>|</span>
            <NavLink className='nav-link' activeClassName='active-nav' exact to='/cart'><Image src='/images/cart.png' fluid className='cart-img' /> <span>({cart.length + cartItem})</span> </NavLink>
          </Nav>
        </Navbar>
      </Container>
      <AddProduct show={show} handleHide={handleClose} />
    </header>
  );
}
export default Header;