const Note = require('../models/note');

class NoteController {
    async save(req, res) {
        const { title, body } = req.body;
        try {
            let note = new Note({ title: title, body: body, author: req.user._id });
            await note.save();
            res.status(200).json(note);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao salvar a nota' });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            let note = await Note.findById(id);
            if (JSON.stringify(req.user._id) == JSON.stringify(note.author._id)) {
                res.status(200).json(note);
            } else {
                res.status(400).json({ error: 'Nota não é desse usuario' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Erro ao buscar a nota' });
        }
    }
    async getAll(req, res) {
        try {
            let notes = await Note.find({ author: req.user._id });
            res.status(200).json(notes);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao buscar a nota' });
        }
    }
    async updateNote(req, res) {
        const { title, body } = req.body;
        const { id } = req.params;
        try {
            let note = await Note.findById(id);
            if (JSON.stringify(req.user._id) == JSON.stringify(note.author._id)) {
                let notes = await Note.findOneAndUpdate(id,
                    { $set: { title: title, body: body } },
                    { upsert: true, 'new': true }
                )
                res.status(200).json(notes);
            } else {
                res.status(400).json({ error: 'Nota não é desse usuario' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar nota' });
        }
    }
    async deleteNote(req, res) {
        const { id } = req.params;
        try {
            let note = await Note.findById(id);
            if (JSON.stringify(req.user._id) == JSON.stringify(note.author._id)) {
                await Note.deleteOne();
                res.status(200).json({ sucesso: 'nota deletado com sucesso' });
            } else {
                res.status(400).json({ error: 'Nota não é desse usuario' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Erro ao deletar nota' });
        }
    }
    async search(req, res) {
        const { query } = req.query;
        console.log(query)
        try {
            let notas = await Note.find({ author: req.user._id }).find({ $text: { $search: query } });
            res.status(200).json(notas);
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Erro ao pesquisar nota' });
        }
    }
}
module.exports = NoteController;