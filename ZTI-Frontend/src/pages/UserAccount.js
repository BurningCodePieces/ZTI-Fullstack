import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

const UserAccount = ({user,logout}) => {
    let onlyVisibleToAdminOptions = (<div><h5 className="mt-5">Operacje przysługujące adminowi:</h5>
    <Link className="btn btn-dark mt-3" type="button" to="/users_list">Zobacz listę użytkowników</Link>
    <br/>
    <Link className="btn btn-dark mt-3" type="button" to='/add_structure'>Dodaj nowe schronisko</Link>
    <br/>
    <Link className="btn btn-success mt-3" type="button" to="/add_pet">Dodaj nowego zwierzaka</Link>
    <br/>
    <h5 className="mt-5">Operacje standardowego użytkownika:</h5></div>)
    return (
        <>
        <div className="container bg-secondary p-5 mt-5">
        <h3 className="mt-3">
            Zalogowany jako: {user.username}.<br/> <div className="mt-3 h6"> Masz następujący poziom dostępu: <strong className="text-dark">{user.userRole =="ADMIN" ? <span>ADMIN</span> : <span>USER</span>}</strong>.</div>
        </h3>
            {user.userRole != "ADMIN" ? (<div className="h6"> Jeśli uważasz, że powinieneś mieć wyższy poziom dostępu,  <Link className="text-decoration-none text-primary" to="/contact">skontaktuj się </Link>z naszą administracją. </div>) : ""}
            <br/>
        <h3>
            Dostępne operacje:
            <br/>
            {user.userRole == "ADMIN" ? onlyVisibleToAdminOptions : ""}
            <br/>
            <Link className="btn btn-success mt-3" type="button" to="/my_money">Zarządzaj stanem konta</Link>
            <br/>
            <Link className="btn btn-dark mt-3" type="button" to="/pet_list">Pokaż zwierzaki</Link>
            <br/>
            <Link className="btn btn-primary mt-3" type="button" to='/' onClick={logout}>Wyloguj</Link>
        </h3>

        </div>
        </>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(UserAccount)