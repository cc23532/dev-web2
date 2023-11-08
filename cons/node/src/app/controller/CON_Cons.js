const bd = require("../../config/database")
const consultorioDAO= require("../bd/DAO_Cons")

class CON_Cons{

    verificaLogin(){
        return function (req, res){
            const consDAO = new consultorioDAO(bd);
            const { email, senha, tipoDeUsuario } = req.body;
            consDAO.login(email, senha, tipoDeUsuario)
            .then((recordset) => {
                if (recordset.length === 1) {
                    if (tipoDeUsuario === 'M') {
                        const emailMedico = recordset[0].email;
                        consDAO.select_idMedico(emailMedico)
                        .then((medicoData) => {
                            if (medicoData) {
                                req.session.user = { idMedico: medicoData.idMedico, nomeMedico: medicoData.nomeMedico };
                                console.log(medicoData.idMedico, medicoData.nomeMedico);
                                res.redirect('/homeMedico');
                            } else {
                                console.log("Médico não encontrado");
                                res.send("Médico não encontrado");
                            }
                        })
                        .catch((erro) => {
                            console.log(erro);
                            res.send("Falha ao buscar os dados do médico");
                        });
                    } else if (tipoDeUsuario === 'P') {
                        res.send("ÁREA DE PACIENTE EM CONSTRUÇÃO");
                    }
                } else {
                    console.log("Nenhum registro encontrado ou mais de um registro encontrado.");
                    throw new Error("Falha ao efetuar login");
                }
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao efetuar login");
            });
        }
    }
    
    incluiCadastroEmail(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const email= req.body.email;
            const { senha, tipoDeUsuario } = req.body;

            consDAO.cadastroEmail(email, senha, tipoDeUsuario)
            .then(() => {
                if (tipoDeUsuario === 'M') {
                res.redirect(`/cadastroDadosMedico?email=${email}`);
                } else if (tipoDeUsuario === 'P') {
                res.redirect(`/cadastroDadosPaciente?email=${email}`);
                } else {
                res.send("Tipo de usuário desconhecido");
                }
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao inserir o email...");
            });
        }
    }

    incluiCadastroMedico(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const { nome, sobrenome, especialidade, CRM, email } = req.body

            consDAO.cadastroMedico(nome, sobrenome, especialidade, CRM, email)
            .then(() => {
                console.log("Sucesso ao inserir o Médico")
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>O registro foi inserido com sucesso</p>');
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao inserir o Médico...")
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
                    res.write('<p>Nao foi possivel encontrar o cadastro</p>');
                    res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                    res.end ('</body></html>');                  
                }
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Nao foi possivel encontrar o cadastro</p>');
                res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                res.end ('</body></html>');            
            })
        }
    }

    redefineSenha(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const senha= req.body.senha
            const email= req.body.email
            consDAO.novaSenha(senha, email) 
            .then((results) => {
                console.log(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`);
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Nao foi possivel alterar os dados: '+ erro +'</p>');
                res.write('<a href="/esqueciMinhaSenha" class="btn btn-primary">Voltar para ESQUECI MIMHA SENHA</a>')
                res.end ('</body></html>');            
            })
        }
    }

    selectDadosMed(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idMedico= req.session.user.idMedico
            consDAO.select_AltDadosMed(idMedico)
            .then((medicoData) => {
                if (medicoData) {
                    req.session.user = { idMedico: medicoData.idMedico, nomeMedico: medicoData.nomeMedico, sobrenomeMed: medicoData.sobrenomeMed, especialidade: medicoData.especialidade, crm: medicoData.crm, email: medicoData.email };
                    console.log(medicoData.idMedico, medicoData.nomeMedico,  medicoData.sobrenomeMed, medicoData.especialidade, medicoData.crm, medicoData.email );
                    res.redirect('/formAltDados');
                } else {
                    console.log("Médico não encontrado");
                    res.send("Médico não encontrado");
                }
            })
            .catch(erro => console.log(erro));
        }
    }

    updateMedico(){
        return function (req,res){
            const consDAO= new consultorioDAO(bd)
            const nome= req.body.nome
            const sobrenome= req.body.sobrenome
            const especialidade= req.body.especialidade
            const crm= req.body.crm
            const email= req.body.email
            const idMedico= req.body.idMedico

            console.log('Dados recebidos via POST:');
            console.log('Nome:', nome);
            console.log('Sobrenome:', sobrenome);
            console.log('especialidade:', especialidade);
            console.log('CRM:', crm);
            console.log('Email:', email);
            console.log('ID do Médico:', idMedico);

            consDAO.updateDadosMedico(nome, sobrenome, especialidade, crm, email, idMedico)
            .then((results) => {
                console.log(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`);
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Nao foi possivel alterar os dados: '+ erro +'</p>');
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');            
            })
        }
    }   

    selectMedicoNovaConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idMedico= req.session.user.idMedico
            consDAO.select_novaConsulta(idMedico)
            .then((medicoData) => {
                if (medicoData) {
                    req.session.user = { idMedico: medicoData.idMedico, nomeMedico: medicoData.nomeMedico }
                    console.log(medicoData.idMedico, medicoData.nomeMedico);
                    res.redirect('/novaConsulta');
                } else {
                    console.log("Médico não encontrado");
                    res.send("Médico não encontrado");
                }
            })
             .catch(erro => console.log(erro));
        }
    }

    agendaNovaConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const { idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta } = req.body

            consDAO.novaConsulta(idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta)
            .then(() => {
                console.log("Sucesso ao agendar consulta")
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Consulta agendada!</p>');
                res.write('<a href="/homeMedico" class="btn btn-primary">Ir para HOME</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao inserir o Paciente...")
            })
        }
    }

    listagemConsultasAtivas(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idMedico= req.session.user.idMedico
            consDAO.select_ConsultaAtiva(idMedico)
            .then((consData) => {
                if (consData) {
                    console.log("Abrindo página de consultas ativas...")
                    console.log(consData)
                    res.render('./homeMedico/listConsultasAtivas', { idConsultas: consData }); // Passa as consultas para o template
                } else {
                    console.log("Consultas não encontradas");
                    res.send("Consultas não encontradas");
                }
            })
            .catch(erro => console.log(erro));
        }
    }

    selectAlterarConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idConsulta= req.session.user.idConsulta
            consDAO.select_AltConsulta(idConsulta)
            .then((consData) =>{
                if (consData) {
                    console.log("Abrindo página de consultas ativas...")
                    console.log(consData)
                    res.render('./homeMedico/formStatusConsulta', { idConsultas: consData }); // Passa as consultas para o template
                } else {
                    console.log("Consulta não encontrada");
                    res.send("Consulta não encontrada");
                }
            })
            .catch(erro => console.log(erro));
            }
        }
    
}


module.exports= CON_Cons;