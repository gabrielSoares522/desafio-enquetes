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
        let sql = "INSERT INTO enquete (titulo, dt_inicio, dt_fim)";
        sql+="VALUES (?, CONVERT_TZ(?,'+00:00','-03:00'), CONVERT_TZ(?,'+00:00','-03:00'))";
        try{ 
            result = await mysql.executeQuery(sql, [this.titulo, this.dt_inicio, this.dt_fim])
        } catch(err){
            console.log("Erro ao salvar enquete: " + err);
            throw err;
        }
        this.id = result.insertId;
        return result;
    }

    async findById(id){
        let result = await mysql.executeQuery("SELECT * FROM enquete WHERE id = ?", [id])
        if(result.length > 0){
            this.id = result[0].id;
            this.titulo = result[0].titulo;
            this.dt_inicio = result[0].dt_inicio;
            this.dt_fim = result[0].dt_fim;
            return this;
        }
    }
    async update(){
        let result = "";
        try{
            result = await mysql.executeQuery("UPDATE enquete SET titulo = ?, dt_inicio = ?, dt_fim = ? WHERE id = ?", [this.titulo, this.dt_inicio, this.dt_fim, this.id])
        } catch(err){
            console.log("Erro ao atualizar enquete: " + err);
            throw err;
        }
        return this;
    }

    async delete(){
        let result = "";
        try{
            result = await mysql.executeQuery("DELETE FROM enquete WHERE id = ?", [this.id])
        } catch(err){
            console.log("Erro ao deletar enquete: " + err);
            throw err;
        }
        return this;
    }
}
module.exports = { Enquete };