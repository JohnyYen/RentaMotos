select * from tipo_usuario
insert into tipo_usuario (tipo_usuario )values ('Trabajador')
select * from usuario
select * from cliente
select nombre_usuario, contrasenia, email, tipo_usuario.tipo_usuario from (usuario inner join tipo_usuario on usuario.tipo_usuario = tipo_usuario.id)
where (nombre_usuario = 'JoseAdmin' or email = 'sdsd') and contrasenia = '0432';

create or replace view usuario_view as select nombre_usuario, contrasenia, email, tipo_usuario.tipo_usuario from (usuario inner join tipo_usuario on usuario.tipo_usuario = tipo_usuario.id)

select * from usuario_view where (nombre_usuario = 'JoseAdmin' or email = 'sdsd') and contrasenia = '0432';

insert into usuario (nombre_usuario, contrasenia, tipo_usuario) values ('JoseAdmin', '0432', 1)
create table usuario(
	nombre_usuario varchar(30) primary key,
	contrasenia varchar(8) not null,
	email varchar(50),
	tipo_usuario integer not null,
	foreign key(tipo_usuario) references tipo_usuario(id),
	id_cliente varchar(11),
	foreign key(id_cliente) references cliente(idcliente)
)