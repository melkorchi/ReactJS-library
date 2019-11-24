import axios from "axios";
import qs from 'qs'

const token = localStorage.getItem("token");
// console.log('token', token);
const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json"
    // "x-acces_token": localStorage.getItem("token")
    "Authorization": `Bearer ${token}`
};
// const baseUrl = "http://localhost:8080";
const baseUrl = "https://app-node-library.herokuapp.com";

// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
                    `${baseUrl}/users/login`,
                    'email=' + email + "&password=" + password, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    // console.log(err.response.data);
                    resolve(err.response);
                    // resolve(err.response.data);
                });
        });
    },
    updateUser: function(idUser, email, password, name, avatar, role) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/users/update/${idUser}`, qs.stringify({
                        email,
                        password,
                        name,
                        avatar,
                        role
                    }), {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                });
        });
    },
    getUserById: async(idUser) => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/users/view/${idUser}`, { headers: headers })
                .then(user => {
                    resolve(user.data.users);
                    console.log(user.data.users);
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    forgotMdp: async(email) => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/users/mdp-forgot/${email}`, { headers: headers })
                .then(data => {
                    resolve(data);
                    console.log(data);
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    ReinitMdp: function(email, password) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/users/mdp-forgot/reinit-mdp`, qs.stringify({
                        email,
                        password
                    }), {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                });
        });
    },
    removeUser: function(idUser) {
        return new Promise((resolve, reject) => {
            return axios.delete(
                    `${baseUrl}/users/delete/${idUser}`, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                    // Vérifier le .data
                });
        });
    },
    softRemoveUser: function(idUser) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/users/softdelete/${idUser}`, qs.stringify({
                        idUser
                    }), {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                    // Vérifier le .data
                });
        });
    },
    addBook: function(title, author, publishedDate, urlImage, description, rate, comment, userId, links) {
        console.log('links', links);
        links = qs.stringify({ links });
        return new Promise((resolve, reject) => {
            return axios.post(
                    `${baseUrl}/books/create`, qs.stringify({
                        title,
                        author,
                        publishedDate,
                        urlImage,
                        description,
                        rate,
                        comment,
                        userId,
                        'links': links
                    }), {
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
    updateBook: function(title, author, publishedDate, urlImage, description, rate, comment, userId, links, id, oldCommentDate, isNewComment) {
        // console.log('idBook', id);
        // console.log('links', links);
        links = qs.stringify({ links });
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/books/update/${id}`, qs.stringify({
                        title,
                        author,
                        publishedDate,
                        urlImage,
                        description,
                        rate,
                        comment,
                        userId,
                        'links': links,
                        oldCommentDate,
                        isNewComment
                    }), {
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
    removeBook: function(idBook) {
        return new Promise((resolve, reject) => {
            return axios.delete(
                    `${baseUrl}/books/delete/${idBook}`, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                    // Vérifier le .data
                });
        });
    },
    addComment: function(idBook, rate, comment, userId) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/books/${idBook}/comment/add`, qs.stringify({
                        rate,
                        comment,
                        userId
                    }), {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                    // Vérifier le .data
                });
        });
    },
    updateComment: function(idBook, rate, comment, userId) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/books/${idBook}/comment/update`, qs.stringify({
                        rate,
                        comment,
                        userId
                    }), {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                });
        });
    },
    removeComment: function(idBook, userId) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/books/${idBook}/comment/delete/${userId}`, {}, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                });
        });
    },
    addLog: function(ip, userId, date) {
        return new Promise((resolve, reject) => {
            return axios.post(
                    `${baseUrl}/logs/create`, qs.stringify({
                        ip,
                        userId,
                        date
                    }), {
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
    removeLog: function(idLog) {
        return new Promise((resolve, reject) => {
            return axios.delete(
                    `${baseUrl}/logs/delete/${idLog}`, {
                        headers: headers
                    }
                )
                .then(data => {
                    console.log(data.data);
                    resolve(data);
                })
                .catch(err => {
                    console.log(err.response);
                    resolve(err.response);
                    // Vérifier le .data
                });
        });
    },
    updateLog: function(idLog, ip, userId, date) {
        return new Promise((resolve, reject) => {
            return axios.put(
                    `${baseUrl}/logs/update/${idLog}`, qs.stringify({
                        ip,
                        userId,
                        date
                    }), {
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
    getLogById: async(idLog) => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/logs/view/${idLog}`, { headers: headers })
                .then(log => {
                    resolve(log.data.logs[0]);
                    console.log(log.data.logs[0])
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    getLogs: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/logs`, { headers: headers })
                .then(log => {
                    resolve(log);
                    console.log(log)
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    getLogsGroupByUserId: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/logs/getLogsGroupByUserId`, { headers: headers })
                .then(log => {
                    resolve(log.data);
                    console.log(log.data)
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    signup2: function(send) {
        return axios.post(`${baseUrl}/users/create`, send, { headers: headers });
    },
    signup: async function(send) {
        return new Promise((resolve, reject) => {
            return axios.post(`${baseUrl}/users/create`, qs.stringify(send), { headers: headers })
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
            // const token = localStorage.getItem("token");
            return axios
                .get(`${baseUrl}/books`, { headers: headers })
                .then(books => {
                    // Pour sortir de la promesse
                    // console.log(books.data.books);
                    resolve(books.data.books);
                    // resolve(books);
                })
                .catch(err => {
                    // console.log(err.response);
                    reject(err.response);
                })
        })

    },
    getBook: async(idBook) => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/books/view/${idBook}`, { headers: headers })
                .then(book => {
                    resolve(book.data);
                })
                .catch(err => {
                    reject(err.response);
                })
        })

    },
    getUsers: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/users`, { headers: headers })
                .then(users => {
                    // Pour sortir de la promesse
                    console.log(users.data.users);
                    resolve(users.data.users);
                })
                .catch(err => {
                    console.log(err.response);
                    reject(err.response);
                })
        })
    },
    findByCommentIdUser: async(idBook, commentIdUser) => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/books/search3/${idBook}/${commentIdUser}`, { headers: headers }) ///search3/:commentIdUser
                .then(books => {
                    // Pour sortir de la promesse
                    console.log(books.data.books);
                    resolve(books.data.books);
                })
                .catch(err => {
                    console.log(err.response);
                    reject(err.response);
                })
        })
    },
    getInfosUser: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/users/searchUserByToken/${token}`, { headers: headers })
                .then(user => {
                    // Pour sortir de la promesse
                    // console.log(user);
                    resolve(user);
                })
                .catch(err => {
                    // console.log(err.response);
                    reject(err.response);
                });
        });

    },
    getLogs: async() => {
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/logs`, { headers: headers })
                .then(logs => {
                    // Pour sortir de la promesse
                    console.log(logs.data.logs);
                    resolve(logs.data.logs);
                })
                .catch(err => {
                    console.log(err.response);
                })
        })

    },
    searchBooks: async(search) => {
        search = search.trim();
        const query = { title: search, author: search, publishedDate: search };

        let stringQuery = qs.stringify(query);
        // console.log(stringQuery);
        return await new Promise((resolve, reject) => {
            return axios
                // .get(`${baseUrl}/books/search?title=title&author=author`)
                .get(`${baseUrl}/books/search2?${stringQuery}`, { headers: headers })
                .then(books => {
                    // Pour sortir de la promesse
                    console.log(books.data.books);
                    resolve(books.data.books);
                })
                .catch(err => {
                    console.log(err.response.data);
                    reject(err.response.data);
                })
        })
    },
    searchUsers: async(search) => {
        search = search.trim();
        const query = { email: search, userId: search, createdAt: search };

        let stringQuery = qs.stringify(query);
        // console.log(stringQuery);
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/users/search2?${stringQuery}`, { headers: headers })
                .then(users => {
                    // Pour sortir de la promesse
                    console.log(users.data.users);
                    resolve(users.data.users);
                })
                .catch(err => {
                    // console.log(err.response.data);
                    reject(err.response.data);
                })
        })
    },
    searchLogs: async(search) => {
        search = search.trim();
        const query = { ip: search, userId: search, date: search };

        let stringQuery = qs.stringify(query);
        console.log(stringQuery);
        return await new Promise((resolve, reject) => {
            return axios
                .get(`${baseUrl}/logs/search2?${stringQuery}`, { headers: headers })
                .then(logs => {
                    // Pour sortir de la promesse
                    console.log(logs.data.logs);
                    resolve(logs.data.logs);
                })
                .catch(err => {
                    console.log(err.response.data);
                    reject(err.response.data);
                })
        })
    }
}