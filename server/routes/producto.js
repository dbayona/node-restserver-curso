const { json } = require('body-parser');
const express = require('express');
const { verificarToken } = require('../middleware/autenticacion');

let app = express();
let Producto = require('../models/producto');

////////////////////
// Obtener todos los Productos
////////////////////

app.get('/productos', verificarToken, (req, res) => {

    // Traer todos los productos
    // Populate: usuario categoria
    // Paginado

    let desde = Number(req.query.desde) | 0;
    let limite = Number(req.query.limite) | 5;

    Producto
        .find({ disponible: true }) // condicion para la busqueda {} TODOS
        .skip(desde) //Registro inicial
        .limit(limite) //Registros por pagina
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments({ disponible: true }, (err, registros) => {

                res.json({
                    ok: true,
                    producto,
                    registros
                });

            });

        });
});

////////////////////
// Obtener un Producto por ID
////////////////////

app.get('/productos/:id', verificarToken, (req, res) => {

    // Populate: usuario categoria

    let id = req.params.id;

    Producto
        .findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto
            });

        });
});

////////////////////
// Buscar Producto
////////////////////

app.get('/productos/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto
        .find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });

});

////////////////////
// Crear un Producto
////////////////////

app.post('/productos', verificarToken, (req, res) => {

    // Grabar el usuario
    // Grabar una categoria del listado

    let producto = new Producto({

        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: req.body.categoria,
        usuario: req.usuario._id

    });

    producto.save((err, productoDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({

            ok: true,
            producto: productoDB
        });

    });

});

////////////////////
// Actualizar un Producto
////////////////////

app.put('/productos/:id', verificarToken, (req, res) => {

    // Grabar el usuario

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, req.body, { new: true }, (err, productoDB) => {

        if (err) {
            res.status(500).json({

                ok: false,
                err

            });
        }

        if (!productoDB) {
            res.status(400).json({

                ok: false,
                err: {
                    message: 'ID no existe'
                }

            });
        }

        res.json({

            ok: true,
            producto: productoDB

        });

    });
});

////////////////////
// Borrar un Producto
////////////////////

app.delete('/productos/:id', (req, res) => {

    // Populate: usuario categoria
    // Paginado

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {

        if (err) {
            res.status(500).json({

                ok: false,
                err

            });
        }

        if (!productoDB) {
            res.status(400).json({

                ok: false,
                err: {
                    message: 'ID no existe'
                }

            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            mensaje: 'Producto borrado'
        });

    });
});

module.exports = app;