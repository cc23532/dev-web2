README_Final

	- ATUALIZAÇÕES:
		- Acesso à Caixa de Entrada e de Emails Enviados para MÉDICOS e PACIENTES;

	-Novas funcionalidades:
		-Envio de Emails:
			-MÉDICO: Ao agendar uma nova consulta, será redirecionado p/ uma página com os dados da consulta carregados no 				corpo do Email;
			-PACIENTE: Ao solicitar uma nova consulta, será redirecionado p/ uma página com os dados da consulta carregados no 			corpo do Email;
	
	-TODAS as funções de MÉDICO e PACIENTE já disponíveis;

	-Trabalho FINALIZADO;

__________________________________________________________________________________________________________________________________________
README_17-11-23

	- ATUALIZAÇÕES:
		- Função EXCLUIR CONTA para HOME MEDICO já disponível;

	-Novas funcionalidades:
		-Home Paciente:
			-Crie um registro como paciente e faça login para ter acesso à experiência;

	- TODAS as FUNÇÕES em home PACIENTE já disponíveis;

	- O QUE FALTA:
		-Envio de email após agendamento de consulta

__________________________________________________________________________________________________________________________________________
README_10-11-23

	- ATUALIZAÇÕES:
		- Script de criação de tabelas ATUALIZADO;
		-  MER ATUALIZADO;

	- Para iniciar o programa, utilizar localhost:3000/login;

	- Ao fazer o registro, selecione o tipoDeUsuario no email como MÉDICO para ter acesso às funções principais
		- Se fizer login como paciente, será redirecionado para uma página em construção;

	- Se de repente o nome exibido na /homeMedico sumir, terá que fazer login novamente pois os dados de sessão foram perdidos
		- Isso acontece principalmente se der F5 após consultar a listagem de consultas ativas ou listagem de pacientes;
		- Se utilizar Alt + (Seta p/ Esquerda) para voltar às páginas a chance disso acontecer é menor;
	
	-Funcionalidades Disponíveis na página de Login:
		- Registro de Email;
		- Registro de Médico;
		- Registro de Paciente;
		- Redefinição de Senha do email;

	- Funcionalidades Disponíveis para login em MÉDICO:
		- Consultas > Consultas Ativas > Alterar;
		- Consultas > Agendar Nova Consulta (SEM ENVIO DE EMAIL);
		- Pacientes > Listagem de Pacientes;
		- Dados Cadastrais > Alterar Dados;