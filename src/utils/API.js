import axios from "axios";
import qs from 'qs'

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};
// const baseUrl = "http://localhost:8080";
const baseUrl = "https://app-node-library.herokuapp.com";

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
    addBook: function(title, author, publishedDate, description, rate, comment, userId, links) {
        return new Promise((resolve, reject) => {
            return axios.post(
                    `${baseUrl}/books/create`, {
                        title,
                        author,
                        publishedDate,
                        description,
                        rate,
                        comment,
                        userId,
                        links
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
    signup2: function(send) {
        return axios.post(`${baseUrl}/users/create`, send, { headers: headers });
    },
    signup: async function(send) {
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

    },
    // searchBooks: async(title, author) => {
    searchBooks: async(search) => {
        // const query = { "$or": [{ title: search }, { author: search }] };
        const query = [{ title: search }, { author: search }];
        let stringQuery = qs.stringify(query);
        return await new Promise((resolve, reject) => {
            return axios
                // .get(`${baseUrl}/books/search?title=title&author=author`)
                .get(`${baseUrl}/books/search2?${stringQuery}`)
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