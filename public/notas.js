const { response } = require("express");
const { URLSearchParams } = require("url");

function crearNota (){
    const titulo = document.getElementById('titulo').value;
    const asunto = document.getElementById('asunto').value;
    const etiquetas = document.getElementById('etiquetas').value;

    fetch('/notas', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({titulo, asunto, etiquetas})
    })
    .then(response => response.json())
    .then(data => {
        const container=document.getElementById('nueva-notas-container');
        agregarNota(data.titulo, data.asunto, data.etiquetas, data.fecha);
        document.getElementById('titulo').value = '';
        document.getElementById('asunto').value = '';
        document.getElementById('etiquetas').value = '';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-nota');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        crearNota();
    });

    fetch('/notas')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('nuevas-notas-container');
        data.forEach(nota =>{
            agregarNota(nota.titulo, nota.asunto, nota.etiquetas, nota.fecha);
        });
    });


    function agregarNota(titulo, asunto, etiquetas, fecha){
        const notaContainer= document.getElementById('nuevas-notas-container');
        const notaHTML = '<h2>${titulo}</h2> <p>${asunto}</p> <p class="etiqueta ${etiquetas}"> ${etiquetass}</p> <small>${fecha}</small></div>'
        container.innerHTML += notaHTML;
    }
});

function editarNota(id){
    window.location.href = 'edit.html?id=${id}';
}