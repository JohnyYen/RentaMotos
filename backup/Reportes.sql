select * from contrato;
select * from moto;
select * from marca
select * from modelo
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
select * from contrato

select ('2024-05-10'::date - '2024-01-10'::date) * 750
-- Reporte 1
select * from cliente inner join contrato on Cliente.idcliente = contrato.idcliente
create or replace view cliente_view as select Cliente.Municipio, Cliente.idCliente, Cliente.nombre, count(Contrato.matricula) as cant_alquileres,
case when count(Contrato.matricula) <> 0 then sum(((fechafin - fechainicio) * 750) + (diasprorroga * 300)) 
else 0 end as valor_total from
(Cliente left join Contrato on Cliente.idcliente = Contrato.idCliente)
Group by Cliente.municipio, nombre, Cliente.idcliente
order by Cliente.Municipio asc

drop view cliente_view

select * from cliente_view

select Cliente.nombre, idcliente, countContratos(idcliente) as cant_contratos,
							sum(calculateImporte(idcliente, 750, 300)) as valor_alquileres
							from Cliente group by nombre, idcliente where Cliente.municipio = 'Vedado' ;
	
create or replace view getClientes as select Cliente.nombre, idcliente, countContratos(idcliente) as cant_contratos,
							sum(calculateImporte(idcliente, 750, 300)) as valor_alquileres
							from Cliente group by nombre, idcliente ;
							
select * from getClientes where municipio = 'Vedado';
-- Reporte 2
create or replace view moto_view as select matricula, marca, modelo,color, cantkm from Moto;

select * from moto_view
-- Reporte 3
create or replace view contrato_view as select nombre, Moto.matricula, Modelo, Marca, formapago, fechainicio,
fechafin, diasprorroga, seguro, ((diasprorroga * 300) + (fechafin - fechainicio) * 750) as importe
from ((Cliente inner join Contrato on Cliente.idcliente = Contrato.idcliente)
as tabl inner join Moto on tabl.matricula = Moto.matricula);
							
-- Reporte #7
-- select CURRENT_DATE, municipio.nommun, moto.marca, moto.modelo, 
-- sum(contrato.fechafin - contrato.fechainicio) as diasalquilados, 
-- sum(contrato.diasprorroga) as diasprorroga,
-- case
-- 	when contrato.formapago = 'efectivo' then sum(contrato.diasprorroga * 300 + (contrato.fechafin - contrato.fechainicio) * 750)
-- 	else 0
-- end as valor_efectivo,
-- sum(contrato.diasprorroga * 300 + (contrato.fechafin - contrato.fechainicio) * 750) as valor_general
-- from contrato inner join cliente on cliente.idcliente = contrato.idcliente
-- inner join municipio on municipio.nommun = cliente.municipio
-- inner join moto on contrato.matricula = moto.matricula
-- group by municipio.nommun, moto.marca, moto.modelo, contrato.formapago

-- Trigger para eliminar todos los contratos de un cliente despues de ser borrado de la lista de clientes
-- create or replace function deleteContratosCliente() returns trigger as
-- $$
-- begin
-- 	delete from contrato where contrato.idcliente = OLD.idcliente;
-- end
-- $$
-- language 'plpgsql';

-- create trigger tg_deleteContratosCliente after delete on cliente for each row execute function deleteContratosCliente()
-- drop trigger tg_deleteContratosCliente


select * from contrato

create or replace view contrato_cliente_view as select Contrato.matricula, Contrato.fechainicio, Contrato.fechafin,
Contrato.formapago, Contrato.seguro, Contrato.diasprorroga from Contrato

drop view contrato_cliente_view;