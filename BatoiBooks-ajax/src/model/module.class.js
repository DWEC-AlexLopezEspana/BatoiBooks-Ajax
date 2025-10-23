export default class Module {
    constructor(/*id,*/ code, cliteral, vliteral, courseId) {
        /*this.id = id;*/
        this.code = code;
        this.cliteral = cliteral;
        this.vliteral = vliteral;
        this.courseId = courseId;
    }

    toString() {
        return /*"ID Curso :" + this.id + */"Code Curso :" + this.courseId + "/Codigo Curso :" + this.code + "/n" +
            "Castellano modulo info : " + this.cliteral + "/nValenciano modulo info: " + this.vliteral;
    }
}