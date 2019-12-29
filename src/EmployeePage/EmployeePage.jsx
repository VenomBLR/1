import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { userActions } from '../_actions';

class EmployeePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
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
        const reqBody = {  
            reimbursementid: 0,
            description: '',
            statusid: 1,
            typeid: 4
        };
        this.setState({ submitted: true });
        let newAmount = parseFloat(this.state.amount);
        let newAuthor = parseInt(this.props.user.userid, 10);
        let newResolver = parseInt(this.state.resolver, 10);
        let newType = parseInt(this.state.typeid, 10);
        const newBody = {...reqBody, author: newAuthor, amount: newAmount, description: this.state.description, resolver: newResolver, typeid: newType };
        this.props.newReim( newBody );
    }    

    componentDidMount() {
        this.props.getById(this.props.user.userid);
        this.props.getReimById(this.props.user.userid);
    }

    render() {
        const { user, users, reims } = this.props;
        const { amount, description, submitted } = this.state;
        return (
            <div>
                <nav>
                      <h3 align = "right">Welcome, {user.username} ({user.role}) ! <Link to="/login">Logout</Link></h3>
                </nav>
                <div className = "container">  
                <div className = "row"> 
                {users.loading && <Loader />}
                {users.items &&
                    <table className="table table-bordered" border="2">
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
                <h3>Reimbursements:</h3>
                {reims.ids &&
                    <table className="table table-bordered">
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
                <h3>   New reimbursement:   </h3>
                <form className="form-inline l-sm-3" name="form" onSubmit = {this.handleSubmit}>  
                <div className={'form-group pl-sm-3' + (submitted && !amount ? ' has-error' : '')}>
                    <input type="number" min="0" className="form-control mb-2 " placeholder = "Amount" name="amount" value={this.state.amount} onChange = {this.handleChange} />
                </div>
                <div className={'form-group pl-sm-3' + (submitted && !description ? ' has-error' : '')}>
                    <input type="text" className="form-control mb-2" placeholder = "Description" name="description" value={this.state.description} onChange = {this.handleChange} />
                </div>
                <div className={'form-group pl-sm-3' + (submitted && !description ? ' has-error' : '')}>
                    <input type="number" className="form-control mb-2" placeholder = "Resolver" name="resolver" value={this.state.resolver} onChange = {this.handleChange} />
                </div>
                <div className='form-group pl-sm-3'>
                    <select type="number" className="form-control mb-2" placeholder = "Type" name="typeid" onChange = {this.handleChange}><option value = "1">Lodging</option><option value = "2">Travel</option><option value = "3">Food</option><option value = "4">Other</option></select>
                </div> 
                <div className='form-group pl-sm-3'>            
                    <button className = "btn btn-primary mb-2 pl-sm-3">Submit</button>  
                </div>         
              </form>
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
    getById: userActions.getById,
    getReimById: userActions.getReimById,
    newReim: userActions.newReim
}

const connectedEmployeePage = connect(mapState, actionCreators)(EmployeePage);
export { connectedEmployeePage as EmployeePage };