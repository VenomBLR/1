import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { userActions } from '../_actions';

class ManagerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stutusid: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { statusid } = this.state;
        this.props.getByStatus(statusid);
    }
    
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { user, users, reims } = this.props;
        const { statusid, submitted } = this.state;

        return (
            <div>
                <nav>
                      <h3 align = "right">Welcome, {user.username} ({user.role}) ! <Link to="/login">Logout</Link></h3>
                </nav>
                <div className = "container">  
                <div className = "row"> 
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
                                    onClick = {() => {this.props.history.push({pathname: `/updatereim/${users.userid}`, state: { users: users.userid }})}}>
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
                <form name="form" className="form-inline" onSubmit={this.handleSubmit}>
                    <div className={'form-group mb-2' + (submitted && !statusid ? ' has-error' : '')}>
                        <select type = "number" className = "form-control" placeholder = "Status" name="statusid" onChange={this.handleChange}><option value="1">Pending</option><option value="2">Approved</option><option value="3">Denied</option></select>
                        {submitted && !statusid &&
                            <div className="help-block">Status is required</div>
                        }
                    </div>
                    <div className = "col-md-2 text-right">  
                          <button className = "btn btn-primary mb-2">Find</button>
                    </div>
                </form>    
                {reims.ids &&
                    <table className="table table-hover" border="2">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Author</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date submitted</th>
                                <th scope="col">Date resolved</th>
                                <th scope="col">Description</th>
                                <th scope="col">Resolver</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reims.ids.map((reims) =>
                                <tr key={reims.reimbursementid}>
                                 <td>{reims.reimbursementid}</td>  
                                 <td>{reims.author}</td>
                                 <td>{reims.amount}</td>
                                 <td>{reims.datesubmitted}</td>
                                 <td>{reims.dateresolved}</td>
                                 <td>{reims.description}</td>
                                 <td>{reims.resolver}</td>
                                 <td>{reims.type}</td>
                                 <td>{reims.status}</td>
                            </tr>
                            )
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
    const { users, reims, authentication } = state;
    const { user } = authentication;
    return { user, users, reims };
}

const actionCreators = {
    getUsers: userActions.getAll,
    getByStatus: userActions.getByStatus,
}

const connectedManagerPage = connect(mapState, actionCreators)(ManagerPage);
export { connectedManagerPage as ManagerPage };