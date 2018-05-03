
import CryptoJS from 'crypto-js';
import 'whatwg-fetch'

export const login = (credentials) => {

    console.log(credentials);
    return (dispath) => {
        credentials.client_id = 'client_id';
        let payload = getJWT(credentials);
        console.log("JWT : "+payload);

        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: payload
        }).then(response => {
            if (response.ok) {
                    return response;
            } else {
                throw Error('invalid credentials');
            }
            })
            .then(function(response) {
            debugger;
            return response.text()
        }).then(function(text) {
            return dispath(loginSuccess(text));
        }).catch(function(ex) {
            debugger;
            console.log(ex);
            return dispath(loginError(ex.message));

        })

    }

}

export const loginSuccess = body => ({
    type: 'LOGIN_SUCCESS',
    body
})

export const loginError = body => ({
    type: 'LOGIN_ERROR',
    body
})


const getJWT = (data) => {
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = base64url(stringifiedHeader);

    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    let encodedData = base64url(stringifiedData);

    let token = encodedHeader + "." + encodedData;

    let secret = "client_secret";

    let signature = CryptoJS.HmacSHA256(token, secret);
    signature = base64url(signature);

    let signedToken = token + "." + signature;

    return signedToken;

}

const base64url = (source) => {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}