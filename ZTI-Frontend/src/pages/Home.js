import React, { Component } from 'react'
import agh_ust_dark from '../images/agh-ust.png';
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { createMessage } from '../actions/messages';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
}
  static propTypes = {
    isAuthenticated : PropTypes.bool,
}
  componentDidMount(){
    const {dispatch} = this.props;
    if(this.props.location.state)
    dispatch(createMessage({admin_route:this.props.location.state.message}))
  }


  render() {
    return (
      <div className="px-4 py-1 mb-5 text-center text-white bg-dark mt-3">
        <div style={{animation: "rotation 3s infinite ease"}}>
        <img className="d-block mx-auto my-5" src={agh_ust_dark} alt="" width="285" height="285" />
        </div>
        <h1 className="display-5 fw-bold mb-3">Dog-Carm Mnie</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Kotki pieski i takie tam.</p>
          {!this.props.isAuthenticated ? <div><div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link className="btn btn-primary btn-lg px-4 gap-3" type="button" to="/login">Logowanie</Link>
            <Link className="btn btn-light btn-lg px-4" type="button" to="/signup">Rejestracja</Link>
          </div>
          <p className="mt-3"> lub </p></div> : ""}
          <Link className="btn btn-secondary btn-lg px-4 mb-5" type="button" to="/pet_list">Zobacz zwierzaki!</Link>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Home)
