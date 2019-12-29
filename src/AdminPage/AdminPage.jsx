import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { userActions } from '../_actions';

class AdminPage extends React.Component {
    
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
            <nav>
                  <h3 align = "right">Welcome, {user.username} ({user.role}) ! <Link to="/login">Logout</Link></h3>
            </nav>
                <div className = "container">  
                <div className = "row"> 
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.loading && <Loader />}
                <h3>Users:</h3>
                {users.items &&
                    <table className="table table-hover" border="2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.items.map((users) =>
                                <tr key={users.userid}
                                    onClick = {() => {this.props.history.push({pathname: `/updateuser/${users.userid}`, state: { users: users.userid }})}}>
                                 <td>{users.userid}</td>
                                 <td>{users.username}</td>
                                 <td>{users.firstname}</td>
                                 <td>{users.lastname}</td>
                                 <td>{users.email}</td>
                                 <td>{users.role}</td>
                            </tr>)
                               }
                        </tbody>
                    </table>
                }
             </div>
            </div>
          </div>  
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedAdminPage = connect(mapState, actionCreators)(AdminPage);
export { connectedAdminPage as AdminPage };