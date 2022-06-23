export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
})
.then((response) => response.json())
};

export const authorize = ({ email, password }) => {
    console.log(email);
    console.log(password);
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    });
};

export const checkToken = (token) => {
    console.log(token);
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
    .then(response => response.json())
  }