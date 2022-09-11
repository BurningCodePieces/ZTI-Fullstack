import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => {
    if (auth.isLoading) {
      return <div className='d-flex align-items-center text-center min-vw-100 min-vh-100 pb-5'>
        <div className="container pb-5 mb-5">
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      </div>
    }
    else if (auth.isAuthenticated == null) {
      return <div className='d-flex align-items-center text-center min-vw-100 min-vh-100 pb-5'>
        <div className="container pb-5 mb-5">
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      </div>
    }
    else if (auth.isAuthenticated === false) {
      return <Redirect
        to={{
          pathname: "/login",
          state: { message: "Dostęp do tej strony wymaga zalogowania!" }
        }}
      />
    }
    else {
      if (auth.user) {
        if (auth.user.userRole == "ADMIN") {
          return <Component {...props} />
        }
        else {
          return <Redirect
            to={{
              pathname: "/",
              state: { message: "Dostęp tutaj ma tylko administrator!" }
            }}
          />
        }
      }
      else {
        return <Redirect
          to={{
            pathname: "/login",
            state: { message: "Dostęp do tej strony wymaga zalogowania!" }
          }}
        />
      }
    }

  }}></Route>
)



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AdminRoute);