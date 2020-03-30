// =======
// Puerto
// =======

process.env.PORT = process.env.PORT || 3000;

// =======
// Entorno
// =======

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======
// Base de datos
// =======

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafeteria';
} else {
    urlBD = 'mongodb://root:0vKJKRughzCeiYmU@cluster0-ay88q.mongodb.net/cafeteria';
}

process.env.URLDB = urlBD;
//
//