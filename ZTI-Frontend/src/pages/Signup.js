import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
import { StyledLink } from '../components/Links/Link';


const Signup = ({ signup, isAuthenticated, wait, payload, error }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        await signup(email,password);
        setAccountCreated(true);
    };

    if( isAuthenticated ){
        return <Redirect to='/' />
    } 
    if( accountCreated ){ 
        if( !error ){
            return <Redirect to='/login'></Redirect>
        }
    }

    if( wait ){
        document.getElementById("signUpButton").innerHTML = "Czekaj...";
        document.getElementById("signUpButton").disabled = true;
    }
    else{
        if(document.getElementById("signUpButton")){
        document.getElementById("signUpButton").innerHTML = "Zarejestruj";
        document.getElementById("signUpButton").disabled = false;
        }
    }

    return(
        <div className='container mt-5 text-center'>
            <h1> Rejestracja </h1>
            <p> Stwórz konto </p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group w-25 mt-3 m-auto'>
                    <input className='form-control' type='email' placeholder='email' value ={email} name='email'  onChange={e => onChange(e)} required/>
                </div>
                <div className='form-group mt-3 w-25 m-auto'>
                    <input className='form-control' type='password' placeholder='hasło' value={password} name='password' onChange={e => onChange(e)} minLength='6' required/>
                </div>
                <button id="signUpButton" className='btn btn-primary mt-3' type='submit' >Zarejestruj</button>
            </form>
            <p className='mt-3'>Masz już konto?<StyledLink to='/login'> Zaloguj się</StyledLink></p>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    wait: state.auth.waitForSignUp,
    payload: state.auth.payload,
    error: state.auth.error
})

export default connect(mapStateToProps, {signup}) (Signup);
