// ========================
// Puerto
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// string: mongodb+srv://cafeusr:UchGhY8BJzJFpAyu@cluster0.n6al9.mongodb.net/cafe?authSource=admin&replicaSet=atlas-o1bkfa-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
// ========================

//Variable de Entorno de HEROKU
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Base de Datos
// string: mongodb+srv://cafeusr:UchGhY8BJzJFpAyu@cluster0.n6al9.mongodb.net/cafe?authSource=admin&replicaSet=atlas-o1bkfa-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://cafeusr:UchGhY8BJzJFpAyu@cluster0.n6al9.mongodb.net/cafe';
}

process.env.URLDB = urlDB;