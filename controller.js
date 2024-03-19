const usersModels = require('./models.js')

const loginTest = (req, res) => {
    if (usersModels.userFind) {
        req.session.username = req.body.user
        res.cookie(`username`, req.body.user)
        res.redirect("/sucesspage");
        res.status(200);
    } else {
        res.redirect("/falho");
        res.status(401);
    }
}

const createAccount = (req, res) => {
    let mensagem;
    if (usersModels.isValidEmail(req.body.email) === false) {
        console.log(req.body.email);
        mensagem = "Email já cadastrado";
    } else if (usersModels.isValidUser(req.body.user) === false) {
        mensagem = "Usuário existente";
    } else if (usersModels.isvalidpass(req.body.pass, req.body.cpass) === false) {
        mensagem = "Senha diferente";
    } else {
        usersModels.addUser(req.body.email, req.body.user, req.body.pass);
        mensagem = "Sucesso";
    }
    res.status(200).json({ mensagem: mensagem });
}

const returnUsersList = (req, res) => {
    console.log(usersModels.returnUserListHTML())
    let usuarios = usersModels.returnUserListHTML()
    res.status(200).json({ mensagem: usuarios });
}

const deleteUser = (req, res) => {
    try {
        usersModels.deleteUserByUsername(req.body.username);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logoutSession = (req, res) => {
    req.session.destroy(function (err) {
        res.clearCookie('username');
        res.redirect('/');
    })
}
module.exports = {
    loginTest,
    createAccount,
    returnUsersList,
    deleteUser,
    logoutSession
}