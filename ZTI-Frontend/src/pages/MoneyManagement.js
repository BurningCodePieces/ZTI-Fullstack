import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { chargeAccount } from '../actions/data';
import { useState } from 'react';

const MoneyManagement = ({user,chargeAccount}) => {

    const[formData, setFormData] = useState({
        money: 0.0,
    });

    let decimalChangePercents = e => {
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(00|\.)/, "0");
        const match = /(\d{0,3})[^.]*((?:\.\d{0,2})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e =>{
        e.preventDefault();
        await chargeAccount(user.username, money);
    };

    const {money} = formData;

    return (
        <div className='text-center'>
            <h1 className='pt-5'> Twoje konto </h1>
            <h5>Na koncie masz: {user.money} zł.</h5>
            <h1 className='pt-5'> Doładuj konto </h1>
            <p>Podaj kwotę, jaką chcesz doładować swoje konto</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group w-25 m-auto'>
                    <input className='form-control' type='number' min="0" max="1000" placeholder='10.25' step="0.01" value ={money} name='money'  onChange={e => { decimalChangePercents(e); onChange(e)}} required/>
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Doładuj</button>
            </form>
        </div>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {chargeAccount})(MoneyManagement)