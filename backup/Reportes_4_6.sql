-- FUNCTION: public.clientesincumplidores()

-- DROP FUNCTION IF EXISTS public.clientesincumplidores();

CREATE OR REPLACE FUNCTION public.clientesincumplidores(
	)
    RETURNS TABLE(idcliente character varying(11), diasprorroga INTEGER)
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

       SELECT c.idcliente, c.diasprorroga
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0;
$BODY$;


	

-- FUNCTION: public.contratoxmarcamodelo(text, text)

-- DROP FUNCTION IF EXISTS public.contratoxmarcamodelo(text, text);

CREATE OR REPLACE FUNCTION public.contratoxmarcamodelo(
	marca character varying(25) ,
	modelo character varying(25) )
    RETURNS TABLE(marca character varying(25) ,modelo character varying(25), matricula character varying(8))
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
   
       SELECT m.marca, m.modelo, m.matricula
        FROM moto m
        JOIN contrato c ON m.matricula = c.matricula
        WHERE m.marca = marca AND m.modelo = modelo;
    
$BODY$;



	
    
	
	-- FUNCTION: public.situacionmoto()

-- DROP FUNCTION IF EXISTS public.situacionmoto();

CREATE OR REPLACE FUNCTION public.situacionmoto(
	)
   RETURNS TABLE( matricula character varying(8),  situacion character varying(25)  )
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
        SELECT matricula, situacion
        FROM moto;
$BODY$;
