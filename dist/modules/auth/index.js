"use strict";
/**
 * Check the login details
 *
 * @param username
 * @param password
 */
Object.defineProperty(exports, "__esModule", { value: true });
var uname = "alfie@gmail.com";
var pass = "password";
exports.default = (function (username, password) {
    console.log(uname, pass);
    return new Promise(function (res, rej) {
        return res(username === uname && password === pass);
    });
});
