export class View{
    constructor(){
        this.app = document.querySelector("#app");
        this.form = this.app.querySelector("#list");

    }

    setBookSubmitHandler(callback){
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const idBook = document.getElementById("id").value;
            const userId = document.getElementById("userId").value;
            const moduleCode = document.getElementById("userId").value;
            const publisher = document.getElementById("userId").value;
            const price = document.getElementById("userId").value;
            const pages = document.getElementById("userId").value;
            const status = document.getElementById("userId").value;
            const photo = document.getElementById("userId").value;
            const comments = document.getElementById("userId").value;
            const soldDate = document.getElementById("userId").value;
            callback({idBook,userId,moduleCode,publisher,price,pages,status,photo,comments,soldDate});

        })

    }

    setBookRemoveHandler(prod){
        
    }

    
}