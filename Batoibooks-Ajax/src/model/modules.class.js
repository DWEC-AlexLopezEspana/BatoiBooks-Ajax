import * as ModulosApi from '../api/modules.api.js';
import Module from './module.class.js';
export default class Modules {
    constructor() {
        this.data = [];
    }
    async populate() {
        try {
            let modulos = await ModulosApi.getDBModules();
            this.data = modulos.map(mod => new Module(/*mod.id,*/ mod.code, mod.cliteral, mod.vliteral, mod.courseId));
            console.log(this.data);
        } catch (error) {
            console.error("Error al cargar todos los modulos");
        }
    }


    /*async addModule(moduloAnyadir) {
        let nuevoModulo = await ModulosApi.addDBModule(moduloAnyadir);

        let modulo = new Module(nuevoModulo.id, nuevoModulo.code, nuevoModulo.cliteral, nuevoModulo.vliteral, nuevoModulo.courseId);
        this.data.push(modulo);
        console.log("Modulo añadido y sincronizado en local", modulo);
        return modulo;
    }


    async changeModule(moduloActualizar) {
        try {
            let moduloModificado = await ModulosApi.changeDBModules(moduloActualizar);

            let modulo = new Module(moduloModificado.id, moduloModificado.code, moduloModificado.cliteral, moduloModificado.vliteral, moduloModificado.courseId);

            this.data = this.data.map(mod =>
                mod.id === moduloActualizar.id ? modulo : mod
            );
            console.log("Modulo modificado , ", moduloActualizar);
            return modulo;
        } catch (error) {
            console.error("Error al cambiar datos del modulo ", error)
            throw error;
        }
    }

    async removeModule(idModulo) {
        try {
            await ModulosApi.removeDBModule(idModulo);

            this.data = this.data.filter(modulo => modulo.id !== idModulo);
            console.log("Usuario borrado ");
        } catch (error) {
            console.log("Error al borrar los modulo ", error);
            throw error;
        }

    }*/

    getModuleByCode(moduleCode) {
        /*const modulos =  ModulosApi.getDBModules();
        console.log(modulos);
        const modulo = modulos.find(mod => mod.code === moduleCode);
        console.log(modulo);
        return  modulo;*/
        try {
            const modulo = this.data.find(mod => mod.code === moduleCode);
            console.log(modulo);
            if(!modulo) throw new Error();
            return modulo;
        } catch (error) {
            throw new Error(error);
            
        }

    }

    toString() {
        if (this.data.length === 0) return [];
        return this.data.map(libro => libro.toString()).join("\n");
    }
}