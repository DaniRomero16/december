DROP DATABASE IF EXISTS elecciones;
CREATE DATABASE elecciones;
USE elecciones;

CREATE TABLE candidatura (
    candidatura_id int not null auto_increment,
    nombre VARCHAR(50) NOT NULL,
    programa VARCHAR(200) NOT NULL,
    PRIMARY KEY(candidatura_id)
);

CREATE TABLE votante (
    votante_id varchar(9) unique NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    firma_digital varchar(10) not null,
    apellido1 VARCHAR(35) NOT NULL,
    apellido2 VARCHAR(35) NULL,
    voto_parlamento int,
    voto_senado int,
    PRIMARY KEY(votante_id),
    FOREIGN KEY voto_parlamento_fk(voto_parlamento) REFERENCES candidatura(candidatura_id),
    FOREIGN KEY voto_senado_fk(voto_senado) REFERENCES candidatura(candidatura_id)
);


CREATE TABLE politico (
    politico_id varchar(9) unique NOT NULL,
    candidatura int not null,
    PRIMARY KEY(politico_id),
    FOREIGN KEY politico_votante_fk(politico_id) REFERENCES votante(votante_id),
    FOREIGN KEY politico_candidatura_fk(candidatura) REFERENCES candidatura(candidatura_id)
);

create table colegio (
	colegio_id int not null auto_increment,
    direccion varchar(200) not null,
    poblacion varchar(50) not null,
    provincia varchar(50) not null,
    postal varchar(50) not null,
    PRIMARY KEY(colegio_id)
);

CREATE TABLE mesaElectoral (
	mesa_id int not null auto_increment,
    colegio int not null,
    numero int not null,
    PRIMARY KEY(mesa_id),
    FOREIGN KEY mesa_colegio_fk(colegio) REFERENCES colegio(colegio_id)
);

create table puestoMesa (
	votante varchar(9) unique not null,
    mesa int not null,
    puesto varchar(20)  not null,
    primary key(votante),
    FOREIGN KEY puesto_votante_fk(votante) REFERENCES votante(votante_id),
    FOREIGN KEY puesto_mesa_fk(mesa) REFERENCES mesaElectoral(mesa_id)
);



