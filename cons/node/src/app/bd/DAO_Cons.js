class DAO_Cons{
    constructor(bd){
        this._bd= bd;
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

    updateDadosMedico(nome, sobrenome, especialidade, crm, email, idMedico){
      return new Promise((resolve, reject) => {
        const sql= `update cons_medico 
                    set nomeMedico=?, sobrenomeMed=?, especialidade=?, crm=?, email=?
                    where idMedico=?`
        this._bd.query(sql, [nome, sobrenome, especialidade, crm, email, idMedico], (erro, results) => {
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
            return reject ("Não foi possível alterar a senha")
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
}



module.exports= DAO_Cons;