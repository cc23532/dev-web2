module.exports = (app) => 
{
const consultorioController= require("../controller/CON_Cons")
const consController= new consultorioController()

  app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.get("/login", (req, res) =>{
    console.log("Abrindo página de login...")
    res.render("login")
  })

  app.get("/cadastroEmail", (req, res) =>{
    console.log("Abrindo página de cadastro...")
    res.render("cadastroEmail")
  })

  app.get("/cadastroDadosPaciente", (req, res) =>{
    console.log("Abrindo página de cadastro...")
    const email = req.query.email;
    res.render('cadastroPaciente', { email });
  })

  app.get("/esqueciMinhaSenha", (req, res) =>{
    console.log("Abrindo página de redefinição de senha...")
    res.render("esqueciMinhaSenha")
  })

  app.get("/redefinirSenha", (req, res) =>{
    console.log("Registro encontrado")
    const email = req.query.email;
    res.render('redefinirSenha', { email });
  })

  app.post("/verificaLogin",consController.verificaLogin());
  app.post("/inclusaoNovoEmail",consController.incluiCadastroEmail());
  app.post("/inclusaoNovoPaciente",consController.incluiCadastroPaciente());
  app.post("/verificaEsqSenha", consController.verificaEsqSenha())
  app.post("/updateSenha", consController.redefineSenha())

}