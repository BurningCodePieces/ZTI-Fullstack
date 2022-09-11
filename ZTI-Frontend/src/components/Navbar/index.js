import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavMenuNonAuth} from './NavbarElements'
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import agh_ust_dark from '../../images/agh-ust.png';

const Navbar = ({logout, isAuthenticated, user}) => {
    const guestLinks = () =>(
            <NavMenuNonAuth>
                    <NavBtn>
                        <NavBtnLink to="/Login">Zaloguj</NavBtnLink>
                    </NavBtn>
            </NavMenuNonAuth>
    );

    const authLinks = () =>(
        <NavMenuNonAuth>
            <NavBtn>
                <NavBtnLink to='/' onClick={logout}>Wyloguj</NavBtnLink>
            </NavBtn>
        </NavMenuNonAuth>
    );

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img className="text-white py-3 px-5" src={agh_ust_dark} alt="agh logo" />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/list">Lista schronisk</NavLink>
                    <NavLink to="/pet_list">Lista Zwierzaków</NavLink>
                    <NavLink to="/contact">Kontakt</NavLink>
                    {!isAuthenticated ? <NavLink to="/signup">Rejestracja</NavLink> : <></>}
                    {isAuthenticated && user && user.userRole =="ADMIN" ? (<NavLink to="/add_shelter">Nowe schronisko</NavLink>) : <></>}
                    {isAuthenticated && user && user.userRole =="ADMIN" ? (<NavLink to="/add_pet">Nowy zwierzak</NavLink>) : <></>}
                    {isAuthenticated ? ( user && user.userRole =="ADMIN" ? <NavLink to="/my_account">Panel Admina</NavLink> : <NavLink to="/my_account">Moje konto</NavLink>): <span></span>}
                </NavMenu>
                {isAuthenticated ? authLinks() : guestLinks()}
            </Nav>
        </>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Navbar)
