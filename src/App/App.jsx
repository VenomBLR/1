import React from 'react';
import { Switch, Router, Route, BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import '../_include/bootstrap';
import '../_include/App.css';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { AdminPage } from '../AdminPage';
import { ManagerPage } from '../ManagerPage';
import { EmployeePage } from '../EmployeePage';
import { UpdateUserPage } from '../UpdateUserPage';
import { UpdateReimPage } from '../UpdateReimPage';
import { LoginPage } from '../LoginPage';
import { NotFoundPage } from '../404Page';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
                <BrowserRouter>
                {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                        <div>
                        <Router history={history}>
                              <Switch>
                              <PrivateRoute exact path="/" component={LoginPage} />
                              <PrivateRoute exact path="/admin" component={AdminPage} />
                              <PrivateRoute exact path="/updateuser" component={UpdateUserPage} />
                              <PrivateRoute exact path="/manager" component={ManagerPage} />
                              <PrivateRoute exact path="/updatereim" component={UpdateReimPage} />
                              <PrivateRoute exact path="/employee" component={EmployeePage} />
                              <PrivateRoute exact path="/updateuser/:userid" component={UpdateUserPage} />
                              <PrivateRoute exact path="/updatereim/:userid" component={UpdateReimPage} />
                              <Route path="/login" component={LoginPage} />
                              <Route component={NotFoundPage} />
                              </Switch>
                        </Router>
                        </div>
                </BrowserRouter>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };