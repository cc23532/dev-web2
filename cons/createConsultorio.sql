create schema Cons
create table Cons.Medico
(
	idMedico int identity primary key not null,
	nomeMedico varchar(20) not null,
	sobrenomeMed varchar(30) not null,
	especialidade varchar(30) not null,
	crm varchar(10) not null
)

create table Cons.Paciente
(
	idPaciente int identity primary key not null,
	nomePaciente varchar(20) not null,
	sobrenomePac varchar(30) not null,
	CPF char(11) not null,
	telefone varchar(20) not null,
	nascimento date not null,
    email varchar(30) not null,
    senha varchar(8) not null
)

create table Cons.Consulta
(
	idConsulta int identity primary key not null,
	idMedico int not null foreign key references cons.Medico(idMedico),
	idPaciente int not null foreign key references cons.Paciente(idPaciente),
	dataConsulta datetime not null,
	horaInicio datetime not null,
	horaFim datetime not null,
	observacoes ntext,
	tipoConsulta varchar(30) not null,
	ativo bit not null
)
