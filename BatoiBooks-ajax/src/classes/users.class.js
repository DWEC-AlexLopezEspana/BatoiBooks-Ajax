import * as UsersAPI from '../services/users.api.js';
export default class Users{
    constructor(){
        this.data=[];
    }
    populate(){
        this.data = UsersAPI.getDBUsers();
    }




}