module.exports = (app) => 
{
  app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const clientesController = require("../controllers/CON_Clientes");
  const cliController = new clientesController();

  app.get("/formularioInclusaoNovoCliente", (req,res) => {
    console.log("Abrindo Formulário...");
    res.render("clientes");
  });


  app.get("/vitrine",cliController.exibeDadosClientesEJS());
  app.post("/inclusaoNovoCliente",cliController.executaIncluirEJS());
  app.get("/exclusaoCliente/:idClie",cliController.executaDeletarEJS());
  app.get("/updateCliente/:idClie",cliController.selectUpdateEJS());
  app.post("/salvarEdicaoCliente",cliController.executaUpdateEJS());



} 
