const baseUrl = 'http://localhost:3001'

export const authenticate = ({ email, password }) => {
    const auth = window.btoa(`${email}:${password}`)
    return fetch(`${baseUrl}/authenticate`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ auth }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
}

export const signup = ({ email, password }) => (
    fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ email, password: window.btoa(password) }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const activateUser = (hash) => (
    fetch(`${baseUrl}/activateUser/${hash}`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const recovery = ({ email }) => (
    fetch(`${baseUrl}/recovery`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ email }),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)

export const getUserInfo = async () => (
    fetch(`${baseUrl}/api/userInfo`, {
        method: 'GET',
        headers: new Headers({'content-type': 'application/json'}),
        credentials: 'include',
        mode: 'cors'
    }).then(res => res.json())
)