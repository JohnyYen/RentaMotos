PGDMP     &                    |        
   RentaMotos    15.1    15.1 S    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24731 
   RentaMotos    DATABASE     ~   CREATE DATABASE "RentaMotos" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Cuba.1252';
    DROP DATABASE "RentaMotos";
                postgres    false                        3079    24757 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1255    41934 G   calculateimporte(character varying, double precision, double precision)    FUNCTION     �  CREATE FUNCTION public.calculateimporte(id character varying, tar double precision, tarespecial double precision) RETURNS double precision
    LANGUAGE plpgsql
    AS $$
DECLARE
importeTotal float;
BEGIN
	select (((fechafin - fechainicio) * tar) + (diasprorroga * tarEspecial)) into importeTotal from Cliente inner join Contrato on
	Cliente.idcliente = Contrato.idcliente where Cliente.idcliente = id;
	return importeTotal;
END;
$$;
 q   DROP FUNCTION public.calculateimporte(id character varying, tar double precision, tarespecial double precision);
       public          postgres    false            �            1255    41939    changesituation()    FUNCTION     �   CREATE FUNCTION public.changesituation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	update moto set situacion = 'Alquilada' where Moto.matricula = NEW.matricula;
	return NEW;
END;
$$;
 (   DROP FUNCTION public.changesituation();
       public          postgres    false                       1255    42109    clientesincumplidores()    FUNCTION     �  CREATE FUNCTION public.clientesincumplidores() RETURNS TABLE(nomvre character varying, prim_apellido character varying, seg_apellido character varying, fecha_fin date, fecha_entrega date)
    LANGUAGE sql
    AS $$

       SELECT cl.nombre, cl.primapellido, cl.segapellido, c.fechafin, (c.fechafin + Concat(c.diasprorroga, 'day')::interval) as fecha_entrega
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0;
$$;
 .   DROP FUNCTION public.clientesincumplidores();
       public          postgres    false            
           1255    42107     contratoxmarcamodelo(text, text)    FUNCTION     V  CREATE FUNCTION public.contratoxmarcamodelo(marca text, modelo text) RETURNS json
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
 D   DROP FUNCTION public.contratoxmarcamodelo(marca text, modelo text);
       public          postgres    false            �            1255    41937 !   countcontratos(character varying)    FUNCTION     /  CREATE FUNCTION public.countcontratos(id character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
count integer;
BEGIN

	select count(*) into count from contrato 
								inner join cliente on contrato.idcliente = cliente.idcliente where Cliente.idcliente = id;
	return count;
END;
$$;
 ;   DROP FUNCTION public.countcontratos(id character varying);
       public          postgres    false            �            1255    58527    deletecontract()    FUNCTION     �   CREATE FUNCTION public.deletecontract() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE moto set situacion = 'Disponible' WHERE moto.matricula = OLD.matricula;
	return OLD;
END $$;
 '   DROP FUNCTION public.deletecontract();
       public          postgres    false            �            1255    42118    deletecontratoscliente()    FUNCTION     �   CREATE FUNCTION public.deletecontratoscliente() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	delete from contrato where contrato.idcliente = OLD.idcliente;
	return OLD;
end
$$;
 /   DROP FUNCTION public.deletecontratoscliente();
       public          postgres    false            �            1255    58505    deleteuser()    FUNCTION     �   CREATE FUNCTION public.deleteuser() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM usuario WHERE id_cliente = OLD.idcliente;
	Return old;
END;
$$;
 #   DROP FUNCTION public.deleteuser();
       public          postgres    false            �            1255    41908 "   getcontratobyid(character varying)    FUNCTION     �   CREATE FUNCTION public.getcontratobyid(id character varying) RETURNS void
    LANGUAGE sql
    AS $$
 select * from contrato	inner join cliente on contrato.idcliente = cliente.idcliente
 where cliente.idcliente = id;
$$;
 <   DROP FUNCTION public.getcontratobyid(id character varying);
       public          postgres    false                       1255    42115    situacionmoto()    FUNCTION     �  CREATE FUNCTION public.situacionmoto() RETURNS TABLE(matricula character varying, marca character varying, situacion character varying, fecha_entrega date)
    LANGUAGE sql
    AS $$
        SELECT matricula, marca, situacion, Case 
			when situacion = 'Alquilada' then (select fechafin::date from contrato where contrato.matricula = moto.matricula)
			else null end as fecha_entrega
		
        FROM moto;
$$;
 &   DROP FUNCTION public.situacionmoto();
       public          postgres    false                       1255    41943    validatesituation()    FUNCTION     �  CREATE FUNCTION public.validatesituation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
m record;
BEGIN
	select * into m from Moto where matricula = NEW.matricula;
	if m is null then
		raise exception 'No existe una moto con esta matricula';
	end if;
	if m.situacion = 'Alquilada' and m.situacion = 'Taller' then
		raise exception 'La moto no esta disponible';
	end if;

	return NEW;
END;
$$;
 *   DROP FUNCTION public.validatesituation();
       public          postgres    false            �            1259    24778    cliente    TABLE     �  CREATE TABLE public.cliente (
    idcliente character varying(11) NOT NULL,
    nombre character varying(20) NOT NULL,
    segnombre character varying(20),
    primapellido character varying(25) NOT NULL,
    segapellido character varying(25) NOT NULL,
    edad integer NOT NULL,
    municipio character varying(20),
    sexo character(1) NOT NULL,
    numcont character varying(20)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    24814    contrato    TABLE     E  CREATE TABLE public.contrato (
    idcliente character varying(25) NOT NULL,
    matricula character varying(25) NOT NULL,
    fechainicio date NOT NULL,
    fechafin date NOT NULL,
    fechafirma date NOT NULL,
    formapago character varying(25) NOT NULL,
    seguro boolean,
    diasprorroga integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.contrato;
       public         heap    postgres    false            �            1259    42131    cliente_view    VIEW     E  CREATE VIEW public.cliente_view AS
 SELECT cliente.municipio,
    cliente.idcliente,
    cliente.nombre,
    count(contrato.matricula) AS cant_alquileres,
        CASE
            WHEN (count(contrato.matricula) <> 0) THEN sum((((contrato.fechafin - contrato.fechainicio) * 750) + (contrato.diasprorroga * 300)))
            ELSE (0)::bigint
        END AS valor_total
   FROM (public.cliente
     LEFT JOIN public.contrato ON (((cliente.idcliente)::text = (contrato.idcliente)::text)))
  GROUP BY cliente.municipio, cliente.nombre, cliente.idcliente
  ORDER BY cliente.municipio;
    DROP VIEW public.cliente_view;
       public          postgres    false    222    222    222    222    222    219    219    219            �            1259    24788    moto    TABLE       CREATE TABLE public.moto (
    matricula character varying(8) NOT NULL,
    color character varying(15) NOT NULL,
    cantkm double precision DEFAULT 0,
    marca character varying(25) NOT NULL,
    modelo character varying(25) NOT NULL,
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.moto;
       public         heap    postgres    false            �            1259    24732 	   municipio    TABLE     M   CREATE TABLE public.municipio (
    nommun character varying(25) NOT NULL
);
    DROP TABLE public.municipio;
       public         heap    postgres    false            �            1259    42120    cont_mun    VIEW     �  CREATE VIEW public.cont_mun AS
 SELECT municipio.nommun,
    moto.marca,
    moto.modelo,
    sum((contrato.fechafin - contrato.fechainicio)) AS diasalquilados,
    sum(contrato.diasprorroga) AS diasprorroga,
        CASE
            WHEN ((contrato.formapago)::text = 'efectivo'::text) THEN sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750)))
            ELSE (0)::bigint
        END AS valor_efectivo,
    sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))) AS valor_general
   FROM (((public.contrato
     JOIN public.cliente ON (((cliente.idcliente)::text = (contrato.idcliente)::text)))
     JOIN public.municipio ON (((municipio.nommun)::text = (cliente.municipio)::text)))
     JOIN public.moto ON (((contrato.matricula)::text = (moto.matricula)::text)))
  GROUP BY municipio.nommun, moto.marca, moto.modelo, contrato.formapago;
    DROP VIEW public.cont_mun;
       public          postgres    false    222    222    222    222    220    220    220    219    219    215    222    222            �            1259    50305    cont_mun_view    VIEW     �  CREATE VIEW public.cont_mun_view AS
 SELECT tabl.municipio,
    tabl.nombre,
    moto.matricula,
    moto.modelo,
    moto.marca,
    tabl.formapago,
    tabl.fechainicio,
    tabl.fechafin,
    tabl.diasprorroga,
    tabl.seguro,
    ((tabl.diasprorroga * 300) + ((tabl.fechafin - tabl.fechainicio) * 750)) AS importe
   FROM ((public.cliente
     JOIN public.contrato ON (((cliente.idcliente)::text = (contrato.idcliente)::text))) tabl(idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont, idcliente_1, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga)
     JOIN public.moto ON (((tabl.matricula)::text = (moto.matricula)::text)));
     DROP VIEW public.cont_mun_view;
       public          postgres    false    219    219    219    220    220    220    222    222    222    222    222    222    222            �            1259    58555    contrato_cliente_view    VIEW     �  CREATE VIEW public.contrato_cliente_view AS
 SELECT contrato.idcliente,
    contrato.matricula,
    moto.marca,
    moto.modelo,
    contrato.fechainicio,
    contrato.fechafin,
    contrato.formapago,
    contrato.seguro,
    contrato.diasprorroga,
    ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750)) AS importe
   FROM (public.contrato
     JOIN public.moto ON (((contrato.matricula)::text = (moto.matricula)::text)));
 (   DROP VIEW public.contrato_cliente_view;
       public          postgres    false    222    222    222    222    222    222    220    220    220    222            �            1259    42079    contrato_view    VIEW     �  CREATE VIEW public.contrato_view AS
 SELECT tabl.nombre,
    moto.matricula,
    moto.modelo,
    moto.marca,
    tabl.formapago,
    tabl.fechainicio,
    tabl.fechafin,
    tabl.diasprorroga,
    tabl.seguro,
    ((tabl.diasprorroga * 300) + ((tabl.fechafin - tabl.fechainicio) * 750)) AS importe
   FROM ((public.cliente
     JOIN public.contrato ON (((cliente.idcliente)::text = (contrato.idcliente)::text))) tabl(idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont, idcliente_1, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga)
     JOIN public.moto ON (((tabl.matricula)::text = (moto.matricula)::text)));
     DROP VIEW public.contrato_view;
       public          postgres    false    219    222    222    222    222    222    222    222    220    220    220    219            �            1259    24737    marca    TABLE     K   CREATE TABLE public.marca (
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    24747    modelo    TABLE     z   CREATE TABLE public.modelo (
    nommodelo character varying(25) NOT NULL,
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    58492    contratoxmarca_modelo    VIEW     A  CREATE VIEW public.contratoxmarca_modelo AS
 SELECT moto.marca,
    moto.modelo,
    count(DISTINCT moto.matricula) AS cant_moto,
    sum((contrato.fechafin - contrato.fechainicio)) AS diasalquilados,
        CASE
            WHEN ((contrato.formapago)::text = 'Tarjeta de Credito'::text) THEN sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750)))
            ELSE (0)::bigint
        END AS valor_tarjeta_credito,
        CASE
            WHEN ((contrato.formapago)::text = 'Cheque'::text) THEN sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750)))
            ELSE (0)::bigint
        END AS valor_cheque,
        CASE
            WHEN ((contrato.formapago)::text = 'efectivo'::text) THEN sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750)))
            ELSE (0)::bigint
        END AS valor_efectivo,
    sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))) AS ingreso_marca
   FROM (((public.marca
     JOIN public.moto ON (((marca.nommarca)::text = (moto.marca)::text)))
     JOIN public.modelo ON (((marca.nommarca)::text = (modelo.nommarca)::text)))
     JOIN public.contrato ON (((moto.matricula)::text = (contrato.matricula)::text)))
  GROUP BY moto.marca, moto.modelo, contrato.formapago;
 (   DROP VIEW public.contratoxmarca_modelo;
       public          postgres    false    217    222    222    220    220    220    216    222    222    222            �            1259    24809 	   formapago    TABLE     P   CREATE TABLE public.formapago (
    formapago character varying(25) NOT NULL
);
    DROP TABLE public.formapago;
       public         heap    postgres    false            �            1259    42071    getclientes    VIEW     P  CREATE VIEW public.getclientes AS
 SELECT cliente.nombre,
    cliente.idcliente,
    public.countcontratos(cliente.idcliente) AS cant_contratos,
    sum(public.calculateimporte(cliente.idcliente, (750)::double precision, (300)::double precision)) AS valor_alquileres
   FROM public.cliente
  GROUP BY cliente.nombre, cliente.idcliente;
    DROP VIEW public.getclientes;
       public          postgres    false    253    255    219    219            �            1259    58529    ingresos_anuales    VIEW     �  CREATE VIEW public.ingresos_anuales AS
 SELECT CURRENT_DATE AS fecha_actual,
    sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))) AS total_ventas,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (1)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (2)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (3)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (4)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (5)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (6)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (7)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (8)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (9)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (10)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (11)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (12)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM public.contrato;
 #   DROP VIEW public.ingresos_anuales;
       public          postgres    false    222    222    222            �            1259    42075 	   moto_view    VIEW     �   CREATE VIEW public.moto_view AS
 SELECT moto.matricula,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cantkm,
    moto.situacion
   FROM public.moto;
    DROP VIEW public.moto_view;
       public          postgres    false    220    220    220    220    220    220            �            1259    58534    pagos_mun_view    VIEW     �  CREATE VIEW public.pagos_mun_view AS
 SELECT cliente.municipio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (1)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (2)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (3)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (4)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (5)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (6)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (7)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (8)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (9)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (10)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (11)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (12)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM (public.contrato
     JOIN public.cliente ON (((cliente.idcliente)::text = (contrato.idcliente)::text)))
  GROUP BY cliente.municipio;
 !   DROP VIEW public.pagos_mun_view;
       public          postgres    false    222    222    222    219    222    219            �            1259    42161 
   pagos_view    VIEW     |  CREATE VIEW public.pagos_view AS
 SELECT sum(((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))) AS total_ventas,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (1)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (2)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (3)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (4)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (5)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (6)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (7)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (8)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (9)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (10)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (11)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fechainicio) = (12)::numeric) THEN ((contrato.diasprorroga * 300) + ((contrato.fechafin - contrato.fechainicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM public.contrato;
    DROP VIEW public.pagos_view;
       public          postgres    false    222    222    222            �            1259    24768 	   situacion    TABLE     P   CREATE TABLE public.situacion (
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.situacion;
       public         heap    postgres    false            �            1259    41910    tipo_usuario    TABLE     f   CREATE TABLE public.tipo_usuario (
    id integer NOT NULL,
    usuario character varying NOT NULL
);
     DROP TABLE public.tipo_usuario;
       public         heap    postgres    false            �            1259    41909    tipo_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tipo_usuario_id_seq;
       public          postgres    false    224            �           0    0    tipo_usuario_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tipo_usuario_id_seq OWNED BY public.tipo_usuario.id;
          public          postgres    false    223            �            1259    42086    usuario    TABLE       CREATE TABLE public.usuario (
    nombre_usuario character varying(30) NOT NULL,
    contrasenia character varying(8) NOT NULL,
    email character varying(50),
    tipo_usuario integer NOT NULL,
    id_cliente character varying(11),
    mun character varying(15)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    42101    usuario_view    VIEW     '  CREATE VIEW public.usuario_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.email,
    tipo_usuario.usuario AS tipo_usuario,
    usuario.id_cliente,
    usuario.mun
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)));
    DROP VIEW public.usuario_view;
       public          postgres    false    224    224    228    228    228    228    228    228            �            1259    58501    worker_view    VIEW     '  CREATE VIEW public.worker_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.mun,
    tipo_usuario.usuario
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)))
  WHERE ((tipo_usuario.usuario)::text = 'Trabajador'::text);
    DROP VIEW public.worker_view;
       public          postgres    false    228    228    224    228    228    224            �           2604    58539    tipo_usuario id    DEFAULT     r   ALTER TABLE ONLY public.tipo_usuario ALTER COLUMN id SET DEFAULT nextval('public.tipo_usuario_id_seq'::regclass);
 >   ALTER TABLE public.tipo_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �          0    24778    cliente 
   TABLE DATA           z   COPY public.cliente (idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont) FROM stdin;
    public          postgres    false    219   (�       �          0    24814    contrato 
   TABLE DATA           |   COPY public.contrato (idcliente, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga) FROM stdin;
    public          postgres    false    222   �       �          0    24809 	   formapago 
   TABLE DATA           .   COPY public.formapago (formapago) FROM stdin;
    public          postgres    false    221   ��       �          0    24737    marca 
   TABLE DATA           )   COPY public.marca (nommarca) FROM stdin;
    public          postgres    false    216   ե       �          0    24747    modelo 
   TABLE DATA           5   COPY public.modelo (nommodelo, nommarca) FROM stdin;
    public          postgres    false    217   �       �          0    24788    moto 
   TABLE DATA           R   COPY public.moto (matricula, color, cantkm, marca, modelo, situacion) FROM stdin;
    public          postgres    false    220   ��       �          0    24732 	   municipio 
   TABLE DATA           +   COPY public.municipio (nommun) FROM stdin;
    public          postgres    false    215   [�       �          0    24768 	   situacion 
   TABLE DATA           .   COPY public.situacion (situacion) FROM stdin;
    public          postgres    false    218   �       �          0    41910    tipo_usuario 
   TABLE DATA           3   COPY public.tipo_usuario (id, usuario) FROM stdin;
    public          postgres    false    224   :�       �          0    42086    usuario 
   TABLE DATA           d   COPY public.usuario (nombre_usuario, contrasenia, email, tipo_usuario, id_cliente, mun) FROM stdin;
    public          postgres    false    228   v�       �           0    0    tipo_usuario_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tipo_usuario_id_seq', 3, true);
          public          postgres    false    223            �           2606    24782    cliente cliente_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (idcliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    219            �           2606    24819    contrato contrato_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_pkey PRIMARY KEY (fechafirma);
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_pkey;
       public            postgres    false    222            �           2606    24813    formapago formapago_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.formapago
    ADD CONSTRAINT formapago_pkey PRIMARY KEY (formapago);
 B   ALTER TABLE ONLY public.formapago DROP CONSTRAINT formapago_pkey;
       public            postgres    false    221            �           2606    24741    marca marca_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (nommarca);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            postgres    false    216            �           2606    24751    modelo modelo_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (nommodelo);
 <   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_pkey;
       public            postgres    false    217            �           2606    24793    moto moto_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_pkey PRIMARY KEY (matricula);
 8   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_pkey;
       public            postgres    false    220            �           2606    24736    municipio municipio_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (nommun);
 B   ALTER TABLE ONLY public.municipio DROP CONSTRAINT municipio_pkey;
       public            postgres    false    215            �           2606    24772    situacion situacion_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.situacion
    ADD CONSTRAINT situacion_pkey PRIMARY KEY (situacion);
 B   ALTER TABLE ONLY public.situacion DROP CONSTRAINT situacion_pkey;
       public            postgres    false    218            �           2606    41917    tipo_usuario tipo_usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tipo_usuario
    ADD CONSTRAINT tipo_usuario_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tipo_usuario DROP CONSTRAINT tipo_usuario_pkey;
       public            postgres    false    224            �           2606    42090    usuario usuario_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (nombre_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    228            �           2620    58528    contrato deletecontract_tg    TRIGGER     y   CREATE TRIGGER deletecontract_tg BEFORE DELETE ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.deletecontract();
 3   DROP TRIGGER deletecontract_tg ON public.contrato;
       public          postgres    false    222    250            �           2620    41945    contrato tg_changesituation    TRIGGER     {   CREATE TRIGGER tg_changesituation BEFORE INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.changesituation();
 4   DROP TRIGGER tg_changesituation ON public.contrato;
       public          postgres    false    222    254            �           2620    42130 !   cliente tg_deletecontratoscliente    TRIGGER     �   CREATE TRIGGER tg_deletecontratoscliente AFTER DELETE ON public.cliente FOR EACH ROW EXECUTE FUNCTION public.deletecontratoscliente();
 :   DROP TRIGGER tg_deletecontratoscliente ON public.cliente;
       public          postgres    false    249    219            �           2620    58506    cliente tg_user_delete    TRIGGER     q   CREATE TRIGGER tg_user_delete BEFORE DELETE ON public.cliente FOR EACH ROW EXECUTE FUNCTION public.deleteuser();
 /   DROP TRIGGER tg_user_delete ON public.cliente;
       public          postgres    false    252    219            �           2620    41944    contrato tg_validatesituation    TRIGGER     ~   CREATE TRIGGER tg_validatesituation AFTER INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.validatesituation();
 6   DROP TRIGGER tg_validatesituation ON public.contrato;
       public          postgres    false    222    269            �           2606    24783    cliente cliente_municipio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_municipio_fkey FOREIGN KEY (municipio) REFERENCES public.municipio(nommun);
 H   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_municipio_fkey;
       public          postgres    false    3287    215    219            �           2606    58521    contrato con_forma_pago    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_forma_pago FOREIGN KEY (formapago) REFERENCES public.formapago(formapago);
 A   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_forma_pago;
       public          postgres    false    221    3299    222            �           2606    58511    contrato con_idcliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_idcliente FOREIGN KEY (idcliente) REFERENCES public.cliente(idcliente) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_idcliente;
       public          postgres    false    3295    222    219            �           2606    58516    contrato con_matricula    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_matricula FOREIGN KEY (matricula) REFERENCES public.moto(matricula) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_matricula;
       public          postgres    false    220    222    3297            �           2606    58540     contrato contrato_formapago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_formapago_fkey FOREIGN KEY (formapago) REFERENCES public.formapago(formapago);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_formapago_fkey;
       public          postgres    false    221    222    3299            �           2606    58545     contrato contrato_idcliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.cliente(idcliente);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_idcliente_fkey;
       public          postgres    false    222    219    3295            �           2606    58550     contrato contrato_matricula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_matricula_fkey FOREIGN KEY (matricula) REFERENCES public.moto(matricula);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_matricula_fkey;
       public          postgres    false    220    222    3297            �           2606    24752    modelo modelo_nommarca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_nommarca_fkey FOREIGN KEY (nommarca) REFERENCES public.marca(nommarca);
 E   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_nommarca_fkey;
       public          postgres    false    216    3289    217            �           2606    24794    moto moto_marca_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_marca_fkey FOREIGN KEY (marca) REFERENCES public.marca(nommarca);
 >   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_marca_fkey;
       public          postgres    false    3289    220    216            �           2606    24799    moto moto_modelo_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_modelo_fkey FOREIGN KEY (modelo) REFERENCES public.modelo(nommodelo);
 ?   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_modelo_fkey;
       public          postgres    false    3291    217    220            �           2606    24804    moto moto_situacion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_situacion_fkey FOREIGN KEY (situacion) REFERENCES public.situacion(situacion);
 B   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_situacion_fkey;
       public          postgres    false    218    220    3293            �           2606    50300    usuario mun    FK CONSTRAINT     n   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT mun FOREIGN KEY (mun) REFERENCES public.municipio(nommun);
 5   ALTER TABLE ONLY public.usuario DROP CONSTRAINT mun;
       public          postgres    false    3287    228    215            �           2606    42096    usuario usuario_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(idcliente);
 I   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_id_cliente_fkey;
       public          postgres    false    219    228    3295            �           2606    42091 !   usuario usuario_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_tipo_usuario_fkey FOREIGN KEY (tipo_usuario) REFERENCES public.tipo_usuario(id);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_tipo_usuario_fkey;
       public          postgres    false    224    228    3303            �   �  x��T�N#9}�|_���~��e`@0ü싓.�:v������ +��Q��:��s�Z*a�R��Y|��0~�Q�n���v�㇘��	)���k���\�L�i�)f���/t��;<��9���/aҧ&�,�{�>�?4�Jy�7\r��]��@y�L�����oi4�B4ZKZL=1u4�C8$�	%�0�90%���32�u^�z�h�~�3ϻ2%��ِ�1�"���v�r�H7o@�H�ҘƙYk��^Ãy�K���*����K��rOZ�=w��h��5:�ZG xI�!�yC��@�/���!����U�FK�n*r��r�ާĴ(��b�;�&.1��
}�s|ι��8���z5햅+բ�7� "*ާ<t#}��B��v�
�UE���� e[�x!�̉.4��gN�껞�z�����#���r$k�$ Z�S���C$Po"Օ�Hװ��BZ!��u(�!kL#@do�v�v�Z�Oe!�"�Gp?j��R���rO���	��h�Ѧ"wu������nĸ�0�����̏ty b;L^�U�~hӂ1�VH���9Cf:�e'��zt9	���-,=��cM���I�]��!�ViC_��9�S�s��CH-@d�W���[^�^Y�������	e��Lk^rY�}\����{
�A�w��#Rz���I7s-t7�k;���1�I������Y2�t�,���0��K��|���_%��m�"ҍ����x}�S�]���.�(ݭ�<�J~�Hyl'z���aaF��&���<�F-S��1n9�<�SHHTc�k}kZk�*������@���e���qzل��G(�ݒU�5��c3�?�+������)�̇��r���~B�W��2�A�U���5�uU�)��	i��43V�.�����㑰�4xmg�"��Z]�ї}����G��q\�����q�����P����-��R����_�f� ;?�s      �   }   x�m�;�0��)� Ѿ��5e�4Hl�Р s~NA7zҌ,1<<�{��EK�J�E�
zv�`�+z+���o)�C���{�2J8����f���=W�m� 9P]��Wo����[ �>0=      �   0   x�s�H-,M�
I,�J-ITHIUp.JM�,��rMKM.�,������ >�      �   8   x�S�H,�I��uI,�L)������KI�L�M�H�r�W��/�/*JL����� �
D      �   �   x�s��IQ��K����KI�rL+�LNT)�̃�8;���9A�AA
n�E�I9�)�0� 7S(/2�M7Ȑ32171#��7D���	I=Ә�E@�`n` ��D�ܢt,4@:-5a�1z\\\ )�50      �   �   x����
�0���+�ew��z���P<ă
^"�,��׫(B@��7�LmP���&���uM����p��'j�I�q�ʕ�֊K��>�o�ra	��V��OO�ӈFb�����`��s�T"*Y~�|���w�d"N���\� GYc      �   �   x�-�A�@C�=Ŝ���]�MX�)�Cƌ�ϰ�ky/�]5�m�Rb2u'v�D�"Z8�
�ۺAܥOsg�_/;��$��"�j�ρ�|�p�3u앨�*?Wqct��<��4��(�tQw�1>�R2�Ԥ��O[/9�o |b=_      �   )   x�I��I-�r�),��ILI�r�,.���L�I����� �a
�      �   ,   x�3�tL����2�t��L�+I�2�)JLJ�JL�/����� ��
      �   �   x�m�O�0���!k7��^9OzᲸ�Oa�?��di^�^m�0��k����HJ~Ƭ
�|���SK�zg]�l��|��tL;k11З�!����ؾ�F�lm���E���49H6���φJ�"�Y������~���i_�薷�؄?&m�z,��"D����$|��a�~�f��I,�<B�7sl_�     