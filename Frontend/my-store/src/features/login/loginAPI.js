import axios from 'axios'

const URL_LOGIN = "http://127.0.0.1:8000/token/"
const URL_REGISTER = "http://127.0.0.1:8000/register/"
const URL_LOGOUT = "http://127.0.0.1:8000/logout/"

// async(2)
export function signIn(cred) {
    return new Promise((resolve) =>
        axios.post(URL_LOGIN, cred).then((res) => resolve({ data: res.data }))
    );
}

// async(2)
export function signUp(cred) {
    return new Promise((resolve) =>
        axios.post(URL_REGISTER, cred).then((res) => resolve({ data: res.data }))
    );
}

// async(2)
export function signOut(token) {
    console.log(token.token)
    return new Promise((resolve) =>
    axios(URL_LOGOUT, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    }).then((res) => resolve({ data: res.data }))
    );
}
