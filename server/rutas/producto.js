const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../modelos/producto');

//
// Obtener  prodyuctos
//

app.get('/producto', verificaToken, (req, res) => {
    Producto.find({ disponible: true })
        .sort('categoria')
        .populate('usuario categoria')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            })
        })
});

//
// Obtener  prodyuctos por ID
//

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
        .populate('usuario categoria');
    // populate: usuario categortia
});

//
// Buscar producto
//

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ descripcion: regex, disponible: true })
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        });
});


//
// crear  prodyuctos 
//

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria_id,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })

    // grabar el usuario
    // grabar una categoria
});

//
// actualizar  prodyuctos 
//

app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;


    let desProducto = {
        descripcion: body.descripcion
    }

    Producto.findByIdAndUpdate(id, desProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })

});

//
// eliminar  prodyuctos 
//

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let statusProducto = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, statusProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })

});

module.exports = app;