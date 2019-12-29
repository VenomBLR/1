import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { userActions } from '../_actions';

class UpdateUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: this.props.location.state.users,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getById(this.props.location.state.users);  
     } 

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.updateUser();
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
                <h3>User:</h3>
                {users.items && <table className="table table-hover" border="2">
                        <thead>
                            <tr>
                                <th scope = "col">ID</th>
                                <th scope = "col">Username</th>
                                <th scope = "col">First Name</th>
                                <th scope = "col">Last Name</th>
                                <th scope = "col">E-mail</th>
                                <th scope = "col">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.items.map((users) =>
                                 <tr key={users.userid}>
                                 <td>{users.userid}</td>
                                 <td>{users.username}</td>
                                 <td>{users.firstname}</td>
                                 <td>{users.lastname}</td>
                                 <td>{users.email}</td>
                                 <td>{users.role}</td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                }
            </div>    
            </div>
                <div className = "container">  
                <div className = "row"> 
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.loading && <Loader />}
                <form name="form" onSubmit={this.handleSubmit}>
                <div className = "form-row align-items-center">
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "Username" name="username" value={users.username} onChange={this.handleChange} />
                </div>
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "Password" name="password" value={users.password} onChange={this.handleChange} />
                </div>
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "First name" name="firstname" value={users.firstname} onChange={this.handleChange} />
                </div>  
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "Last Name" name="lastname" value={users.lastname} onChange={this.handleChange} />
                </div>    
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "E-mail" name="lastname" value={users.email} onChange={this.handleChange} />
                </div>            
                <div className = "col-md-2">
                    <select class="form-control mb-2" placeholder = "Role" name="role" onChange={this.handleChange} ><option value="Admin">Admin</option><option value="Manager">Manager</option><option value="Employee">Employee</option></select>
                </div> 
                <div className = "col-md-12 text-right">  
                    <button className = "btn btn-primary mb-2">Update</button>  
                </div> 
                </div>                 
            </form>
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
    getById: userActions.getById,
    updateUser: userActions.updateUser,
}

const connectedUpdateUserPage = connect(mapState, actionCreators)(UpdateUserPage);
export { connectedUpdateUserPage as UpdateUserPage };