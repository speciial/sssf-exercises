"use strict";
const users = [
    {
        id: "1",
        name: "Christian",
        email: "christian@mail.com",
        password: "1234"
    }
];

const getUserID = id => {
    const user = users.filter(usr => {
        if (usr.id === id) {
            return usr;
        }
    });
    return user[0];
};

const getUserLogin = email => {
    const user = users.filter(usr => {
        if (usr.email === email) {
            return usr;
        }
    });
    return user[0];
};

module.exports = {
    users,
    getUserID,
    getUserLogin
};
