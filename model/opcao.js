const { th } = require('date-fns/locale');
const mysql = require('./mysql.js');


class Opcao {
    constructor(){
        this.id = null;
        this.id_enquete = null;
        this.resposta = "";
        this.qt_votos = 0;
    }

    async getAll() {
        return await mysql.executeQuery("SELECT * FROM opcao")
    }

    async save(){
        let result = "";
        try{ 
            result = await mysql.executeQuery("INSERT INTO opcao (id_enquete, resposta, qt_votos) VALUES (?, ?, ?)", [this.id_enquete, this.resposta, 0])
        } catch(err){
            console.log("Erro ao salvar enquete: " + err);
            throw err;
        }
        this.id = result.insertId;
        return result;
    }

    async findById(id){
        let result = await mysql.executeQuery("SELECT * FROM opcao WHERE id = ?", [id])
        if(result.length > 0){
            this.id = result[0].id;
            this.id_enquete = result[0].id_enquete;
            this.resposta = result[0].resposta;
            this.qt_votos = result[0].qt_votos;
            return this;
        }
    }
    async update(){
        let result = "";
        try{
            result = await mysql.executeQuery("UPDATE opcao SET id_enquete = ?, resposta = ?, qt_votos = ? WHERE id = ?", [this.id_enquete, this.resposta, this.qt_votos, this.id])
        } catch(err){
            console.log("Erro ao atualizar enquete: " + err);
            throw err;
        }
        return this;
    }

    async delete(){
        let result = "";
        try{
            result = await mysql.executeQuery("DELETE FROM opcao WHERE id = ?", [this.id])
        } catch(err){
            console.log("Erro ao deletar enquete: " + err);
            throw err;
        }
        return this;
    }
    async findByEnquete(id_enquete){
        return await mysql.executeQuery("SELECT * FROM opcao WHERE id_enquete = ?", [id_enquete])
    }
}
module.exports = { Opcao };