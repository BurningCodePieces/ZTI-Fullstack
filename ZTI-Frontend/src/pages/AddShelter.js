import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMessage } from '../actions/messages';
import { addShelter } from '../actions/data';
import { useDispatch } from 'react-redux';

const AddShelter = ({ isAuthenticated, user, addShelter }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name:"",
        location:""
    });
    useEffect(() => {

    }, [formData]);


    const { name, location } = formData;

    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    const onSubmit = async e => {
        e.preventDefault();
        {

                let shelter = {
                    "name" : name,
                    "location": location
                }
                addShelter(shelter);
            }
        };


    return (
        <div className='container mt-5'>
            <h1 className="mb-3"> Nowe schronisko </h1>
            <h4 className="mb-1"> Po dodaniu nowego schroniska, możesz dodawać do niego zwierzęta.</h4>
            <form onSubmit={e => onSubmit(e)} className="w-100 mt-3">
            <div id="name">
                        <h4 className="mt-5 d-block">Nazwa schroniska</h4>
                        <input type="text" name="name" value={name}  onChange={e => { setFormData({ ...formData, name: e.target.value }) }} /> 
                    </div>

                    <div id="location">
                        <h4 className="mt-5 d-block">Lokalizacja</h4>
                        <input type="text" name="location" value={location}  onChange={e => { setFormData({ ...formData, location: e.target.value }) }} /> 
                    </div>
                <div className="w-100 text-center my-5">
                    <button className="btn btn-success p-3 px-5" type="submit">Dodaj</button>
                </div>

            </form>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { addShelter })(AddShelter);
