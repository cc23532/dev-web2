class DAO_Cons{
    constructor(bd){
        this._bd= bd;
    }

    login(email, senha){
      return new Promise((resolve, reject) => {
        const sql= 'Select email, senha from Cons_Email where email=? and senha=?'
        this._bd.query(sql, [email, senha], (erro, recordset) => {
          if(erro){
            console.log(erro)
            return reject ("Dados não correspondem com os do BD")
          }
          resolve(recordset)
        })
      })
    }

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
      
    novaSenha(email, senha){
      return new Promise((resolve, reject) => {
        const sql= `update cons_email 
                    set senha=?
                    where email=?`
        this._bd.query(sql, [email, senha], (erro, recordset) => {
          if(erro){
            console.log(erro)
            return reject ("Não foi possível alterar a senha")
          }
          resolve(recordset)
        })
      })
    }
}

module.exports= DAO_Cons;