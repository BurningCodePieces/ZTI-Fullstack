import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
import { StyledLink } from '../components/Links/Link';
import { createMessage } from '../actions/messages';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const Login = ({ login, isAuthenticated }) => {
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const location = useLocation();
    useEffect(() => {
        if(location.state){
            dispatch(createMessage({user_route:location.state.message}));
        }
      }, []);

    const {email, password} = formData;
    const dispatch = useDispatch();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        await login(email,password);
    };

    if( isAuthenticated ){
        return <Redirect to='/' />
    } 

    return(
        <div className='text-center'>
            <h1 className='pt-5'> Logowanie </h1>
            <p> Zaloguj się </p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group w-25 m-auto'>
                    <input className='form-control' type='email' placeholder='email' value ={email} name='email'  onChange={e => onChange(e)} required/>
                </div>
                <div className='form-group mt-3 w-25 m-auto'>
                    <input className='form-control' type='password' placeholder='hasło' value={password} name='password' onChange={e => onChange(e)} minLength='3' required/>
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Zaloguj</button>
            </form>
            <p className='mt-3'>Nie masz jeszcze konta? <StyledLink to='/signup'> Zarejestruj się</StyledLink></p>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login}) (Login);
