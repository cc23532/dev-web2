class DAO_Clientes{
    constructor(bd){
        this._bd= bd;
    }

    dadosDosClientesEJS(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM CLIENTES ORDER BY idClie';
        this._bd.query(sql,function(erro,recordset) 
        {
          if (erro) 
          {
            console.log(erro);
            return reject("Lista de Clientes FALHOU!");
          }
          resolve(recordset);
        });
      });
  }

    incluirDadosEJS(nome, cpf, data_aniversario, email) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO Clientes (nomeClie, cpfClie, dataNiverClie, emailClie) VALUES (?, ?, ?, ?)';
          this._bd.query(sql, [nome, cpf, data_aniversario, email], (erro, recordset) => {
            if (erro) {
              console.log(erro);
              return reject("Inserção de Cliente falhou");
            }
            resolve(recordset);
          });
        });
      };

      DeletarDadosEJS(idClie) {
        return new Promise((resolve, reject) => {
          const sql = 'DELETE FROM Clientes WHERE idClie=?';
          this._bd.query(sql, [idClie], (erro, recordset) => {
            if (erro) {
              console.log(erro);
              return reject("Remoção de Cliente falhou");
            }
            resolve(recordset);
          });
        });
      };

      selectDadosUp(idClie){
        return new Promise((resolve, reject) =>{
          const sql= 'SELECT * FROM Clientes WHERE idClie=?';
          this._bd.query(sql, [idClie], (erro, results) => {
            if (erro) {
              console.log(erro);
              return reject("Seleção de Cliente falhou");
            }
            resolve(results);
          });
        })
      }

      editarDadosEJS(nome, cpf, data_aniversario, email, idClie){
        return new Promise((resolve, reject) =>{
          const sql= 'UPDATE Clientes SET nomeClie=?, cpfClie=?, dataNiverClie=?, emailClie=?  WHERE idClie=?';
          this._bd.query(sql, [nome, cpf, data_aniversario, email, idClie], (erro, results) => {
            if (erro) {
              console.log(erro);
              return reject("Alteração de Cliente falhou");
            }
            if(results.affectedRows===0){
              return reject("Nenhum registro foi atualizado")
            }
            resolve(results);
          })
        })
      }

};

module.exports= DAO_Clientes;