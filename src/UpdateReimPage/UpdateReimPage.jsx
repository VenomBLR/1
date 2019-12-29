import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { userActions } from '../_actions';

class UpdateReimPage extends React.Component {
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
            statusid: 1,
            typeid: 4
        };
        this.setState({ submitted: true });
        let newReimbursementid = parseInt(this.state.reimbursementid, 10);
        let newAmount = parseFloat(this.state.amount);
        let newAuthor = parseInt(this.state.author, 10);
        let newResolver = parseInt(this.props.user.userid, 10);
        let newType = parseInt(this.state.typeid, 10);
        let newStatus = parseInt(this.state.statusid, 10);
        const upReim = {...reqBody, reimbursementid: newReimbursementid, author: newAuthor, amount: newAmount, description: this.state.description, resolver: newResolver, typeid: newType , statusid: newStatus};
        this.props.updateReim( upReim );
    }   

    componentDidMount(){
       this.props.getReimById(this.props.location.state.users);  
    } 
    
    render() {
        const { user, reims } = this.props; 
        return (
            <div>
                <nav>
                      <h3 align = "right">Welcome, {user.username} ({user.role}) ! <Link to="/login">Logout</Link></h3>
                </nav>
                <div className = "container">  
                <div className = "row"> 
                {reims.loading && <Loader />}
                <h3>Reimbursements:</h3>
                {reims.ids && <table className="table table-hover" border="2">
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
            <form name="form" onSubmit={this.handleSubmit}>
                <div className = "form-row">
                <div className = "col-md-1">
                    <input type="number" min="1" className="form-control" placeholder = "ID" name="reimbursementid" value={this.state.reimbursementid} onChange={this.handleChange} />
                </div>
                <div className = "col-md-2">
                    <input type="number" min="1" className="form-control" placeholder = "Author" name="author" value={this.state.author} onChange={this.handleChange} />
                </div>
                <div className = "col-md-2">
                    <input type="number" min="0" className="form-control mb-2" placeholder = "Amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
                </div>  
                <div className = "col-md-2">
                    <input type="text" className="form-control mb-2" placeholder = "Description" name="description" value={this.state.description} onChange={this.handleChange} />
                </div>           
                <div className = "col-md-2">
                    <select class="form-control mb-2" placeholder = "Type" name="typeid" onChange={this.handleChange} ><option value="1">Lodging</option><option value="2">Travel</option><option value="3">Food</option><option value="4">Other</option></select>
                </div> 
                <div className = "col-md-2">
                    <select class="form-control mb-2" placeholder = "Status" name="statusid" onChange={this.handleChange} ><option value="1">Pending</option><option value="2">Approved</option><option value="3">Denied</option></select>
                </div> 
                <div className = "col-md-1 text-right">  
                    <button className = "btn btn-primary mb-2">Update</button>   
                </div> 
                </div>                 
            </form>
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
    getReimById: userActions.getReimById,
    updateReim: userActions.updateReim
}

const connectedUpdateReimPage = connect(mapState, actionCreators)(UpdateReimPage);
export { connectedUpdateReimPage as UpdateReimPage };