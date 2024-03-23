const usersModels = require('./models.js')

const isvalidpass = (pass, cpass) => {
    if (pass !== cpass) {
        return true;
    } else {
        return false;
    }
};

const isValidEmail = (array, email) => {
    let isvalid = true
    array.forEach(user => {
        if (user.EMAIL == email) {
            isvalid = false
        }
    });
    return isvalid
};

const isValidUser = (array, user) => {
    let isvalid = true
    array.forEach(login => {
        if (login.USER == user) {
            isvalid = false
        }
    });
    return isvalid
};

const loginTest = (req, res) => {
    usersModels.findUserByUsername(req.body.user, (err, result) => {
        if (err) {
            return
        }
        if (result) {
            console.log(result, req.body)
            if (result.USER === req.body.user && result.PASS === req.body.pass) {
                req.session.username = req.body.user
                res.cookie(`username`, req.body.user)
                res.redirect("/sucesspage");
                res.status(200);
            } else {
                res.redirect("/falho");
                res.status(401);
            }
        }
    })
}

const createAccount = (req, res) => {
    usersModels.getAllUsers((err, results) => {
        let mensagem;
        if (!isValidEmail(results, req.body.email)) {
            mensagem = "Email já cadastrado";
        } else if (!isValidUser(results, req.body.user)) {
            mensagem = "Usuário existente";
        } else if (isvalidpass(req.body.pass, req.body.cpass)) {
            mensagem = "Senha diferente";
        } else {
            usersModels.addUser(req.body.email, req.body.user, req.body.pass);
            mensagem = "Sucesso";
        }
        res.status(200).json({ mensagem: mensagem });
    })
}

const returnUsersList = (req, res) => {
    usersModels.getAllUsers((err, result) => {
        let usuarios = "";
        result.forEach((login) => {
            let label = `<div id="template"><div><label for="">Email:</label><label for="">${login.EMAIL}</label></div>
            <div><label for="">Username:</label><label for="">${login.USER}</label></div>
            <button id="${login.USER}" onclick="requesdelete('${login.USER}')" type="button" class="btn btn-danger">Deletar</button>
            </div>`;
            usuarios += label;
        });
        res.status(200).json({ mensagem: usuarios });
    })
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