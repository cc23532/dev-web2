module.exports = (app) => 
{
const consultorioController= require("../controller/CON_Cons")
const consController= new consultorioController()

  app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.get("/login", (req, res) =>{
    console.log("Abrindo página de login...");
    res.render("login");
  });

  app.post("/verificaLogin",consController.verificaLogin()); 

  app.get("/cadastroEmail", (req, res) =>{
    console.log("Abrindo página de cadastro...");
    res.render("./formCadastros/cadastroEmail");
  });

  app.post("/inclusaoNovoEmail",consController.incluiCadastroEmail()); 

  app.get("/cadastroDadosPaciente", (req, res) =>{
    console.log("Abrindo página de cadastro...");
    const email = req.query.email;
    res.render('./formCadastros/cadastroPaciente', { email });
  });

  app.post("/inclusaoNovoPaciente",consController.incluiCadastroPaciente()); 

  app.get("/cadastroDadosMedico", (req, res) =>{
    console.log("Abrindo página de cadastro...");
    const email = req.query.email;
    res.render('./formCadastros/cadastroMedico', { email });
  });

  app.post("/inclusaoNovoMedico",consController.incluiCadastroMedico()); 

  app.get("/esqueciMinhaSenha", (req, res) =>{
    console.log("Abrindo página de redefinição de senha...");
    res.render("./esqueciSenha/esqueciMinhaSenha");
  });

  app.post("/verificaEsqSenha", consController.verificaEsqSenha());

  app.get("/redefinirSenha", (req, res) =>{
    console.log("Registro encontrado");
    const email = req.query.email;
    res.render('./esqueciSenha/redefinirSenha', { email });
  });

  app.post("/updateSenha", consController.redefineSenha());

  app.get("/homeMedico", (req, res) => {
      if (req.session.user) {
          const nomeMedico = req.session.user.nomeMedico;
          const idMedico = req.session.user.idMedico;
          console.log("Abrindo página principal...");
          res.render('./homeMedico/homeMedico', { nomeMedico: nomeMedico, idMedico: idMedico });
      } else {
          res.send("Sessão de usuário não configurada corretamente.");
      }
  });

  app.get("/selectMedico/:idMedico", consController.selectDadosMed());

  app.get("/formAltDados", (req, res) =>{
     if (req.session.user) {
      const idMedico = req.session.user.idMedico;
      const nomeMedico = req.session.user.nomeMedico;
      const sobrenomeMed = req.session.user.sobrenomeMed;
      const especialidade = req.session.user.especialidade;
      const crm = req.session.user.crm;
      const email = req.session.user.email;
      console.log("Abrindo página de alteração de dados cadastrais...");
      console.log(req.session.user);
      res.render('./homeMedico/AltDados', {
        nomeMedico: nomeMedico,
        sobrenomeMed: sobrenomeMed,
        especialidade: especialidade,
        crm: crm,
        email: email,
        idMedico: idMedico
      });
      } else {
      res.send("Sessão de usuário não configurada corretamente.");
    }
  });

  app.post("/updateDadosMedico", consController.updateMedico());

  app.get("/selectMedicoNovaConsulta/:idMedico", consController.selectMedicoNovaConsulta());

  app.get("/novaConsulta", (req, res) =>{
    if (req.session.user) {
     const idMedico = req.session.user.idMedico;
     const nomeMedico = req.session.user.nomeMedico;
     console.log("Abrindo página de agendamento de consultas...");
     console.log(req.session.user);
     res.render('./homeMedico/novaConsulta', {
       idMedico: idMedico,
       nomeMedico: nomeMedico
     });
     } else {
     res.send("Sessão de usuário não configurada corretamente.");
   }
 })

 app.post("/agendarConsulta", consController.agendaNovaConsulta());

 app.get("/selectConsultasAtivas/:idMedico", consController.listagemConsultasAtivas());

 app.get("/alterarStatusConsulta/:idConsulta", consController.selectAlterarConsulta());

 app.post("/alteraConsulta", consController.alteraDadosConsulta());

  app.get('/debug-session', (req, res) => {
    console.log(req.session);
    res.send('Verifique o console para informações da sessão');
  });

}