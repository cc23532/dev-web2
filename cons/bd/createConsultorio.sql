create table cons_email(
	email varchar(30) not null,
    senha varchar(8) not null,
	tipoDeUsuario char(1) not null,
	primary key (email)
)

create table Cons_Medico
(
	idMedico int AUTO_INCREMENT primary key not null,
	nomeMedico varchar(20) not null,
	sobrenomeMed varchar(30) not null,
	especialidade varchar(30) not null,
	crm varchar(10) not null,
	email varchar (30) not null,
    FOREIGN key (email) REFERENCES cons_email (email)
)

create table Cons_Paciente
(
	idPaciente int AUTO_INCREMENT primary key not null,
	nomePaciente varchar(20) not null,
	sobrenomePac varchar(30) not null,
	CPF varchar(11) not null unique,
	telefone varchar(20) not null,
	nascimento date not null,
    email varchar(30) not null,
	FOREIGN key (email) REFERENCES cons_email (email)
	)

create table Cons_Consulta
(
	idConsulta int AUTO_INCREMENT primary key not null,
	idMedico int not null,
	idPaciente int not null,
	dataConsulta date not null,
	horaInicio time not null,
	horaFim time null,
	observacoes text null,
	tipoConsulta varchar(30) not null,
	ativo varchar(15) not null,
	foreign key (idPaciente) references cons_Paciente(idPaciente),
	foreign key (idMedico) references cons_Medico(idMedico)
)

create table cons_enviarEmail(
	idEmail int AUTO_INCREMENT primary key not null, 
	destinatario varchar (30) not null,
	remetente varchar (30) not null,
	assunto varchar (100) null,
	corpoEmail text null,
	foreign key (email) references cons_email(email) 
)