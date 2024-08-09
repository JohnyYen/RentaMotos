select * from contrato;
select * from moto;
select * from cliente;
select * from formapago;
select * from situacion
insert into contrato values ('94081208314', 'LH 00538', '2024-05-10', '2024-07-10', '2023-02-1','Cheque' ,false, 3);

delete from contrato where fechafirma = '2023-02-01';

-- insert into moto values ('LH 60126','Negro', 20.00, 'Yamaha', 'XSR900', 'Disponible')
-- select * from moto;

-- Trigger: Despues que se realice una insercion en la tabla de Contratos, actualiza la tabla
-- de motos

-- create or replace function changeSituation() returns trigger as
-- $$
-- BEGIN
-- 	update moto set situacion = 'Alquilada' where Moto.matricula = NEW.matricula;
-- 	return NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- create trigger tg_changeSituation before insert on contrato for each row execute function changeSituation();


-- Trigger: Verificar que la moto a alquilar este disponible

-- create or replace function validateSituation() returns trigger as
-- $$
-- DECLARE
-- m record;
-- BEGIN
-- 	select * into m from Moto where matricula = NEW.matricula;
-- 	if m.situacion <> 'Disponible' then
-- 		raise exception 'La moto no esta disponible';
-- 	end if;

-- 	return NEW;
-- END;
-- $$ LANGUAGE plpgsql;
 
--  create trigger tg_validateSituation after insert on contrato for each row execute procedure validateSituation()
-- create table tipo_usuario(
-- 	id serial primary key,
-- 	tipo_usuario varchar not null
-- );

-- select ('2024-10-6'::date - '2024-10-5'::date) as rightNow

-- create table usuario(
-- 	id_usuario serial primary key,
-- 	nombre_user varchar not null,
-- 	contrasenia varchar not null,
-- 	id serial not null,
-- 	foreign key(id) references tipo_usuario(id)
-- )




-- create or replace function getContratoById(id varchar) returns void as
-- $$
--  select * from contrato	inner join cliente on contrato.idcliente = cliente.idcliente
--  where cliente.idcliente = id;
-- $$
-- LANGUAGE SQL

-- Funcion para calcular el importe total de un cliente
-- create or replace function calculateImporte(id varchar, tar float, tarEspecial float) returns float as
-- $$
-- DECLARE
-- importeTotal float;
-- BEGIN
-- 	select (((fechafin - fechainicio) * tar) + (diasprorroga * tarEspecial)) into importeTotal from Cliente inner join Contrato on
-- 	Cliente.idcliente = Contrato.idcliente where Cliente.idcliente = id;
-- 	return importeTotal;
-- END;
-- $$ LANGUAGE plpgsql;

-- Funcion para contar la cantidad de contratos que tenia un cliente
-- create or replace function countContratos(id varchar) returns integer as
-- $$
-- DECLARE
-- count integer;
-- BEGIN

-- 	select count(*) into count from contrato 
-- 								inner join cliente on contrato.idcliente = cliente.idcliente where Cliente.idcliente = id;
-- 	return count;
-- END;
-- $$ LANGUAGE plpgsql

-- Reporte 1
select Cliente.nombre, idcliente, countContratos(idcliente) as cant_contratos,
							sum(calculateImporte(idcliente, 750, 300)) as valor_alquileres
							from Cliente where Cliente.municipio = 'Vedado' group by nombre, idcliente;
							
-- Reporte 2
select matricula, marca, modelo,color, cantkm from Moto;


-- Reporte 3
select nombre, Moto.matricula, Modelo, Marca, formapago, fechainicio,
fechafin, diasprorroga, seguro, ((diasprorroga * 300) + (fechafin - fechainicio) * 750) as importe
from ((Cliente inner join Contrato on Cliente.idcliente = Contrato.idcliente)
as tabl inner join Moto on tabl.matricula = Moto.matricula);
							
							