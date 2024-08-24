-- FUNCTION: public.clientesincumplidores()

-- DROP FUNCTION IF EXISTS public.clientesincumplidores();
select * from cliente
select * from contrato
CREATE OR REPLACE FUNCTION public.clientesincumplidores(
	)
    RETURNS TABLE(nombre character varying(20), prim_apellido varchar(25), seg_apellido varchar(25), fecha_fin date, fecha_entrega date)
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

       SELECT cl.nombre, cl.primapellido, cl.segapellido, c.fechafin, (c.fechafin + c.diasprorroga) as fecha_entrega
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0;
$BODY$;

select clientesincumplidores()
	

-- FUNCTION: public.contratoxmarcamodelo(text, text)

-- DROP FUNCTION IF EXISTS public.contratoxmarcamodelo(text, text);
select * from moto inner join contrato on moto.matricula = contrato.matricula

select * from formapago
update formapago set formapago = 'Efectivo' where formapago = 'efectivo';
CREATE OR REPLACE FUNCTION public.contratoxmarcamodelo()
    RETURNS TABLE(marca character varying(25) ,modelo character varying(25), cant_motos int, ingresos_tarjeta float, ingresos_cheque float, ingresos_efectivo float, ingresos_marca float, total_ingresos float)
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
   
       SELECT cm.marca, cm.modelo, count(cm.modelo, cm.marca) as cant_motos,
	   sum((cm.fechafin + cm.diasprorroga) - cm.fechainicio) as dias_alquilados, 
	   case when formapago = 'Tarjeta de Credito' then sum((fechafin - fechainicio) * 750 + diasprorroga * 700) else 0 end as ingresos_tarjeta,
	   case when formapago = 'Cheque' then sum((fechafin - fechainicio) * 750 + diasprorroga * 700) else 0 end as ingresos_cheque,
	   case when formapago = 'Efectivo' then sum((fechafin - fechainicio) * 750 + diasprorroga * 700) else 0 end as ingresos_efectivo,
	   sum(select ((fechafin - fechainicio) * 750 + diasprorroga * 700) from cm where cm.marca = marca) as ingresos_marca,
	   (ingresos_tarjeta + ingresos_cheque + ingresos_efectivo) as total_ingreso
        FROM (select * from moto inner join contrato on moto.matricula = contrato.matricula) as cm;
    
$BODY$;



	
    
	
	-- FUNCTION: public.situacionmoto()

-- DROP FUNCTION IF EXISTS public.situacionmoto();
select * from moto

CREATE OR REPLACE FUNCTION public.situacionmoto(
	)
   RETURNS TABLE( matricula character varying(8), marca varchar(25), situacion character varying(25), fecha_entrega date  )
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
        SELECT matricula, marca, situacion, Case 
			when situacion = 'Alquilada' then (select fechafin from contrato where contrato.matricula = moto.matricula)
			else null end as fecha_entrega
		
        FROM moto;
$BODY$;

select situacionmoto()