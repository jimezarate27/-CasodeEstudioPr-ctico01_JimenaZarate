const express = require ('express');
const fs = require ('fs');
const path = require ('path');

const app = express();
const PORT = 3002;
const PUBLIC = path.join(__dirname, 'public');

app.use(express.static(PUBLIC));
app.use(express.json());

let notas =[];
let Id = 1;

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'home.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'edit.html'));
});

app.get('/notas',(req, res) => {
    res.json(notas);
});

app.get('/notas/:Id', (req, res) => {
    const nota = nota.find(n => n.id == parseInt(req.params.id));
    if (nota) {
        res.json(nota);
    } else {
        res.send('Nota no encontrada');
    }
});

app.listen(PORT,() => {
    console.info(`Server Running at port ${PORT}`);;
});