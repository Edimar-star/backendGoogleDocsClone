const Document = require('../models/Document')
const controller = {}
const defaultValue = ""
const defaultTittle = "Documento sin titulo"

controller.findOrCreateDocument = async (id, email) => {
    if (id == null || email == null) return;

    const document = await Document.findById(id);
    if (document) return document;
    return await Document.create({ _id: id, email: email, data: defaultValue, title: defaultTittle });
}

controller.findByIdAndUpdate = async (documentId, doc) => {
    await Document.findByIdAndUpdate(documentId, { data: doc.data, title: doc.title });
}

controller.findDocuments = async (req, res) => {
    if (req.user.email == null) return;

    const documents = await Document.find({ email: req.user.email });
    if (documents) {
        res.json(documents);
    } else {
        res.send("not found");
    }
}

controller.deleteDocument = async (req, res) => {
    await Document.findByIdAndRemove(req.params.id);
    res.send('Documento eliminado');
}

controller.findTitleDocument = async (req, res) => {
    const d = await Document.findById(req.params.id);
    res.send({ user: req.user, title: (d) ? d.title : defaultTittle });
}

module.exports = controller;