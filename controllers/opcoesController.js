const {Opcao} = require("../model/opcao.js");

const getAllOpcoes = async(req, res) => {
    const opcao = new Opcao();
    try{
        const result = await opcao.getAll();
        res.json(result);
    } catch(err){
        res.status(500).json(err);
    }
}

const createOpcao = async(req, res) => {
    const newOpcao = new Opcao();

    newOpcao.id_enquete = req.body.id_enquete;
    newOpcao.resposta = req.body.resposta;

    if(!newOpcao.id_enquete || !newOpcao.resposta) {
        res.status(400).json({"message": "Preencha todos os campos"});
    }
    try{
        await newOpcao.save();
        res.status(201).json(newOpcao);
    } catch(err){
        res.status(500).json(err);
    }
}

const updateOpcao = async(req, res) => {
    let opcao = new Opcao();
    await opcao.findById(req.body.id);

    if (opcao.id == null) {
        return res.status(400).json({ "message": `opcao ID ${req.body.id} not found` });
    }
    if (req.body.id_enquete) opcao.id_enquete = req.body.id_enquete;

    if (req.body.resposta) opcao.resposta = req.body.resposta;

    if (req.body.qt_votos) opcao.qt_votos = req.body.qt_votos;
    
    try{
        const result = await opcao.update();
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
}
const deleteOpcao = async(req, res) => {
    let opcao = new Opcao();
    await opcao.findById(req.body.id);
    
    if (opcao.id == null) {
        return res.status(400).json({ "message": `opcao ID ${req.body.id} not found` });
    }
    try{
        const result = await opcao.delete();
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
}
const getOpcao = async(req, res) => {
    const opcao = new Opcao();
    await opcao.findById(req.params.id);
    
    if (opcao.id == null) {
        return res.status(400).json({ "message": `opcao ID ${req.params.id} not found` });
    }else{
    res.json(opcao);
    }
}

module.exports = {
    getAllOpcoes,
    createOpcao,
    updateOpcao,
    deleteOpcao,
    getOpcao
}