const bd = require("../../config/database")
const consultorioDAO= require("../bd/DAO_Cons")

class CON_Cons{

    verificaLogin(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const { email, senha }= req.body;

            consDAO.login(email, senha)
            .then((recordset) => {
                if (recordset.length === 1) {
                    res.send("LOGIN EFETUADO COM SUCESSO");
                  } else {
                    res.send("Falha ao efetuar login");
                  }
            })
            .catch((erro) => {
                console.log(erro)
                res.send("falha ao efetuar login")
            })
        }
    }

    incluiCadastroEmail(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const email= req.body.email;
            const { senha, tipoDeUsuario } = req.body;

            consDAO.cadastroEmail(email, senha, tipoDeUsuario)
            .then(() =>{
                res.redirect(`/cadastroDadosPaciente?email=${email}`)
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao inserir o email...")
            })
        }
    }

    incluiCadastroPaciente(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const { nome, sobrenome, cpf, telefone, nascimento, email } = req.body

            consDAO.cadastroPaciente(nome, sobrenome, cpf, telefone, nascimento, email)
            .then(() => {
                console.log("Sucesso ao inserir o Paciente")
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>O registro foi inserido com sucesso</p>');
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao inserir o Paciente...")
            })
        }
    }

    verificaEsqSenha(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const email = req.body.email
            const tipoDeUsuario= req.body.tipoDeUsuario;

            consDAO.dadosEsqSenha(email, tipoDeUsuario)
            .then((recordset) => {
                if (recordset.length === 1) {
                    res.redirect(`/redefinirSenha?email=${email}`)
                } else {
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.write('<html><body>');
                    res.write('<p>Não foi possível encontrar o cadastro</p>');
                    res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                    res.end ('</body></html>');                  
                }
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Não foi possível encontrar o cadastro</p>');
                res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                res.end ('</body></html>');            
            })
        }
    }

    redefineSenha(){
        return function (req, res){
            const { email, senha }= req.body
            consDAO.novaSenha(email, senha) 
            .then(() => {
                console.log("Sucesso ao inserir o Paciente")
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>O registro foi inserido com sucesso</p>');
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Não foi possível alterar os dados: '+ erro +'</p>');
                res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                res.end ('</body></html>');            
            })
        }
    }

}

module.exports= CON_Cons;