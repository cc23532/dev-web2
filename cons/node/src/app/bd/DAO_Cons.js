class DAO_Cons{
    constructor(bd){
        this._bd= bd;
    }

    cadastroEmail(email, senha, tipoDeUsuario) {
      return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Cons_Email (email, senha, tipoDeUsuario) VALUES (?, ?, ?)';
        this._bd.query(sql, [email, senha, tipoDeUsuario], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            console.log(email, senha, tipoDeUsuario)
            return reject("Falha no Cadastro de Email");
          }
          resolve(recordset);
        });
      });
    };

    cadastroPaciente(nome, sobrenome, cpf, telefone, nascimento, email) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO Cons_Paciente (nomePaciente, sobrenomePac, cpf, telefone, nascimento, email) VALUES (?, ?, ?, ?, ?, ?)';
          this._bd.query(sql, [nome, sobrenome, cpf, telefone, nascimento, email], (erro, recordset) => {
            if (erro) {
              console.log(erro);
              return reject("Falha no Cadastro do Usuário");
            }
            resolve(recordset);
          });
        });
    };

    cadastroMedico(nome, sobrenome, especialidade, CRM, email){
      return new Promise((resolve, reject) => {
        const sql= 'insert into cons_medico (nomeMedico, sobrenomeMed, especialidade, crm, email) values (?, ?, ?, ?, ?)'
        this._bd.query(sql, [nome, sobrenome, especialidade, CRM, email], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Falha no Cadastro do Usuário");
          }
          resolve(recordset);
        })
      })
    }


    login(email, senha, tipoDeUsuario){
      return new Promise((resolve, reject) => {
        const sql= 'Select email, senha, tipoDeUsuario from Cons_Email where email=? and senha=? and tipoDeUsuario=?'
        this._bd.query(sql, [email, senha, tipoDeUsuario], (erro, recordset) => {
          if(erro){
            console.log(erro)
            return reject ("Dados não correspondem com os do BD")
          }
          resolve(recordset)
          console.log("SQL executado:", sql);
          console.log("Valores da consulta:", [email, senha, tipoDeUsuario]);
          console.log("Registro do banco de dados:", recordset);
        })
      })
    }

    select_idMedico(email) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idMedico, nomeMedico FROM cons_medico WHERE email = ?';
        this._bd.query(sql, [email], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({ idMedico: recordset[0].idMedico, nomeMedico: recordset[0].nomeMedico })
          } else {
            reject("Médico não encontrado");
          }
        });
      });
    }

    select_idPaciente(email) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idPaciente, nomePaciente FROM cons_Paciente WHERE email = ?';
        this._bd.query(sql, [email], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({ idPaciente: recordset[0].idPaciente, nomePaciente: recordset[0].nomePaciente })
          } else {
            reject("Médico não encontrado");
          }
        });
      });
    }

    dadosEsqSenha(email, tipoDeUsuario){
        return new Promise((resolve, reject) => {
          const sql= 'Select email, tipoDeUsuario from Cons_Email where email=? and tipoDeUsuario=?'
          this._bd.query(sql, [email, tipoDeUsuario], (erro, recordset) => {
            if(erro){
              console.log(erro)
              return reject ("Dados não correspondem com os do BD")
            }
            resolve(recordset)
          })
        })
    }
      
    novaSenha(senha, email){
      return new Promise((resolve, reject) => {
        const sql= `update cons_email 
                    set senha=?
                    where email=?`
        this._bd.query(sql, [senha, email], (erro, results) => {
          if(erro){
            console.log(erro)
            return reject ("Não foi possível alterar a senha")
          }
          if(results.affectedRows===0){
            return reject("Nenhum registro foi atualizado")
          }
          resolve(results);
        })
      })
    }

    select_AltDadosMed(idMedico) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idMedico, nomeMedico, sobrenomeMed, especialidade, crm, email FROM cons_medico WHERE idMedico = ?';
        this._bd.query(sql, [idMedico], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({  idMedico: recordset[0].idMedico, nomeMedico: recordset[0].nomeMedico, sobrenomeMed: recordset[0].sobrenomeMed, especialidade: recordset[0].especialidade, crm: recordset[0].crm, email: recordset[0].email  })
          } else {
            reject("Médico não encontrado");
          }
        });
      });
    }

    select_AltDadosPac(idPaciente) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idPaciente, nomePaciente, sobrenomePac, CPF, telefone, email FROM cons_Paciente WHERE idPaciente = ?';
        this._bd.query(sql, [idPaciente], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({  idPaciente: recordset[0].idPaciente, nomePaciente: recordset[0].nomePaciente, sobrenomePac: recordset[0].sobrenomePac, CPF: recordset[0].CPF, telefone: recordset[0].telefone, email: recordset[0].email  })
          } else {
            reject("Paciente não encontrado");
          }
        });
      });
    }

    updateDadosMedico(nome, sobrenome, especialidade, crm, email, idMedico){
      return new Promise((resolve, reject) => {
        const sql= `update cons_medico 
                    set nomeMedico=?, sobrenomeMed=?, especialidade=?, crm=?, email=?
                    where idMedico=?`
        this._bd.query(sql, [nome, sobrenome, especialidade, crm, email, idMedico], (erro, results) => {
          if(erro){
            console.log(erro)
            return reject ("Não foi possível alterar os dados")
          }
          if(results.affectedRows===0){
            return reject("Nenhum registro foi atualizado")
          }
          resolve(results);
        })
      })
    }

    updateDadosPac(nome, sobrenome, CPF, telefone, email, idPaciente){
      return new Promise((resolve, reject) => {
        const sql= `update cons_Paciente 
                    set nomePaciente=?, sobrenomePac=?, CPF=?, telefone=?, email=?
                    where idPaciente=?`
        this._bd.query(sql, [nome, sobrenome, CPF, telefone, email, idPaciente], (erro, results) => {
          if(erro){
            console.log(erro)
            return reject ("Não foi possível alterar os dados")
          }
          if(results.affectedRows===0){
            return reject("Nenhum registro foi atualizado")
          }
          resolve(results);
        })
      })
    }

    select_novaConsulta(idMedico) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idMedico, nomeMedico FROM cons_medico WHERE idMedico = ?';
        this._bd.query(sql, [idMedico], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({ idMedico: recordset[0].idMedico, nomeMedico: recordset[0].nomeMedico })
          } else {
            reject("Médico não encontrado");
          }
        });
      });
    }

    select_PacNovaConsulta(idPaciente) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT idPaciente, nomePaciente FROM cons_Paciente WHERE idPaciente = ?';
        this._bd.query(sql, [idPaciente], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({ idPaciente: recordset[0].idPaciente, nomePaciente: recordset[0].nomePaciente })
          } else {
            reject("Paciente não encontrado");
          }
        });
      });
    }

    novaConsulta(idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta){
      return new Promise((resolve, reject) =>{
        const sql= "insert into cons_consulta (idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta, ativo) values (?, ?, ?, ?, ?, 'Agendado')"
        this._bd.query(sql, [idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Falha no Agendamento de Consulta...");
          }
          resolve(recordset);
        })
      })
    }

    select_ConsultaAtiva(idMedico){
      return new Promise((resolve, reject) => {
        const sql= "select idConsulta, idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta, ativo  from cons_consulta where idMedico=? and ativo='Agendado'"
        this._bd.query(sql, [idMedico], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          
          const consultas = recordset.map((row) => ({
            idConsulta: row.idConsulta,
            idMedico: row.idMedico,
            idPaciente: row.idPaciente,
            dataConsulta: row.dataConsulta,
            horaInicio: row.horaInicio,
            tipoConsulta: row.tipoConsulta,
            ativo: row.ativo,
          }));

          if (consultas.length > 0) {
            resolve(consultas); 
          } else {
            resolve([]);
          }
        })
      })
    }

    select_ProximasConsultas(idPaciente){
      return new Promise((resolve, reject) => {
        const sql= "select idConsulta, idMedico, idPaciente, dataConsulta, horaInicio, tipoConsulta, ativo  from cons_consulta where idPaciente=? and ativo='Agendado'"
        this._bd.query(sql, [idPaciente], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          
          const consultas = recordset.map((row) => ({
            idConsulta: row.idConsulta,
            idMedico: row.idMedico,
            idPaciente: row.idPaciente,
            dataConsulta: row.dataConsulta,
            horaInicio: row.horaInicio,
            tipoConsulta: row.tipoConsulta,
            ativo: row.ativo,
          }));

          if (consultas.length > 0) {
            resolve(consultas); 
          } else {
            resolve([]);
          }
        })
      })
    }

    select_AltConsulta(idConsulta){
      return new Promise((resolve, reject) => {
        const sql= 'select idConsulta, dataConsulta, horaInicio, tipoConsulta, ativo from cons_consulta where idConsulta=?'
        this._bd.query(sql, [idConsulta], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Falha ao selecionar Consulta...");
          }
          console.log('Resultado da consulta:', recordset);
          if (recordset.length >= 1) {
            resolve({idConsulta: recordset[0].idConsulta, idPaciente: recordset[0].idPaciente, idMedico: recordset[0].idMedico, dataConsulta: recordset[0].dataConsulta, horaInicio: recordset[0].horaInicio, tipoConsulta: recordset[0].tipoConsulta, ativo: recordset[0].ativo })
          } else {
            reject("Médico não encontrado");
          }        
        })
      })
    }

    updateConsulta(observacoes, horaFim, ativo, idConsulta){
      return new Promise((resolve, reject) =>{
        const sql= `update cons_consulta
                    set observacoes=?, horaFim=?, ativo=?
                    where idConsulta=?`
        this._bd.query(sql, [observacoes, horaFim, ativo, idConsulta], (erro, results)=>{
          if(erro){
            console.log(erro)
            return reject ("Nao foi possivel alterar o status")
          }
          if(results.affectedRows===0){
            return reject("Nenhum registro foi atualizado")
          }
          resolve(results);
        })
      })
    }

    updateCancelarConsulta(ativo, idConsulta){
      return new Promise((resolve, reject) =>{
        const sql= `update cons_consulta
                    set ativo=?
                    where idConsulta=?`
        this._bd.query(sql, [ativo, idConsulta], (erro, results)=>{
          if(erro){
            console.log(erro)
            return reject ("Nao foi possivel cancelar a consulta")
          }
          if(results.affectedRows===0){
            return reject("Nenhum registro foi atualizado")
          }
          resolve(results);
        })
      })
    }

    selectPacientes(){
      return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM cons_paciente ORDER BY idPaciente';
          this._bd.query(sql,function(erro,recordset) 
          {
            if (erro) 
            {
              console.log(erro);
              return reject("Lista de Pacientes FALHOU!");
            }
            resolve(recordset);
          });
        });
    }

    selectMedicos(){
      return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM cons_Medico ORDER BY idMedico';
          this._bd.query(sql,function(erro, recordset) 
          {
            if (erro) 
            {
              console.log(erro);
              return reject("Lista de Medicos FALHOU!");
            }
            resolve(recordset);
          });
        });
    }

  deleteMedico(idMedico){
      return new Promise((resolve, reject) =>{
        const desativaFK= 'SET foreign_key_checks = 0;'
        const sql= `delete from cons_medico where idMedico=?;`
        const ativaFK= 'SET foreign_key_checks = 1;'
        this._bd.query(desativaFK, (erroSetCheck) => {
          if (erroSetCheck) {
            console.log(erroSetCheck);
            return reject('Erro ao desativar verificação de chaves estrangeiras');
          }

        this._bd.query(sql, [idMedico], (erroDeleteMedico, resultDeleteMedico)=>{
          if(erroDeleteMedico){
            console.log(erroDeleteMedico)
            return reject ("Nao foi possivel excluir usuario")
          }
          
           this._bd.query(ativaFK, (erroSetActive) => {
            if (erroSetActive) {
              console.log(erroSetActive);
              return reject('Erro ao reativar verificação de chaves estrangeiras');
            }

            if (resultDeleteMedico.affectedRows === 0) {
              return reject('Nenhum registro foi excluído em cons_medico');
            }

            resolve('Registro excluído com sucesso');
          });
        });
      });
    });
  };

  deletePaciente(idPaciente){
    return new Promise((resolve, reject) =>{
      const desativaFK= 'SET foreign_key_checks = 0;'
      const sql= `delete from cons_Paciente where idPaciente=?;`
      const ativaFK= 'SET foreign_key_checks = 1;'
      this._bd.query(desativaFK, (erroSetCheck) => {
        if (erroSetCheck) {
          console.log(erroSetCheck);
          return reject('Erro ao desativar verificação de chaves estrangeiras');
        }

      this._bd.query(sql, [idPaciente], (erroDeletePaciente, resultDeletePaciente)=>{
        if(erroDeletePaciente){
          console.log(erroDeletePaciente)
          return reject ("Nao foi possivel excluir usuario")
        }
        
         this._bd.query(ativaFK, (erroSetActive) => {
          if (erroSetActive) {
            console.log(erroSetActive);
            return reject('Erro ao reativar verificação de chaves estrangeiras');
          }

          if (resultDeletePaciente.affectedRows === 0) {
            return reject('Nenhum registro foi excluído em cons_Paciente');
          }

          resolve('Registro excluído com sucesso');
        });
      });
    });
  });
};

  deleteEmail(email, senha) {
    return new Promise((resolve, reject) => {
      const desativaFK = 'SET foreign_key_checks = 0;';
      const sql = `DELETE FROM cons_email WHERE email=? AND senha=?;`;
      const ativaFK = 'SET foreign_key_checks = 1;';
  
      this._bd.query(desativaFK, (erroSetCheck) => {
        if (erroSetCheck) {
          console.log(erroSetCheck);
          reject('Erro ao desativar verificação de chaves estrangeiras');
        }
        console.log(email)
        console.log(senha)
        this._bd.query(sql, [email, senha], (erroDeleteEmail, resultDeleteEmail) => {
          if (erroDeleteEmail) {
            console.log(erroDeleteEmail);
            reject('Nao foi possivel excluir usuario');
          }
          console.log(resultDeleteEmail); // Adicione esta linha para verificar o resultado

  
          this._bd.query(ativaFK, (erroSetActive) => {
            if (erroSetActive) {
              console.log(erroSetActive);
              reject('Erro ao reativar verificação de chaves estrangeiras');
            }
  
            if (resultDeleteEmail.affectedRows === 0) {
              reject('Nenhum registro foi excluido em cons_Email');
            }
  
            resolve('Registro excluído com sucesso');
          });
        });
      });
    });
  }
  
}
module.exports= DAO_Cons;


