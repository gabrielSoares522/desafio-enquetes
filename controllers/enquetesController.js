const {Enquete} = require("../model/enquete.js");
const { Opcao } = require("../model/opcao.js");

const getAllEnquetes = async(req, res) => {
    const enquete = new Enquete();
    try{
        const result = await enquete.getAll();
        res.json(result);
    } catch(err){
        res.status(500).json(err);
    }
}

const createEnquete = async(req, res) => {
    const newEnquete = new Enquete();

    newEnquete.titulo = req.body.titulo;
    newEnquete.dt_inicio = req.body.dt_inicio;
    newEnquete.dt_fim = req.body.dt_fim;
    
    if(!newEnquete.titulo || !newEnquete.dt_inicio || !newEnquete.dt_fim) {
        res.status(400).json({"message": "Preencha todos os campos"});
    }
    try{
        await newEnquete.save();
    } catch(err){
        res.status(500).json(err);
    }
    const opcoes = req.body.opcoes.map(opcao => {
        const newOpcao = new Opcao();
        newOpcao.id_enquete = newEnquete.id;
        newOpcao.resposta = opcao;
        return newOpcao});

    try{
        opcoes.forEach(async opcao => {
            await opcao.save();
        });
    } catch(err){
        res.status(500).json(err);
    }
    res.status(201).json(newEnquete);
}

const updateEnquete = async(req, res) => {
    let enquete = new Enquete();
    await enquete.findById(req.body.id);

    if (enquete.id == null) {
        return res.status(400).json({ "message": `enquete ID ${req.body.id} not found` });
    }
    if (req.body.titulo) enquete.titulo = req.body.titulo;

    if (req.body.dt_inicio) enquete.dt_inicio = req.body.dt_inicio;

    if (req.body.dt_fim) enquete.dt_fim = req.body.dt_fim;
    
    try{
        const result = await enquete.update();
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
}
const deleteEnquete = async(req, res) => {
    let enquete = new Enquete();
    await enquete.findById(req.body.id);
    
    if (enquete.id == null) {
        return res.status(400).json({ "message": `enquete ID ${req.body.id} not found` });
    }
    try{
        const result = await enquete.delete();
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
}
const getEnquete = async(req, res) => {
    const enquete = new Enquete();
    await enquete.findById(req.params.id);
    
    if (enquete.id == null) {
        return res.status(400).json({ "message": `enquete ID ${req.params.id} not found` });
    }
    res.json(enquete);
}

module.exports = {
    getAllEnquetes,
    createEnquete,
    updateEnquete,
    deleteEnquete,
    getEnquete
}