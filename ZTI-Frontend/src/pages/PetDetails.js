import { useParams } from "react-router";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getPet } from "../actions/data";
import { deletePet, getAllShelters, saveDonate, get_donates } from "../actions/data";
import { load_user } from "../actions/auth";
import { useDispatch } from "react-redux";
import { useState } from 'react';

const PetDetails = ({ isAuthenticated, loading, getAllShelters, donates, saveDonate, shelters, get_donates, getPet, pet, user, deletePet }) => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        money: 0.0,
    });

    const [donate, setDonate] = useState(0)

    let decimalChangePercents = e => {
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(00|\.)/, "0");
        const match = /(\d{0,3})[^.]*((?:\.\d{0,2})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await saveDonate(pet.id, user.id, money);
    };

    const { money } = formData;

    useEffect(() => {
        getAllShelters();
        get_donates();
    }, [])

    useEffect(() => {
    }, [donate])

    useEffect(() => {
        if (isAuthenticated) {
            let don = donates.find(x => x.userId === user.id && x.petId === pet.id)
            setDonate(don != null ? don.money : 0.0)
        }
    }, [donates])

    useEffect(() => {
        getPet(id);
    }, []);

    useEffect(() => {
    }, [pet]);

    const dispatch = useDispatch();

    if (loading || shelters == null || donates == null) return null;

    function renderSwitch(param) {
        switch (param) {
            case 'name':
                return 'Mam na imię';
            case 'age':
                return 'Mam lat';
            case 'petType':
                return 'Jestem';
            case 'shelterId':
                return 'Możesz mnie znaleźć w schronisku';
            default:
                return 'foo';
        }
    }

    if (pet && Object.keys(pet).length !== 0)

        return (
            <div className="mb-5"><h2 className="my-5 text-center">Szczegóły zwierzaka <i className="d-inline-block text-success"> </i></h2>
                <div className="container mb-5 text-center d-flex">
                    <img className="p-5" src={pet.picture} width="700px" alt="Zdjecie psa"></img>

                    <table className="table table-striped table-dark text-light text-center border">
                        <thead className="thead-light">
                            <tr>
                                <th>Parametr</th>
                                <th>Wartość</th>
                            </tr>

                        </thead>
                        <tbody className="text-light text-center" style={{ lineHeight: 2.5 }}>
                            {Object.keys(pet).map(function (keyName, keyIndex) {
                                if (keyName == "picture" || keyName == "id") return <></>
                                if (keyName == "petType")
                                    return (
                                        <tr className="text-light" key={keyName}>
                                            <td className="text-light">{renderSwitch(keyName)}</td>
                                            <td className="text-light">{(pet[keyName] ? pet[keyName] == "DOG" ? "Pieskiem" : "Kotkiem" : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                        </tr>)
                                if (keyName == "shelterId")
                                    return (
                                        <tr className="text-light" key={keyName}>
                                            <td className="text-light">{renderSwitch(keyName)}</td>
                                            <td className="text-light">{(pet[keyName] ? shelters.find(x => x.id === pet[keyName]) ? shelters.find(x => x.id === pet[keyName]).name : <></> : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                        </tr>)
                                return (
                                    <tr className="text-light" key={keyName}>
                                        <td className="text-light">{renderSwitch(keyName)}</td>
                                        <td className="text-light">{(pet[keyName] ? pet[keyName] : <div className="text-danger">NOT PROVIDED</div>)}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                {isAuthenticated ? <div>
                    <div className="text-center">
                        <h2>Przekazałeś mi {(donate != null && donate!=undefined )? donate : "0"}zł.</h2>
                        <br />
                        <h3>Chcesz dorzucić się na moją opiekę?</h3>
                        <br />
                        <h3>Wpisz kwotę:</h3>
                        <br />
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='form-group w-25 m-auto'>
                                <input className='form-control' type='number' min="0" max="1000" placeholder='10.25' step="0.01" value={money} name='money' onChange={e => { decimalChangePercents(e); onChange(e) }} required />
                            </div>
                            <br />
                            <button className='btn btn-primary mt-3 pb-1 pt-3 px-5' type='submit'><h4>Przekaż</h4></button>
                        </form>
                    </div>
                </div> : <></>}
                <div className="text-center mt-5">
                {(isAuthenticated && user) ? (user.userRole == "ADMIN" ? (<span><button className="m-3 btn btn-danger" onClick={() => { if (window.confirm('Czy jesteś pewny, że chcesz usunąć tego zwierzaka? Ta operacja jest nieodrwacalna!')) deletePet(pet.id) }}>USUŃ ZWIERZAKA</button></span>) : "") : ""}
                </div>
                <br />
                <br />
                <br />

            </div>
        );
    else
        return <div className="container text-center m-auto p-5">Zwierzaczek o danym ID nie istnieje :(</div>
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    pet: state.data.pet,
    user: state.auth.user,
    shelters: state.data.shelters,
    loading: state.loading.loading,
    donates: state.data.donates
});

export default connect(mapStateToProps, { getPet, getAllShelters, get_donates, load_user, saveDonate, deletePet })(PetDetails)