import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMessage } from '../actions/messages';
import { addPet } from '../actions/data';
import { useDispatch } from 'react-redux';
import { getAllShelters } from '../actions/data'

const AddPet = ({ isAuthenticated, user, addPet, shelters, getAllShelters }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        race:"DOG",
        age:"",
        picture:"",
        shelter:"",
        name:"name"
    });

    useEffect(() => {
        getAllShelters();
      }, [])

      useEffect(() => {
        if(shelters.length!=0)
        setFormData({ ...formData, shelter: shelters[0].id })
      }, [shelters])


    useEffect(() => {

    }, [formData]);


    const { race, age, picture, shelter, name } = formData;

    if (!isAuthenticated) {
        return <Redirect to='/' />
    }


    const onSubmit = async e => {
        e.preventDefault();
        {

                let pet = {
                    "petType" : race,
                    "age": age,
                    "picture": picture,
                    "shelterId": shelter,
                    "name": name
                }
                console.log(pet);
                addPet(pet);
            }
        };


    return (
        <div className='container mt-5'>
            <h1 className="mb-3"> Nowy zwierzaczek </h1>
            <h4 className="mb-1"> Po dodaniu nowego zwierzaczka, użytkownicy będą mogli go zobaczyć na stronie.</h4>
            <form onSubmit={e => onSubmit(e)} className="w-100 mt-3">
            <div id="name">
                        <h4 className="mt-5 d-block">Imię zwierzaczka</h4>
                        <input type="text" name="name" value={name}  onChange={e => { setFormData({ ...formData, name: e.target.value }) }} /> 
                    </div>

                    <div id="race">
                        <h4 className="mt-5 d-block">Rodzaj zwierzaka</h4>
                        <select name="race" value={race}  onChange={e => { setFormData({ ...formData, race: e.target.value }) }}>
                            <option value="DOG">Piesek</option>
                            <option value="CAT">Kotek</option>
                        </select>

                    </div>
                    <div id="age">
                        <h4 className="mt-5 d-block">Wiek</h4>
                        <input type="number" name="age" min="0" max="30" value={age}  onChange={e => { setFormData({ ...formData, age: e.target.value }) }} /> 
                    </div>
                    <div id="shelter">
                        <h4 className="mt-5 d-block">Schronisko</h4>
                        <select name="shelter" value={shelter}  onChange={e => { setFormData({ ...formData, shelter: e.target.value }) }}>
                        {shelters.map(function (i) {
                            return <option value={i.id}> {i.name}</option>;
                        })}
                        </select>
                    </div>
                    <div id="pic">
                        <h4 className="mt-5 d-block">Obrazek (url do zdjęcia z sieci, max 255 znaków.)</h4>
                        <input type="text" name="pic" value={picture}  onChange={e => { setFormData({ ...formData, picture: e.target.value }) }} /> 
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
    shelters: state.data.shelters,
    user: state.auth.user
})

export default connect(mapStateToProps, { addPet, getAllShelters })(AddPet);
