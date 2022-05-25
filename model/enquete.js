const { th } = require('date-fns/locale');
const mysql = require('./mysql.js');


class Enquete {
    constructor(){
        this.id=null;
        this.titulo = "";
        this.dt_inicio = "";
        this.dt_fim = "";
    }

    async getAll() {
        return await mysql.executeQuery("SELECT * FROM enquete")
    }

    async save(){
        let result = "";
        try{ 
            result = await mysql.executeQuery("INSERT INTO enquete (titulo, dt_inicio, dt_fim) VALUES (?, ?, ?)", [this.titulo, this.dt_inicio, this.dt_fim])
        } catch(err){
            console.log("Erro ao salvar enquete: " + err);
            throw err;
        }
        this.id = result.insertId;
        return result;
    }
}
module.exports = { Enquete };