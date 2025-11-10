export default class User {
    constructor(id, nick, email, password) {
        this.id = id;
        this.nick = nick;
        this.email = email;
        this.password = password;
    }

    toString() {
        return "Id Usuario :" + this.id + "/nNick Usuario :" + this.nick + "/n" +
            "Email Usuario : " + this.email + "/nContrasenya Usuario: " + this.password;
    }
}