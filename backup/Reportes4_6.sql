-- FUNCTION: public.SituacionMoto()

-- DROP FUNCTION IF EXISTS public.SituacionMoto();

CREATE OR REPLACE FUNCTION SituacionMoto()
RETURNS json
LANGUAGE sql
AS $$
    SELECT json_agg(row_to_json(t))
    FROM (
        SELECT matricula, situacion
        FROM moto
    ) AS t;
$$;


-- FUNCTION: public.clientesIncumplidores()

-- DROP FUNCTION IF EXISTS public.clientesIncumplidores();

CREATE OR REPLACE FUNCTION clientesIncumplidores()
RETURNS json
LANGUAGE sql
AS $$
    SELECT json_agg(row_to_json(t))
    FROM (
       SELECT c.idcliente, c.diasprorroga
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0
    ) AS t;
$$;


-- FUNCTION: public.contratoXmarcamodelo()

-- DROP FUNCTION IF EXISTS public.contratoXmarcamodelo();

CREATE OR REPLACE FUNCTION contratoXmarcamodelo(marca TEXT, modelo TEXT)
RETURNS json
LANGUAGE sql
AS $$
    SELECT json_agg(row_to_json(t))
    FROM (
       SELECT m.marca, m.modelo, m.matricula
        FROM moto m
        JOIN contrato c ON m.matricula = c.matricula
        WHERE m.marca = marca AND m.modelo = modelo
    ) AS t;
$$;




