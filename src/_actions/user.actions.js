import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    newUser,
    newReim,
    getAll,
    getById,
    getReimById,
    getByStatus,
    updateUser,
    updateReim
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    switch(user.role){
                        case 'Admin': return history.push('/admin');
                        case 'Manager': return history.push('/manager');
                        case 'Employee': return history.push('/employee');
                        default: history.push('/');
                    }           
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(userid) {
    return dispatch => {
        dispatch(request());

        userService.getById(userid)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(users) { return { type: userConstants.GETBYID_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function getReimById(userid) {
    return dispatch => {
        dispatch(request());

        userService.getReimById(userid)
            .then(
                reims => dispatch(success(reims)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETREIMBYID_REQUEST } }
    function success(reims) { return { type: userConstants.GETREIMBYID_SUCCESS, reims } }
    function failure(error) { return { type: userConstants.GETREIMBYID_FAILURE, error } }
}

function getByStatus(statusid) {
    return dispatch => {
        dispatch(request());

        userService.getByStatus(statusid)
            .then(
                reims => dispatch(success(reims)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYSTATUS_REQUEST } }
    function success(reims) { return { type: userConstants.GETBYSTATUS_SUCCESS, reims } }
    function failure(error) { return { type: userConstants.GETBYSTATUS_FAILURE, error } }
}

function updateUser(users) {
    return dispatch => {
        dispatch(request());

        userService.updateUser(users)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.UPDATEUSER_REQUEST } }
    function success(users) { return { type: userConstants.UPDATEUSER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.UPDATEUSER_FAILURE, error } }
}

function updateReim(upReim) {
    return dispatch => {
        dispatch(request());

        userService.updateReim(upReim)
            .then(
                upReim => dispatch(success(upReim)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.UPDATEREIM_REQUEST } }
    function success(upReim) { return { type: userConstants.UPDATEREIM_SUCCESS, upReim } }
    function failure(error) { return { type: userConstants.UPDATEREIM_FAILURE, error } }
}

function newReim(newBody) {
    return dispatch => {
        dispatch(request());

        userService.newReim(newBody)
            .then(
                newBody => dispatch(success(newBody)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.NEWREIM_REQUEST } }
    function success(reims) { return { type: userConstants.NEWREIM_SUCCESS, reims } }
    function failure(error) { return { type: userConstants.NEWREIM_FAILURE, error } }
}

function newUser(users) {
    return dispatch => {
        dispatch(request());

        userService.getById(users)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.NEWUSER_REQUEST } }
    function success(users) { return { type: userConstants.NEWUSER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.NEWUSER_FAILURE, error } }
}