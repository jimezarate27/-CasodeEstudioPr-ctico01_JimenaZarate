const express = require ('express');
const fs = require ('fs');
const path = require ('path');

const app = express();
const PORT = 3002;
const PUBLIC = path.join(__dirname, 'public');

app.use(express.static(PUBLIC));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'home.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'edit.html'));
});




app.listen(PORT,() => {
    console.info(`Server Running at port ${PORT}`);;
});