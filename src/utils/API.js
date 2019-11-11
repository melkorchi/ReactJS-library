import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const baseUrl = "http://localhost:8080";

export default {

    login2: function(email, password) {
        return axios.post(
            `${baseUrl}/users/login`, {
                email,
                password
            }, {
                headers: headers
            }
        );
    },
    login: function(email, password) {
        return new Promise((resolve, reject) => {
            return axios.post(
                    `${baseUrl}/users/login`, {
                        email,
                        password
                    }, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response.data);
                    resolve(err.response.data);
                });
        });
    },
    signup: function(send) {
        return axios.post(`${baseUrl}/users/create`, send, { headers: headers });
    },
    signup2: async function(send) {
        return new Promise((resolve, reject) => {
            return axios.post(`${baseUrl}/users/create`, send, { headers: headers })
                .then(data => {
                    console.log(data.data.user);
                    resolve(data.data.user);
                })
                .catch(err => {
                    console.log(err.response.data);
                    resolve(err.response.data);
                });
        });
    },
    isAuth: function() {
        return localStorage.getItem("token") !== null;
    },
    isAdmin: function() {
        return localStorage.getItem("role") === 'ROLE_ADMIN';
    },
    logout: function() {
        localStorage.clear();
    },
    getBooks: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/books`)
                .then(books => {
                    // console.log(users);
                    // const listuser: User = users.data;
                    // Pour sortir de la promesse
                    console.log(books.data.books);
                    resolve(books.data.books);
                    // resolve(books);
                })
                .catch(err => {
                    console.log(err.response);
                })
        })

    }
};