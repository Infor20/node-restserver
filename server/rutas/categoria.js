const express = require('express');
const _ = require('underscore');

const Categoria = require('../modelos/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const categoria = require('../modelos/categoria');

const app = express();

//
// Mostrar todas las categorias
//

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('categoria')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria
            })
        })
});

//
// Mostrar una categoria por ID
//

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

//
// Crear nueva categoria
//

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        categoria: body.categoria,
        usuario_crea: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });
});

//
// Actualizar la categoria
//

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        categoria: body.categoria
    }

    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});

//
// Delete la categoria
//

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })

});

module.exports = app;