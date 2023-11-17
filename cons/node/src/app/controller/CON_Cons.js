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
                                console.log("Medico não encontrado");
                                res.send("Medico não encontrado");
                            }
                        })
                        .catch((erro) => {
                            console.log(erro);
                            res.send("Falha ao buscar os dados do Medico");
                        });
                    } 
                    else if (tipoDeUsuario === 'P') {
                        const emailPaciente = recordset[0].email;
                        consDAO.select_idPaciente(emailPaciente)
                        .then((PacienteData) => {
                            if (PacienteData) {
                                req.session.user = { idPaciente: PacienteData.idPaciente, nomePaciente: PacienteData.nomePaciente };
                                console.log(PacienteData.idPaciente, PacienteData.nomePaciente);
                                res.redirect('/homePac');
                            } else {
                                console.log("Paciente não encontrado");
                                res.send("Paciente não encontrado");
                            }
                        })
                        .catch((erro) => {
                            console.log(erro);
                            res.send("Falha ao buscar os dados do Paciente");
                        });
                    }
                } else {
                    console.log("Nenhum registro encontrado ou mais de um registro encontrado.");
                    throw new Error("Falha ao efetuar login");
                }
            })
            .catch((erro) => {
                console.log(erro)
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>'+ erro +'</p>');
                res.write('<a href="/login" class="btn btn-primary">Ir para LOGIN</a>')
                res.end ('</body></html>');                        });
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

    selectDadosPac(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idPaciente= req.session.user.idPaciente
            consDAO.select_AltDadosPac(idPaciente)
            .then((PacienteData) => {
                if (PacienteData) {
                    req.session.user = { idPaciente: PacienteData.idPaciente, nomePaciente: PacienteData.nomePaciente, sobrenomePac: PacienteData.sobrenomePac, CPF: PacienteData.CPF, telefone: PacienteData.telefone, email: PacienteData.email };
                    console.log(PacienteData.idPaciente, PacienteData.nomePaciente,  PacienteData.sobrenomePac, PacienteData.CPF, PacienteData.telefone, PacienteData.email );
                    res.redirect('/formAltDadosPac');
                } else {
                    console.log("Paciente não encontrado");
                    res.send("Paciente não encontrado");
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

    updatePac(){
        return function (req,res){
            const consDAO= new consultorioDAO(bd)
            const nomePaciente = req.body.nomePaciente;
            const sobrenomePac = req.body.sobrenomePac;
            const CPF = req.body.CPF;
            const telefone = req.body.telefone;
            const email = req.body.email;
            const idPaciente = req.body.idPaciente;

            console.log('Dados recebidos via POST:');
            console.log('Nome:', nomePaciente);
            console.log('Sobrenome:', sobrenomePac);
            console.log('CPF:', CPF);
            console.log('telefone:', telefone);
            console.log('Email:', email);
            console.log('ID do Paciente:', idPaciente);

            consDAO.updateDadosPac(nomePaciente, sobrenomePac, CPF, telefone, email, idPaciente)
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

    selectPacNovaConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idPaciente= req.session.user.idPaciente
            consDAO.select_PacNovaConsulta(idPaciente)
            .then((PacienteData) => {
                if (PacienteData) {
                    req.session.user = { idPaciente: PacienteData.idPaciente, nomePaciente: PacienteData.nomePaciente }
                    console.log(PacienteData.idPaciente, PacienteData.nomePaciente);
                    res.redirect('/SolicitarNovaConsulta');
                } else {
                    console.log("Paciente não encontrado");
                    res.send("Paciente não encontrado");
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
                res.send("Falha ao agendar nova consulta: "+ erro+ "...")
            })
        }
    }

    solicitaNovaConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd);
            const { idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta } = req.body

            consDAO.novaConsulta(idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta)
            .then(() => {
                console.log("Sucesso ao agendar consulta")
                res.writeHead(200, {'Content-Type':'text/html'});
                res.write('<html><body>');
                res.write('<p>Consulta agendada!</p>');
                res.write('<a href="/homePac" class="btn btn-primary">Ir para HOME</a>')
                res.end ('</body></html>');
            })
            .catch((erro) => {
                console.log(erro);
                res.send("Falha ao agendar nova consulta: "+ erro+ "...")
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
                    res.render('./homeMedico/listConsultasAtivas', { idConsultas: consData }); 
                } else {
                    console.log("Consultas não encontradas");
                    res.send("Consultas não encontradas");
                }
            })
            .catch(erro => console.log(erro));
        }
    }

    listagemProximasConsultasPac(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idPaciente= req.session.user.idPaciente
            consDAO.select_ProximasConsultas(idPaciente)
            .then((consData) => {
                if (consData) {
                    console.log("Abrindo página de consultas ativas...")
                    console.log(consData)
                    res.render('./homePac/listProximasConsultas', { idConsultas: consData }); 
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
            const idConsulta= req.params.idConsulta
            consDAO.select_AltConsulta(idConsulta)
            .then((consData) =>{
                if (consData) {
                    req.session.user= { idConsulta: consData.idConsulta, dataConsulta: consData.dataConsulta, horaInicio: consData.horaInicio, tipoConsulta: consData.tipoConsulta, ativo: consData.ativo }
                    console.log("Abrindo página de consultas ativas...")
                    console.log(req.session.user)
                    res.render('./homeMedico/formStatusConsulta', { consulta: consData }); 
                    console.log("idConsulta:", idConsulta);

                } else {
                    console.log("Consulta não encontrada");
                    res.send("Consulta não encontrada");
                }
            })
            .catch(erro => console.log(erro));
            }
    }
    
    selectCancelarConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const idConsulta= req.params.idConsulta
            consDAO.select_AltConsulta(idConsulta)
            .then((consData) =>{
                if (consData) {
                    req.session.user= { idConsulta: consData.idConsulta, ativo: consData.ativo }
                    console.log("Abrindo página de consultas ativas...")
                    console.log(req.session.user)
                    res.render('./homePac/cancelarConsulta', { consulta: consData }); 
                    console.log("idConsulta:", idConsulta);

                } else {
                    console.log("Consulta não encontrada");
                    res.send("Consulta não encontrada");
                }
            })
            .catch(erro => console.log(erro));
            }
    }

    alteraDadosConsulta(){
            return function (req, res){
                const consDAO= new consultorioDAO(bd)
                const observacoes= req.body.observacoes
                const horaFim= req.body.horaFim
                const ativo= req.body.ativo
                const idConsulta= req.body.idConsulta
                consDAO.updateConsulta(observacoes, horaFim, ativo, idConsulta)
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

    confirmaCancelarConsulta(){
        return function (req, res){
            const consDAO= new consultorioDAO(bd)
            const ativo= req.body.ativo
            const idConsulta= req.body.idConsulta
            consDAO.updateCancelarConsulta(ativo, idConsulta)
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

    listagemPacientes() 
    {
          return function(req,res) {
              const consDAO = new consultorioDAO(bd);
              consDAO.selectPacientes()
                .then((resultados) => {
                   console.log(resultados);
                   res.render('./homeMedico/listagemPacientes', { Pacientes: resultados});
                })
                .catch(erro => console.log(erro));
          }
    };

    listagemMedicos() 
    {
          return function(req,res) {
              const consDAO = new consultorioDAO(bd);
              consDAO.selectMedicos()
                .then((resultados) => {
                   console.log(resultados);
                   res.render('./homePac/listagemMedicos', { Medicos: resultados});
                })
                .catch(erro => console.log(erro));
          }
    };

    deletarMedico(){
            return function(req, res){
                const consDAO= new consultorioDAO(bd)
                const idMedico= req.session.user.idMedico
                consDAO.deleteMedico(idMedico)
                .then((medicoData) =>{
                    if(medicoData){
                        req.session.user= {idMedico: medicoData.idMedico}
                        res.redirect("/confirmarExclusao")
                    }
                })
                .catch(erro => console.log(erro))
            }
    }

    deletarPaciente(){
        return function(req, res){
            const consDAO= new consultorioDAO(bd)
            const idPaciente= req.session.user.idPaciente
            consDAO.deletePaciente(idPaciente)
            .then((PacienteData) =>{
                if(PacienteData){
                    req.session.user= {idPaciente: PacienteData.idPaciente}
                    res.redirect("/confirmarExclusao")
                }
            })
            .catch(erro => console.log(erro))
        }
}

    deletarEmail(){
            return function(req, res){
                const consDAO= new consultorioDAO(bd)
                const email= req.body.email
                const senha= req.body.senha
                consDAO.deleteEmail(email, senha)
                .then((results) =>{
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.write('<html><body>');
                    res.write(`Dados Excluidos com Sucesso!`);
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
        
}
module.exports= CON_Cons;