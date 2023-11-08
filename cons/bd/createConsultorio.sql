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

create table cons_email(
	email varchar(30) not null,
    senha varchar(8) not null,
	tipoDeUsuario char(1) not null,
	primary key (email)
)

create table Cons_Paciente
(
	idPaciente int identity primary key not null,
	nomePaciente varchar(20) not null,
	sobrenomePac varchar(30) not null,
	CPF char(11) not null,
	telefone varchar(20) not null,
	nascimento date not null,
    email varchar(30) not null foreign key references cons_email (email)
	
	)

create table Cons_Consulta
(
	idConsulta int identity primary key not null,
	idMedico int not null foreign key references cons_Medico(idMedico),
	idPaciente int not null foreign key references cons_Paciente(idPaciente),
	dataConsulta datetime not null,
	horaInicio datetime not null,
	horaFim datetime not null,
	observacoes ntext,
	tipoConsulta varchar(30) not null,
	ativo bit not null
)

create table cons_enviarEmail(
	idEmail int identity primary key not null, 
	email varchar (30) foreign key references cons_email(email) not null,
	assunto varchar (100) null,
	texto ntext null
)