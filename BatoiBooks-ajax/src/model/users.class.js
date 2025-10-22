import User from "./user.class.js";
import * as UsersAPI from '../services/users.api.js';
export default class Users {
    constructor() {
        this.data = [];
    }

    async populate() {
        try {
            let users = await UsersAPI.getDBUsers();
            console.log("Raw users from API:", users);
            this.data = users.map(usuario => new User(usuario.id, usuario.nick, usuario.email, usuario.password));
            console.log("Mapped this.data:", this.data);
        } catch (error) {
            console.error("Error al cargar usuarios: ", error);
        }
    }

    async addUser(usuario) {
        try {
            let nuevoUsuario = await UsersAPI.addDBUser(usuario);
            let usuarioFinal = new User(nuevoUsuario.id, nuevoUsuario.nick, nuevoUsuario.email, nuevoUsuario.password);
            this.data.push(usuarioFinal);
            console.log("Usuario añadido y soncronizado en local", usuarioFinal);
            return usuarioFinal;
        } catch (error) {
            console.log("Error al añadir un nuevo usuario:", error);
            throw error;
        }
    }

    async removeUser(idUser) {
        try {
            await UsersAPI.removeDBUser(idUser);

            this.data = this.data.filter(usuario => usuario.id !== idUser);
            console.log("Usuario borrado ");
        } catch (error) {
            console.log("Error al borrar los usuarios ", error);
            throw error;
        }

    }
    async changeUser(usuarioActualizar) {
        try {
            let usuarioModificado = await UsersAPI.changeDBUsers(usuarioActualizar);

            let usuarioFinal = new User(usuarioModificado.id, usuarioModificado.nick, usuarioModificado.email, usuarioModificado.password);

            this.data = this.data.map(usuario =>
                usuario.id === usuarioActualizar.id ? usuarioFinal : usuario
            );
            console.log("Usuario modificado , ", usuarioModificado);
            return usuarioFinal;
        } catch (error) {
            console.error("Error al cambiar datos del usuario ", error)
            throw error;
        }
    }


    async changeUserPassword(idUsuario, newPassword) {
        try {
            let usuarioCambiado = await UsersAPI.changeDBUserPassword(idUsuario, newPassword);
            let usuarioFinal = new User(usuarioCambiado.id, usuarioCambiado.nick, usuarioCambiado.email, usuarioCambiado.password);

            this.data = this.data.map(usuario =>
                usuario.id === idUsuario ? usuarioFinal : usuario
            );

            console.log("Contraseña del usuario con ID", idUsuario, "actualizada correctamente");
            return usuarioFinal;
        } catch (error) {
            console.error("Error al cambiar la contraseña del usuario", error);
            throw error;
        }

    }

    async getUserById(idUser) {
        try {
            let usuario = await UsersAPI.getDBUser(idUser);
            return new User(usuario.id, usuario.nick, usuario.email, usuario.password);
        } catch (error) {
            console.error("Error al cambiar la contraseña del usuario", error);
            throw error;
        }
    }




    toString() {
        if (this.data.length === 0) return [];
        return this.data.map(user => user.toString()).join("\n")
    }




    /*Faltan estos por mdificar*/


    getUserIndexById(userId) {
        let indiceUsuarioId = this.data.findIndex(user => user.id == userId);
        if (indiceUsuarioId === -1) throw new Error("Error al buscar el indice del Usuario");
        return indiceUsuarioId;
    }
    getUserByNickName(nick) {

        let nickUsuario = this.data.find(niUs => niUs.nick === nick);
        if (!nickUsuario) throw new Error("Error al buscar el usuario por su Nick")
        return nickUsuario;

    }


}