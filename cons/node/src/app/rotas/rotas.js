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

  app.get("/homePac", (req, res) => {
    if (req.session.user) {
        const nomePaciente = req.session.user.nomePaciente;
        const idPaciente = req.session.user.idPaciente;
        console.log("Abrindo página principal...");
        res.render('./homePac/homePac', { nomePaciente: nomePaciente, idPaciente: idPaciente });
    } else {
        res.send("Sessão de usuário não configurada corretamente.");
    }
});

  app.get("/selectMedico/:idMedico", consController.selectDadosMed());

  app.get("/selectPaciente/:idPaciente", consController.selectDadosPac());


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

  app.get("/formAltDadosPac", (req, res) =>{
    if (req.session.user) {
     const idPaciente = req.session.user.idPaciente;
     const nomePaciente = req.session.user.nomePaciente;
     const sobrenomePac = req.session.user.sobrenomePac;
     const CPF = req.session.user.CPF;
     const telefone = req.session.user.telefone;
     const email = req.session.user.email;
     console.log("Abrindo página de alteração de dados cadastrais...");
     console.log(req.session.user);
     res.render('./homePac/AltDadosPac', {
       nomePaciente: nomePaciente,
       sobrenomePac: sobrenomePac,
       CPF: CPF,
       telefone: telefone,
       email: email,
       idPaciente: idPaciente
     });
     } else {
     res.send("Sessão de usuário não configurada corretamente.");
   }
 });

  app.post("/updateDadosMedico", consController.updateMedico());

  app.post("/updateDadosPac", consController.updatePac());

  app.get("/selectMedicoNovaConsulta/:idMedico", consController.selectMedicoNovaConsulta());

  app.get("/selectPacNovaConsulta/:idPaciente", consController.selectPacNovaConsulta());


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
 
  app.get("/SolicitarNovaConsulta", (req, res) =>{
    if (req.session.user) {
    const idPaciente = req.session.user.idPaciente;
    const nomePaciente = req.session.user.nomePaciente;
    console.log("Abrindo página de agendamento de consultas...");
    console.log(req.session.user);
    res.render('./homePac/solicitaConsulta', {
      idPaciente: idPaciente,
      nomePaciente: nomePaciente
    });
    } else {
    res.send("Sessão de usuário não configurada corretamente.");
    }
  })

 app.post("/agendarConsulta", consController.agendaNovaConsulta());

 app.post("/solicitarConsulta", consController.solicitaNovaConsulta());

 app.get("/selectConsultasAtivas/:idMedico", consController.listagemConsultasAtivas());

 app.get("/selectProximasConsultas/:idPaciente", consController.listagemProximasConsultasPac());

 app.get("/alterarStatusConsulta/:idConsulta", consController.selectAlterarConsulta());

 app.get("/cancelarConsulta/:idConsulta", consController.selectCancelarConsulta());

 app.post("/alteraConsulta", consController.alteraDadosConsulta());

 app.post("/confirmaCancelarConsulta", consController.confirmaCancelarConsulta());

 app.get("/listagemPacientes", consController.listagemPacientes());

 app.get("/listagemMedicos", consController.listagemMedicos());

 app.get("/deletarMedico/:idMedico", consController.deletarMedico());

 app.get("/deletarPaciente/:idPaciente", consController.deletarPaciente());

 app.get("/confirmarExclusao", (req,res) =>{
  res.render("./formCadastros/DeleteEmail")
  console.log("Confirme a exclusão de usuário")
 })

 app.post("/deleteEmail", consController.deletarEmail())

 app.post("/enviarEmail", consController.enviaEmail())

 app.get("/med_cxEntrada/:idMedico", consController.cxEntradaMed());

 app.get("/med_enviados/:idMedico", consController.enviadosMed());

 app.get("/pac_cxEntrada/:idPaciente", consController.cxEntradaPac());

 app.get("/pac_enviados/:idPaciente", consController.enviadosPac());

 app.get("/exibicao/:idEmail", consController.exibeEmail());


}
