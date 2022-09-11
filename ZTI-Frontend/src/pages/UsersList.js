import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get_all_users, update_users_list } from '../actions/auth';

const UsersList = ({user, users_list, get_all_users, update_users_list}) => {

    useEffect(() => get_all_users(), []);

    function updateUserRole(email){
        update_users_list(email);
        get_all_users();
    }
    


    return (
        <>
        <div className="container bg-secondary p-5 mt-5">
            <h2 className="text-center p-3"> ALL USERS LIST </h2>
            <table className="table table-striped text-dark">
                <thead>
                    <tr>
                        <th>EMAIL</th>
                        <th>CZY JEST ADMINEM</th>
                        <th>NADAJ UPRAWNIENIA ADMINA</th>
                    </tr>

                </thead>
                <tbody className="text-dark">
                    {console.log(users_list)}
                    {users_list ? users_list.map(current_user=>(
                        <tr  className="text-dark" key={current_user.id}> 
                            <td  className="text-dark">{current_user.username}</td>
                            {current_user.userRole == "ADMIN" ? <td  className="text-primary">{String(current_user.userRole == "ADMIN")}</td> : <td  className="text-dark">{String(current_user.userRole == "ADMIN")}</td>}
                            <td  className="text-light">{user.username === current_user.username ? <button className="btn btn-primary btn-disabled" disabled > Your account </button>: <button className={"btn " + (current_user.userRole == "ADMIN" ? "btn-danger" : "btn-success")} onClick={() => updateUserRole(current_user.username)}> {current_user.userRole == "ADMIN" ? "Take admin" : "Make admin"}</button> }</td>
                        </tr>

                    )) : <tr  className="text-dark"> 
                    <td  className="text-dark"> </td>
                    <td  className="text-dark"> </td>
                    <td  className="text-light"> </td>
                    <td  className="text-light"> </td>
                </tr>}
                    </tbody>
                    </table>
        </div>
        </>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    users_list: state.auth.users_list
});

export default connect(mapStateToProps, {get_all_users, update_users_list})(UsersList)