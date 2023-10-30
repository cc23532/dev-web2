const bd = require("../../config/database");
const clientesDAO = require("../bd/DAO_Clientes");

class CON_clientes 
{

  exibeDadosClientesEJS() 
  {
    return function(req,res) {
        const cliDAO = new clientesDAO(bd);
        cliDAO.dadosDosClientesEJS()
          .then((resultados) => {
             console.log(resultados);
             res.render('../views/listagemClientes', { clientes: resultados});
          })
          .catch(erro => console.log(erro));
    }
  };
  
  executaIncluirEJS() 
  {
    return function(req,res) {
      const cliDAO = new clientesDAO(bd);
      const { nome, cpf, data_aniversario, email } = req.body;

      cliDAO.incluirDadosEJS(nome, cpf, data_aniversario, email)
        .then(() => {
          console.log("O registro foi inserido com sucesso");
          res.writeHead(200, {'Content-Type':'text/html'});
          res.write('<html><body>');
          res.write('<p>O registro foi inserido com sucesso</p>');
          res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
          res.end ('</body></html>');
        })
        .catch((erro) => {
          console.log(erro);
          res.writeHead(200, {'Content-Type':'text/html'});
          res.write('<html><body>');
          res.write('<p>Falha ao Inserir os Dados</p>');
          res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
          res.end ('</body></html>');
        });
      };
    };

    executaDeletarEJS() 
    {
      return function(req,res) {
        const cliDAO = new clientesDAO(bd);
        const idClie = req.params.idClie;
  
        cliDAO.DeletarDadosEJS(idClie)
          .then(() => {
            console.log("O registro foi deletado com sucesso");
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<html><body>');
            res.write('<p>O registro foi deletado com sucesso</p>');
            res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
            res.end ('</body></html>');
            })
          .catch((erro) => {
            console.log(erro);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<html><body>');
            res.write('<p>Falha ao Deletar os Dados</p>');
            res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
            res.end ('</body></html>');
            });
        };
      };

      selectUpdateEJS(){
        return function(req,res) {
          const cliDAO = new clientesDAO(bd);
          const idClie = req.params.idClie;
          cliDAO.selectDadosUp(idClie)
            .then((resultados) => {
               console.log(resultados);
               res.render('../views/formUpdate', { clientes: resultados});
            })
            .catch(erro => console.log(erro));
          }
      }

      executaUpdateEJS(){
        return function (req, res) {
          const cliDAO = new clientesDAO(bd);
          const idClie = req.params.idClie;
          const { nome, cpf, data_aniversario, email } = req.body;
          cliDAO.editarDadosEJS(nome, cpf, data_aniversario, email, idClie)
          .then((results) => {
            console.log(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<html><body>');
            res.write(`Dados Alterados com Sucesso!${results.affectedRows} Registro(s) atualizado(s)!`);
            res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
            res.end ('</body></html>');
          })
          .catch((erro) => {
            console.log(erro);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<html><body>');
            res.write('<p>Falha ao Editar os Dados</p>');
            res.write('<a href="/vitrine" class="btn btn-primary">Ir para VITRINE</a>')
            res.end ('</body></html>');
          });
        }
      }

  } // end da classe

module.exports = CON_clientes;

