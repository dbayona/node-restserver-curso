const bodyParser = require('body-parser');
const express = require('express');
const { verificarToken, verificarAdmin_Role } = require('../middleware/autenticacion');
const app = express();
const Categoria = require('../models/categoria');

// Mostrar todas las categorias
app.get('/categoria', verificarToken, (req, res) => {

    Categoria
        .find({})
        .sort('descripcion') //Ordenamos los resultados por la descripcion
        .populate('usuario', 'nombre email') //Debe coincidir con el nombre que se definio en el modelo categoriaSchema{..., usuario: ...}
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({}, (err, registros) => {

                res.json({
                    ok: true,
                    categorias,
                    registros
                });
            });
        });
});

// Mostrar una categoria por id
app.get('/categoria/:id', verificarToken, (req, res) => {

    //Extraemos el id de la categoria
    let id = req.params.id;

    //Buscamos la categoria
    Categoria.findById(id, (err, categoriaDB) => {

        //Validamos si hubo algun error
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el ID no es correcto'
                }
            });
        }

        //Devolvemos la respuesta
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// Crear una nueva categoria
app.post('/categoria', [verificarToken, verificarAdmin_Role], (req, res) => {

    //Regresa la nueva categoria
    //let idUsuario = req.usuario.id;

    //console.log('BODY --> ', req);

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
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
        });
    });

});

// Actualizar una nueva categoria
app.put('/categoria/:id', verificarToken, (req, res) => {

    //Extraemos el id de la categoria
    let id = req.params.id;

    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {

        if (err) {
            res.status(500).json({
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

    });

});

// Borrar una nueva categoria
app.delete('/categoria/:id', [verificarToken, verificarAdmin_Role], (req, res) => {

    //solo un administrador puede borrar categorias
    //Categoria.findByIdAndRemove

    //Extraemos el id de la categoria
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
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


module.exports = app;