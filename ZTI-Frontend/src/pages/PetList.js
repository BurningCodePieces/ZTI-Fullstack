import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import { getAllPets, getAllShelters } from '../actions/data'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import agh_ust_dark from '../images/agh-ust.png';


export class PetList extends Component {
    static propTypes = {
        pets: PropTypes.array.isRequired,
        shelters: PropTypes.array.isRequired,
        getAllPets: PropTypes.func.isRequired,
        getAllShelters: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,

    }
    constructor() {
        super();
        this.state = {
            p: "ALL",
        };
    }

    componentDidMount() {
        this.props.getAllPets()
        this.props.getAllShelters()
    }

    componentDidUpdate() {
        this.props.getAllPets()
    }


    render() {
        if (!this.props.pets) return null;
        return (
            <Fragment>
                <div className="center d-flex w-100 justify-content-center mt-5"><h1 style={{ fontSize: "300%" }}>Co chcesz zobaczyć?</h1></div>
                <div className="center d-flex w-100 justify-content-evenly mt-5 mb-5">

                    <Button variant="outline-light" className="mx-1 p-3 px-5" onClick={() => { this.state.p = "CAT" }}><h1>Tylko kotki</h1></Button>
                    <Button variant="outline-light" className="mx-1 p-3 px-3" onClick={() => { this.state.p = "ALL" }}><h1>Wszystko!</h1></Button>
                    <Button variant="outline-light" className="mx-1 p-3 px-5" onClick={() => { this.state.p = "DOG" }}><h1>Tylko pieski</h1></Button>
                </div>
                <div style={{ textAlign: "center", margin: "auto", marginTop: "60px", marginBottom: "50px" }}>
                    <Row xs={1} md={3} l={3} xxl={3} className="g-4">
                        {this.props.pets.map(pet => {
                            if ((this.state.p == "ALL" || this.state.p == "CAT" && pet.petType == "CAT" || this.state.p == "DOG" && pet.petType == "DOG") && (this.props.match.params.id == pet.shelterId || this.props.match.params.id == null)) return (
                                <Col>
                                    <Card style={{ width: '25vw', textAlign: "center", margin: "auto" }}>
                                        <Card.Img variant="top" src={pet.picture} />
                                        <Card.Body style={{ margin: "auto" }}>
                                            <Card.Title style={{ color: "black" }}><h2>{pet.name}</h2></Card.Title>
                                            <Card.Text style={{ color: "black", padding: "10px" }}>
                                                <h5>Cześć, jestem {pet.name}. Mój wiek to {pet.age}, a mama mówi, że cwany ze mnie {pet.petType == "CAT" ? "Kotek" : "Piesek"}.</h5>
                                            </Card.Text>
                                            <Link to={`/pet/${pet.id}`}><Button variant="primary">Zobacz więcej</Button></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                        )}
                    </Row>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    pets: state.data.pets,
    shelters: state.data.shelters,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getAllPets, getAllShelters })(PetList)
