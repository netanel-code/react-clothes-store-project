import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import styled from 'styled-components';
import {ButtonContainer} from './button';

export default class Navbar extends Component {
    render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
              
                 <Link to='/'>
                 <img src={logo} alt="store" className="navbar-brand" width="40px"></img>
                 </Link>
                 <ul className="navbar-nav align-items-center">
                     <li className="nav-item ml-5">
                         <Link to="/" className="nav-link">
                             Products
                         </Link>
                     </li>
                 </ul>
                 <Link to="/cart" className="ml-auto">
                     <ButtonContainer>
                         <span className="mx-2">
                             <i className="fas fa-cart-plus"></i>
                         </span>
                             my-cart
                     </ButtonContainer>
                 </Link>
           </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
background:var(--mainBlue);
.nav-Link{
    color:var(--mainWhite)!important;
    font-size:1.3rem;
    text-tranform:capitalize;
}
`
;

