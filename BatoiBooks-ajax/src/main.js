import Users from './classes/users.class.js';

const users = new Users();

users.populate();

users.forEach(user => {
    console.log(user);
});