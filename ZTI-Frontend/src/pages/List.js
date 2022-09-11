import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getAllShelters } from '../actions/data'

export class List extends Component {
    static propTypes = {
        shelters: PropTypes.array.isRequired,
        getAllShelters: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
    }

    componentDidMount() {
        if (this.props.showStructuresOfAllUsers == true)
            this.props.getAllShelters()
    }


    render() {
        if(!this.props.shelters) return null;
        return (
            <Fragment>
                <div className='container mb-5 pb-5'>
                    <h2 className='my-5'>Lista schronisk:</h2>
                    <table className="table table-striped text-light text-center border">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nazwa schroniska</th>
                                <th>Lokalizacja</th>
                                <th>Zobacz podopiecznych</th>
                            </tr>
                        </thead>
                        <tbody className="text-light text-center" style={{ lineHeight: 2.5 }}>
                            {this.props.shelters.map(shelter => (

                                    <tr className="text-light" key={shelter.id}>
                                        <td className="text-light">{shelter.id}</td>
                                        <td className="text-light">{shelter.name}</td>
                                        <td className="text-light">{shelter.location}</td>
                                        <td className="text-light"><Link to={`/pet_list/${shelter.id}`}><button className="btn btn-primary">Zobacz</button></Link> </td>
                                    </tr>
                                    )
                            )}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    shelters: state.data.shelters,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getAllShelters })(List)
