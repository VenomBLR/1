import { authHeader } from '../_helpers';
import { alertActions } from '../_actions';

const api_url = 'http://ec2-184-73-148-10.compute-1.amazonaws.com:5050';

export const userService = {
    login,
    logout,
    getAll,
    getById,
    getReimById,
    getByStatus,
    newReim,
    newUser,
    updateUser,
    updateReim
};

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ username, password })
    };

    return await fetch(`${api_url}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            user.username = username;
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

async function newReim(newBody) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify( newBody ), credentials: 'include'
    };

    return await fetch(`${api_url}/reimbursements`, requestOptions).then(newhandleResponse)

}      

async function newUser(users) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ users }), credentials: 'include'
    };

    return await fetch(`${api_url}/users/newuser`, requestOptions).then(handleResponse)

} 

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return await fetch(`${api_url}/users`, requestOptions).then(handleResponseFetch);
}

async function getById(userid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(`${api_url}/users/${userid}`, requestOptions).then(handleResponseFetch);
}

async function getReimById(userid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(`${api_url}/reimbursements/author/${userid}`, requestOptions).then(handleResponseFetchReims);
}

async function updateUser(upUser) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(upUser), credentials: 'include'
    };

    return await fetch(`${api_url}/users`, requestOptions).then(handleResponse);;
}

async function updateReim(upReim) {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(upReim), credentials: 'include'
    };

    return await fetch(`${api_url}/reimbursements`, requestOptions).then(upReimhandleResponse);;
}

async function getByStatus(statusid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return await fetch(`${api_url}/reimbursements/status/${statusid}`, requestOptions).then(handleResponseFetchReims);
}

async function handleResponse(response) {
    return await response.text().then(text => {
        const data = text;
        let textArr = data.split(":"); 
        let user = {};
        user.userid = textArr[0]
        user.role = textArr[1];
        user.token = textArr[2];
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return user;
    });
}

async function handleResponseFetch(response) {
    const users = await response.json();
    if (!response.ok) {
        if (response.status === 404) {
           
        }

        const error = (response && response.message) || response.statusText;
        return Promise.reject(error);
    }
    return users;
}

async function handleResponseFetchReims(response) {
    const reims = await response.json();
        if (response.status === 201) {
          return  alertActions.success(reims);
        } else if (response.status === 200) { 
          return reims; 
        }
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}
   
async function newhandleResponse(response) {
    const newBody = await response.json();
        if (response.status === 201) {
          return  alertActions.success(newBody);
        } else if (response.status === 200) { 
          return newBody; 
        }
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}

async function upReimhandleResponse(response) {
    const upReim = await response.json();
        if (response.status === 200) {
          return  alertActions.success(upReim);
        } else if (response.status === 200) { 
          return upReim; 
        }
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}