const data = {
    enquetes: require("../model/enquete.json"),
    setEnquetes: function (data) { 
        this.enquetes = data;
    }
};
const {Enquete} = require("../model/enquete.js");

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
    /*const newEnquete = {
        id: data.enquetes[data.enquetes.length-1].id + 1 || 1,
        titulo: req.body.titulo,
        dt_inicio: req.body.dt_inicio,
        dt_fim: req.body.dt_fim
    }
    data.setEnquetes([...data.enquetes, newEnquete]);
    res.status(201).json(newEnquete);*/
    const newEnquete = new Enquete();

    newEnquete.titulo = req.body.titulo;
    newEnquete.dt_inicio = req.body.dt_inicio;
    newEnquete.dt_fim = req.body.dt_fim;

    if(!newEnquete.titulo || !newEnquete.dt_inicio || !newEnquete.dt_fim) {
        res.status(400).json({"message": "Preencha todos os campos"});
    }
    try{
        const result = await newEnquete.save();
        res.status(201).json(newEnquete);
    } catch(err){
        res.status(500).json(err);
    }
}

const updateEnquete = (req, res) => {
    const enquete = data.enquetes.find(enq => enq.id === parseInt(req.body.id));
    if (!enquete) {
        return res.status(400).json({ "message": `enquete ID ${req.body.id} not found` });
    }
    if (req.body.titulo) enquete.titulo = req.body.titulo;

    if (req.body.dt_inicio) enquete.dt_inicio = req.body.dt_inicio;

    if (req.body.dt_fim) enquete.dt_fim = req.body.dt_fim;
    
    const filteredArray = data.enquetes.filter(enq => enq.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, enquete];
    data.setEnquetes(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.enquetes);
}
const deleteEnquete = (req, res) => {
    const enquete = data.enquetes.find(enq => enq.id === parseInt(req.body.id));
    if (!enquete) {
        return res.status(400).json({ "message": `enquete ID ${req.body.id} not found` });
    }
    const filteredArray = data.enquetes.filter(enq => enq.id !== parseInt(req.body.id));
    data.setEnquetes([...filteredArray]);
    res.json(data.enquetes);
}
const getEnquete = (req, res) => {
    const enquete = data.enquetes.find(enq => enq.id === parseInt(req.params.id));
    if (!enquete) {
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