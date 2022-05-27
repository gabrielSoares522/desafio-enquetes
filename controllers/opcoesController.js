const {Opcao} = require("../model/opcao.js");
const {Enquete} = require("../model/enquete.js");

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

const getOpcaoByEnquete = async(req, res) => {
    const opcao = new Opcao();
    const opcoes = await opcao.findByEnquete(req.params.id);

    if (opcoes.length == 0) {
        return res.status(400).json({ "message": `opcao ID ${req.params.id} not found` });
    }
    res.json(opcoes);
    
}

const registerVote = async(req, res) => {
    
    const opcao = new Opcao();

    await opcao.findById(req.body.idOpcao);

    if (opcao.id == null) {
        return res.status(400).json({ "message": `opcao ID ${req.body.idOpcao} not found` });
    }

    const enquete = new Enquete();

    await enquete.findById(opcao.id_enquete);

    const dt_atual = new Date();
    let dt_inicio = new Date(enquete.dt_inicio);
    let dt_fim = new Date(enquete.dt_fim);
    /*
    console.log(enquete.dt_inicio);
    let [data_inicio,hora_inicio] = enquete.dt_inicio.split(/[T]/);
    console.log(data_inicio,hora_inicio);
    data_inicio = data_inicio.split('-');
    hora_inicio = hora_inicio.split(':');
    dt_inicio = new Date(data_inicio[0], data_inicio[1]-1, data_inicio[2], hora_inicio[0], hora_inicio[1], 0);
    
    let [data_fim,hora_fim] = enquete.dt_fim.split(/[T]/);
    data_fim = data_fim.split('-');
    hora_fim = hora_fim.split(':');
    let dt_fim = new Date(data_fim[0], data_fim[1]-1, data_fim[2], hora_fim[0], hora_fim[1], 0);*/

    if(dt_atual < dt_inicio || dt_atual > dt_fim){
        return res.status(400).json({ "message": `Enquete com ID ${enquete.id} não está aberta` });
    }
    
    opcao.qt_votos++;
    try{
        const result = await opcao.update();
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {
    getAllOpcoes,
    createOpcao,
    updateOpcao,
    deleteOpcao,
    getOpcao,
    getOpcaoByEnquete,
    registerVote
}