let users = [{ email: `guiguidavidavi9@gmail.com`, user: `Gui`, pass: `123` }];

const addUser = (email, user, pass) => {
    const newConta = {
        email: email,
        user: user,
        pass: pass,
    };
    users.push(newConta);
};

const isvalidpass = (pass, cpass) => {
    if (pass !== cpass) {
        return false;
    } else {
        return true;
    }
};

const isValidEmail = (email) => {
    if (users.some((login) => login.email === email)) {
        return false;
    } else {
        return true;
    }
};

const isValidUser = (name) => {
    if (users.some((login) => login.user === name)) {
        return false;
    } else {
        return true;
    }
};
const deleteUserByUsername = (username) => {
    const index = users.findIndex((user) => user.user === username);
    if (index !== -1) {
        users.splice(index, 1);
        console.log(`Usuário ${username} deletado com sucesso.`);
    } else {
        console.log(`Usuário ${username} não encontrado.`);
    }
}

const userFind = () => {
    users.find((login) => login.user === req.body.user && login.pass === req.body.pass)
}

const returnUserListHTML = () => {
    let usuarios = "";
    users.forEach((login) => {
      let label = `<div id="template"><div><label for="">Email:</label><label for="">${login.email}</label></div>
          <div><label for="">Username:</label><label for="">${login.user}</label></div>
          <button id="${login.user}" onclick="requesdelete('${login.user}')" type="button" class="btn btn-danger">Deletar</button>
          </div>`;
      usuarios += label;
    });
    return usuarios
}
module.exports = {
    isvalidpass,
    addUser,
    isValidEmail,
    isValidUser,
    deleteUserByUsername,
    userFind,
    returnUserListHTML
}