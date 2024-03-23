const db = require('./bd');

const addUser = (email, user, pass) => {
    const query = 'INSERT INTO users (user, email, pass) VALUES (?, ?, ?)';
    db.query(query, [user, email, pass], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            return;
        }
    });
};

function getAllUsers(callback) {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao encontrar usuário:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

const deleteUserByUsername = (username) => {
    const query = 'DELETE FROM users WHERE USER = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            return;
        }
    });
}

function findUserByUsername(username, callback) {
    const query = 'SELECT USER, PASS FROM users WHERE USER = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Erro ao encontrar usuário:', err);
            callback(err, null);
            return;
        }
        callback(null, results[0]); // Retorna apenas o primeiro usuário encontrado
    });
}

function findUserByEmail(email, callback) {
    const query = 'SELECT EMAIL FROM users WHERE EMAIL = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao encontrar usuário:', err);
            callback(err, null);
            return;
        }
        callback(null, results[0]); // Retorna apenas o primeiro usuário encontrado
    });
}


module.exports = {
    getAllUsers,
    addUser,
    findUserByEmail,
    deleteUserByUsername,
    findUserByUsername
}