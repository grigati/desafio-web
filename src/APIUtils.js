const API_BASE_URL = 'http://localhost:8080/api';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem('ACCESS_TOKEN')) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function getUsuarioAutenticado() {
    if(!localStorage.getItem('ACCESS_TOKEN')) {
        return Promise.reject("Token de acesso não encontrado.");
    }

    return request({
        url: API_BASE_URL + "/usuario",
        method: 'GET'
    });
}

export function solicitarLogin(dadosLogin) {
    return request({
        url: API_BASE_URL + "/auth/entrar",
        method: 'POST',
        body: JSON.stringify(dadosLogin)
    });
}

export function getUsuarios() {
    return request({
        url: API_BASE_URL + "/usuarios",
        method: 'GET'
    });
}