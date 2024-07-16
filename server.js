const express = require ('express');
const fs = require ('fs');
const path = require ('path');

const app = express();
const PORT = 3002;
const PUBLIC = path.join(__dirname, 'public');

app.use(express.static(PUBLIC));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let notas = [];
let Id = 1;

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'home.html'))
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'edit.html'));
});

app.get('/notas', (req, res) => {
    res.json(notas);
});

app.post('/edit', (req, res ) => {
    const {titulo, asunto, etiquetas} = req.body;
    const nuevaNota = {
        id: Id++,
        titulo,
        asunto,
        etiquetas,
        fecha: new Date().toLocaleDateString()
    };
    notas.push(nuevaNota);
    res.json(nuevaNota);
});


app.post('/notas', (req, res) => {
    const { titulo, asunto, etiquetas } = req.body;
    if (!titulo || ! asunto) {
        res.status(400).json({message: 'Campos obligatorios'});
    } else {
        const nuevaNota = {
            id: Date.now(),
            titulo,
            asunto,
            etiquetas,
            fechaCreacion : new Date (),
            fechaModificacion : new Date ()
        };
        notas.push(nuevaNota);
        res.json(nuevaNota);
    }
});

app.put('/notas/: id', (req, res) => {
    const id = req.params.id;
    const { titulo, asunto, etiquetas} = req.body;
    const notaEncon = notas.find((nota) => nota.id == id);
    if (!notaEncon) {
        res.status(404).json({message: 'La nota no se encontro'});

    } else {
        notaEncon.titulo= titulo;
        notaEncon.asunto = asunto;
        notasEncon.etiquetas = etiquetas;
        notaEncon.fechaModificacion = new Date();
        res.json(notaEncon);
    }
});

app.delete('/notas/:id', (req, res) => {
    const id = req.params.id;
    const inicio = notas.findIndex((nota) => nota.id == id);
    if (inicio == -1){
        res.status(404).json({ message: 'La nota no se encontro'});

    } else {
        notas.splice(inicio, 1);
        res.json({message: 'La nota fue eliminada con exito'});
    }
})


app.listen(PORT,() => {
    console.info(`📝⏰Server Running at port ${PORT}`);;
});