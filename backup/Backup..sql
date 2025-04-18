PGDMP                     
    |         
   RentaMotos    15.1    15.1 x    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                        false    2                       1255    41934 G   calculateimporte(character varying, double precision, double precision)    FUNCTION     �  CREATE FUNCTION public.calculateimporte(id character varying, tar double precision, tarespecial double precision) RETURNS double precision
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
       public          postgres    false                       1255    41939    changesituation()    FUNCTION     �   CREATE FUNCTION public.changesituation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	update moto set situacion = 'Alquilada' where Moto.matricula = NEW.matricula;
	return NEW;
END;
$$;
 (   DROP FUNCTION public.changesituation();
       public          postgres    false                       1255    42109    clientesincumplidores()    FUNCTION     �  CREATE FUNCTION public.clientesincumplidores() RETURNS TABLE(nomvre character varying, prim_apellido character varying, seg_apellido character varying, fecha_fin date, fecha_entrega date)
    LANGUAGE sql
    AS $$

       SELECT cl.nombre, cl.primapellido, cl.segapellido, c.fechafin, (c.fechafin + Concat(c.diasprorroga, 'day')::interval) as fecha_entrega
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0;
$$;
 .   DROP FUNCTION public.clientesincumplidores();
       public          postgres    false                       1255    42107     contratoxmarcamodelo(text, text)    FUNCTION     V  CREATE FUNCTION public.contratoxmarcamodelo(marca text, modelo text) RETURNS json
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
       public          postgres    false                       1255    41937 !   countcontratos(character varying)    FUNCTION     /  CREATE FUNCTION public.countcontratos(id character varying) RETURNS integer
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
       public          postgres    false                       1255    58527    deletecontract()    FUNCTION     �   CREATE FUNCTION public.deletecontract() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE moto set situacion = 'Disponible' WHERE moto.matricula = OLD.matricula;
	return OLD;
END $$;
 '   DROP FUNCTION public.deletecontract();
       public          postgres    false                       1255    42118    deletecontratoscliente()    FUNCTION     �   CREATE FUNCTION public.deletecontratoscliente() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	delete from contrato where contrato.idcliente = OLD.idcliente;
	return OLD;
end
$$;
 /   DROP FUNCTION public.deletecontratoscliente();
       public          postgres    false                       1255    58505    deleteuser()    FUNCTION     �   CREATE FUNCTION public.deleteuser() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM usuario WHERE id_cliente = OLD.idcliente;
	Return old;
END;
$$;
 #   DROP FUNCTION public.deleteuser();
       public          postgres    false                       1255    41908 "   getcontratobyid(character varying)    FUNCTION     �   CREATE FUNCTION public.getcontratobyid(id character varying) RETURNS void
    LANGUAGE sql
    AS $$
 select * from contrato	inner join cliente on contrato.idcliente = cliente.idcliente
 where cliente.idcliente = id;
$$;
 <   DROP FUNCTION public.getcontratobyid(id character varying);
       public          postgres    false                       1255    42115    situacionmoto()    FUNCTION     �  CREATE FUNCTION public.situacionmoto() RETURNS TABLE(matricula character varying, marca character varying, situacion character varying, fecha_entrega date)
    LANGUAGE sql
    AS $$
        SELECT matricula, marca, situacion, Case 
			when situacion = 'Alquilada' then (select fechafin::date from contrato where contrato.matricula = moto.matricula)
			else null end as fecha_entrega
		
        FROM moto;
$$;
 &   DROP FUNCTION public.situacionmoto();
       public          postgres    false                       1255    41943    validatesituation()    FUNCTION     �  CREATE FUNCTION public.validatesituation() RETURNS trigger
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
    ci_cliente character varying(11) NOT NULL,
    nombre character varying(20) NOT NULL,
    seg_nombre character varying(20),
    prim_apellido character varying(25) NOT NULL,
    seg_apellido character varying(25) NOT NULL,
    edad integer NOT NULL,
    municipio character varying(20),
    sexo character(1) NOT NULL,
    num_cont character varying(20),
    id_cliente integer NOT NULL
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    68104    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          postgres    false    219            �           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    240            �            1259    42131    cliente_view    VIEW     (  CREATE VIEW public.cliente_view AS
SELECT
    NULL::character varying(20) AS municipio,
    NULL::character varying(11) AS idcliente,
    NULL::character varying(20) AS nombre,
    NULL::bigint AS cant_alquileres,
    NULL::bigint AS valor_total,
    NULL::character varying(25) AS primapellido;
    DROP VIEW public.cliente_view;
       public          postgres    false            �            1259    24814    contrato    TABLE     m  CREATE TABLE public.contrato (
    ci_cliente character varying(25) NOT NULL,
    matricula character varying(25) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    fecha_firma date NOT NULL,
    forma_pago character varying(25) NOT NULL,
    seguro boolean,
    dias_prorroga integer DEFAULT 0 NOT NULL,
    id_contrato integer NOT NULL
);
    DROP TABLE public.contrato;
       public         heap    postgres    false            �            1259    24788    moto    TABLE     O  CREATE TABLE public.moto (
    matricula character varying(8) NOT NULL,
    color character varying(15) NOT NULL,
    cant_km double precision DEFAULT 0,
    marca character varying(25) NOT NULL,
    modelo character varying(25) NOT NULL,
    situacion character varying(25) NOT NULL,
    id_moto integer NOT NULL,
    imagen bytea
);
    DROP TABLE public.moto;
       public         heap    postgres    false            �            1259    24732 	   municipio    TABLE     k   CREATE TABLE public.municipio (
    nom_mun character varying(25) NOT NULL,
    id_mun integer NOT NULL
);
    DROP TABLE public.municipio;
       public         heap    postgres    false            �            1259    42120    cont_mun    VIEW     �  CREATE VIEW public.cont_mun AS
 SELECT municipio.nom_mun AS nommun,
    moto.marca,
    moto.modelo,
    sum((contrato.fecha_fin - contrato.fecha_inicio)) AS diasalquilados,
    sum(contrato.dias_prorroga) AS diasprorroga,
        CASE
            WHEN ((contrato.forma_pago)::text = 'efectivo'::text) THEN sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750)))
            ELSE (0)::bigint
        END AS valor_efectivo,
    sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))) AS valor_general
   FROM (((public.contrato
     JOIN public.cliente ON (((cliente.ci_cliente)::text = (contrato.ci_cliente)::text)))
     JOIN public.municipio ON (((municipio.nom_mun)::text = (cliente.municipio)::text)))
     JOIN public.moto ON (((contrato.matricula)::text = (moto.matricula)::text)))
  GROUP BY municipio.nom_mun, moto.marca, moto.modelo, contrato.forma_pago;
    DROP VIEW public.cont_mun;
       public          postgres    false    222    222    222    219    219    220    220    220    222    222    222    215            �            1259    50305    cont_mun_view    VIEW     �  CREATE VIEW public.cont_mun_view AS
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
     JOIN public.contrato ON (((cliente.ci_cliente)::text = (contrato.ci_cliente)::text))) tabl(idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont, id_cliente, idcliente_1, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga, id_contrato)
     JOIN public.moto ON (((tabl.matricula)::text = (moto.matricula)::text)));
     DROP VIEW public.cont_mun_view;
       public          postgres    false    222    222    222    222    222    222    222    220    220    219    220    219    219            �            1259    58555    contrato_cliente_view    VIEW       CREATE VIEW public.contrato_cliente_view AS
 SELECT contrato.ci_cliente AS idcliente,
    contrato.matricula,
    moto.marca,
    moto.modelo,
    contrato.fecha_inicio AS fechainicio,
    contrato.fecha_fin AS fechafin,
    contrato.forma_pago AS formapago,
    contrato.seguro,
    contrato.dias_prorroga AS diasprorroga,
    ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750)) AS importe
   FROM (public.contrato
     JOIN public.moto ON (((contrato.matricula)::text = (moto.matricula)::text)));
 (   DROP VIEW public.contrato_cliente_view;
       public          postgres    false    222    222    220    220    220    222    222    222    222    222            �            1259    68110    contrato_id_contrato_seq    SEQUENCE     �   CREATE SEQUENCE public.contrato_id_contrato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.contrato_id_contrato_seq;
       public          postgres    false    222            �           0    0    contrato_id_contrato_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.contrato_id_contrato_seq OWNED BY public.contrato.id_contrato;
          public          postgres    false    241            �            1259    42079    contrato_view    VIEW       CREATE VIEW public.contrato_view AS
 SELECT tabl.nombre,
    moto.matricula,
    moto.modelo,
    moto.marca,
    tabl.forma_pago AS formapago,
    tabl.fecha_inicio AS fechainicio,
    tabl.fecha_fin AS fechafin,
    tabl.dias_prorroga AS diasprorroga,
    tabl.seguro,
    ((tabl.dias_prorroga * 300) + ((tabl.fecha_fin - tabl.fecha_inicio) * 750)) AS importe
   FROM ((public.cliente
     JOIN public.contrato ON (((cliente.ci_cliente)::text = (contrato.ci_cliente)::text))) tabl(ci_cliente, nombre, seg_nombre, prim_apellido, seg_apellido, edad, municipio, sexo, num_cont, id_cliente, ci_cliente_1, matricula, fecha_inicio, fecha_fin, fecha_firma, forma_pago, seguro, dias_prorroga, id_contrato)
     JOIN public.moto ON (((tabl.matricula)::text = (moto.matricula)::text)));
     DROP VIEW public.contrato_view;
       public          postgres    false    222    222    222    222    222    222    222    220    220    220    219    219            �            1259    24737    marca    TABLE     k   CREATE TABLE public.marca (
    nom_marca character varying(25) NOT NULL,
    id_marca integer NOT NULL
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    24747    modelo    TABLE     �   CREATE TABLE public.modelo (
    nom_modelo character varying(25) NOT NULL,
    nom_marca character varying(25) NOT NULL,
    id_modelo integer NOT NULL
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    58492    contratoxmarca_modelo    VIEW     V  CREATE VIEW public.contratoxmarca_modelo AS
 SELECT moto.marca,
    moto.modelo,
    count(DISTINCT moto.matricula) AS cant_moto,
    sum((contrato.fecha_fin - contrato.fecha_inicio)) AS diasalquilados,
        CASE
            WHEN ((contrato.forma_pago)::text = 'Tarjeta de Credito'::text) THEN sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750)))
            ELSE (0)::bigint
        END AS valor_tarjeta_credito,
        CASE
            WHEN ((contrato.forma_pago)::text = 'Cheque'::text) THEN sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750)))
            ELSE (0)::bigint
        END AS valor_cheque,
        CASE
            WHEN ((contrato.forma_pago)::text = 'efectivo'::text) THEN sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750)))
            ELSE (0)::bigint
        END AS valor_efectivo,
    sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))) AS ingreso_marca
   FROM (((public.marca
     JOIN public.moto ON (((marca.nom_marca)::text = (moto.marca)::text)))
     JOIN public.modelo ON (((marca.nom_marca)::text = (modelo.nom_marca)::text)))
     JOIN public.contrato ON (((moto.matricula)::text = (contrato.matricula)::text)))
  GROUP BY moto.marca, moto.modelo, contrato.forma_pago;
 (   DROP VIEW public.contratoxmarca_modelo;
       public          postgres    false    222    222    222    222    222    220    220    220    217    216            �            1259    24809 	   formapago    TABLE     m   CREATE TABLE public.formapago (
    forma_pago character varying(25) NOT NULL,
    id_fp integer NOT NULL
);
    DROP TABLE public.formapago;
       public         heap    postgres    false            �            1259    68134    formapago_id_fp_seq    SEQUENCE     �   CREATE SEQUENCE public.formapago_id_fp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.formapago_id_fp_seq;
       public          postgres    false    221            �           0    0    formapago_id_fp_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.formapago_id_fp_seq OWNED BY public.formapago.id_fp;
          public          postgres    false    245            �            1259    42071    getclientes    VIEW     a  CREATE VIEW public.getclientes AS
 SELECT cliente.nombre,
    cliente.ci_cliente AS idcliente,
    public.countcontratos(cliente.ci_cliente) AS cant_contratos,
    sum(public.calculateimporte(cliente.ci_cliente, (750)::double precision, (300)::double precision)) AS valor_alquileres
   FROM public.cliente
  GROUP BY cliente.nombre, cliente.ci_cliente;
    DROP VIEW public.getclientes;
       public          postgres    false    219    262    264    219            �            1259    58529    ingresos_anuales    VIEW     �  CREATE VIEW public.ingresos_anuales AS
 SELECT CURRENT_DATE AS fecha_actual,
    sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))) AS total_ventas,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (1)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (2)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (3)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (4)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (5)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (6)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (7)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (8)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (9)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (10)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (11)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (12)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM public.contrato;
 #   DROP VIEW public.ingresos_anuales;
       public          postgres    false    222    222    222            �            1259    68116    marca_id_marca_seq    SEQUENCE     �   CREATE SEQUENCE public.marca_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.marca_id_marca_seq;
       public          postgres    false    216            �           0    0    marca_id_marca_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.marca_id_marca_seq OWNED BY public.marca.id_marca;
          public          postgres    false    242            �            1259    68122    modelo_id_modelo_seq    SEQUENCE     �   CREATE SEQUENCE public.modelo_id_modelo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.modelo_id_modelo_seq;
       public          postgres    false    217            �           0    0    modelo_id_modelo_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.modelo_id_modelo_seq OWNED BY public.modelo.id_modelo;
          public          postgres    false    243            �            1259    68098    moto_id_moto_seq    SEQUENCE     �   CREATE SEQUENCE public.moto_id_moto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.moto_id_moto_seq;
       public          postgres    false    220            �           0    0    moto_id_moto_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.moto_id_moto_seq OWNED BY public.moto.id_moto;
          public          postgres    false    239            �            1259    42075 	   moto_view    VIEW     �   CREATE VIEW public.moto_view AS
 SELECT moto.matricula,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cant_km AS cantkm,
    moto.situacion
   FROM public.moto;
    DROP VIEW public.moto_view;
       public          postgres    false    220    220    220    220    220    220            �            1259    68128    municipio_id_mun_seq    SEQUENCE     �   CREATE SEQUENCE public.municipio_id_mun_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.municipio_id_mun_seq;
       public          postgres    false    215            �           0    0    municipio_id_mun_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.municipio_id_mun_seq OWNED BY public.municipio.id_mun;
          public          postgres    false    244            �            1259    58534    pagos_mun_view    VIEW     �  CREATE VIEW public.pagos_mun_view AS
 SELECT cliente.municipio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (1)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (2)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (3)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (4)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (5)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (6)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (7)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (8)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (9)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (10)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (11)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (12)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM (public.contrato
     JOIN public.cliente ON (((cliente.ci_cliente)::text = (contrato.ci_cliente)::text)))
  GROUP BY cliente.municipio;
 !   DROP VIEW public.pagos_mun_view;
       public          postgres    false    222    219    219    222    222    222            �            1259    42161 
   pagos_view    VIEW     �  CREATE VIEW public.pagos_view AS
 SELECT sum(((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))) AS total_ventas,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (1)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS enero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (2)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS febrero,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (3)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS marzo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (4)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS abril,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (5)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS mayo,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (6)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS junio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (7)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS julio,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (8)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS agosto,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (9)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS septiembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (10)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS octubre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (11)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS noviembre,
    sum(
        CASE
            WHEN (EXTRACT(month FROM contrato.fecha_inicio) = (12)::numeric) THEN ((contrato.dias_prorroga * 300) + ((contrato.fecha_fin - contrato.fecha_inicio) * 750))
            ELSE 0
        END) AS diciembre
   FROM public.contrato;
    DROP VIEW public.pagos_view;
       public          postgres    false    222    222    222            �            1259    24768 	   situacion    TABLE     m   CREATE TABLE public.situacion (
    situacion character varying(25) NOT NULL,
    id_sit integer NOT NULL
);
    DROP TABLE public.situacion;
       public         heap    postgres    false            �            1259    68146    situacion_id_sit_seq    SEQUENCE     �   CREATE SEQUENCE public.situacion_id_sit_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.situacion_id_sit_seq;
       public          postgres    false    218            �           0    0    situacion_id_sit_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.situacion_id_sit_seq OWNED BY public.situacion.id_sit;
          public          postgres    false    247            �            1259    41910    tipo_usuario    TABLE     f   CREATE TABLE public.tipo_usuario (
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
          public          postgres    false    223            �            1259    42086    usuario    TABLE     ;  CREATE TABLE public.usuario (
    nombre_usuario character varying(30) NOT NULL,
    contrasenia character varying(8) NOT NULL,
    email character varying(50),
    tipo_usuario integer NOT NULL,
    id_cliente character varying(11),
    mun character varying(15),
    id_user integer NOT NULL,
    imagen bytea
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    68140    usuario_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.usuario_id_user_seq;
       public          postgres    false    228            �           0    0    usuario_id_user_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.usuario_id_user_seq OWNED BY public.usuario.id_user;
          public          postgres    false    246            �            1259    42101    usuario_view    VIEW     '  CREATE VIEW public.usuario_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.email,
    tipo_usuario.usuario AS tipo_usuario,
    usuario.id_cliente,
    usuario.mun
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)));
    DROP VIEW public.usuario_view;
       public          postgres    false    228    228    228    228    224    224    228    228            �            1259    58501    worker_view    VIEW     '  CREATE VIEW public.worker_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.mun,
    tipo_usuario.usuario
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)))
  WHERE ((tipo_usuario.usuario)::text = 'Trabajador'::text);
    DROP VIEW public.worker_view;
       public          postgres    false    228    228    228    228    224    224            �           2604    68105    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    240    219            �           2604    68111    contrato id_contrato    DEFAULT     |   ALTER TABLE ONLY public.contrato ALTER COLUMN id_contrato SET DEFAULT nextval('public.contrato_id_contrato_seq'::regclass);
 C   ALTER TABLE public.contrato ALTER COLUMN id_contrato DROP DEFAULT;
       public          postgres    false    241    222            �           2604    68135    formapago id_fp    DEFAULT     r   ALTER TABLE ONLY public.formapago ALTER COLUMN id_fp SET DEFAULT nextval('public.formapago_id_fp_seq'::regclass);
 >   ALTER TABLE public.formapago ALTER COLUMN id_fp DROP DEFAULT;
       public          postgres    false    245    221            �           2604    68117    marca id_marca    DEFAULT     p   ALTER TABLE ONLY public.marca ALTER COLUMN id_marca SET DEFAULT nextval('public.marca_id_marca_seq'::regclass);
 =   ALTER TABLE public.marca ALTER COLUMN id_marca DROP DEFAULT;
       public          postgres    false    242    216            �           2604    68123    modelo id_modelo    DEFAULT     t   ALTER TABLE ONLY public.modelo ALTER COLUMN id_modelo SET DEFAULT nextval('public.modelo_id_modelo_seq'::regclass);
 ?   ALTER TABLE public.modelo ALTER COLUMN id_modelo DROP DEFAULT;
       public          postgres    false    243    217            �           2604    68099    moto id_moto    DEFAULT     l   ALTER TABLE ONLY public.moto ALTER COLUMN id_moto SET DEFAULT nextval('public.moto_id_moto_seq'::regclass);
 ;   ALTER TABLE public.moto ALTER COLUMN id_moto DROP DEFAULT;
       public          postgres    false    239    220            �           2604    68129    municipio id_mun    DEFAULT     t   ALTER TABLE ONLY public.municipio ALTER COLUMN id_mun SET DEFAULT nextval('public.municipio_id_mun_seq'::regclass);
 ?   ALTER TABLE public.municipio ALTER COLUMN id_mun DROP DEFAULT;
       public          postgres    false    244    215            �           2604    68147    situacion id_sit    DEFAULT     t   ALTER TABLE ONLY public.situacion ALTER COLUMN id_sit SET DEFAULT nextval('public.situacion_id_sit_seq'::regclass);
 ?   ALTER TABLE public.situacion ALTER COLUMN id_sit DROP DEFAULT;
       public          postgres    false    247    218            �           2604    58539    tipo_usuario id    DEFAULT     r   ALTER TABLE ONLY public.tipo_usuario ALTER COLUMN id SET DEFAULT nextval('public.tipo_usuario_id_seq'::regclass);
 >   ALTER TABLE public.tipo_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    68141    usuario id_user    DEFAULT     r   ALTER TABLE ONLY public.usuario ALTER COLUMN id_user SET DEFAULT nextval('public.usuario_id_user_seq'::regclass);
 >   ALTER TABLE public.usuario ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    246    228            �          0    24778    cliente 
   TABLE DATA           �   COPY public.cliente (ci_cliente, nombre, seg_nombre, prim_apellido, seg_apellido, edad, municipio, sexo, num_cont, id_cliente) FROM stdin;
    public          postgres    false    219   =�       �          0    24814    contrato 
   TABLE DATA           �   COPY public.contrato (ci_cliente, matricula, fecha_inicio, fecha_fin, fecha_firma, forma_pago, seguro, dias_prorroga, id_contrato) FROM stdin;
    public          postgres    false    222   ��       �          0    24809 	   formapago 
   TABLE DATA           6   COPY public.formapago (forma_pago, id_fp) FROM stdin;
    public          postgres    false    221   ��       �          0    24737    marca 
   TABLE DATA           4   COPY public.marca (nom_marca, id_marca) FROM stdin;
    public          postgres    false    216   �       �          0    24747    modelo 
   TABLE DATA           B   COPY public.modelo (nom_modelo, nom_marca, id_modelo) FROM stdin;
    public          postgres    false    217   I�       �          0    24788    moto 
   TABLE DATA           d   COPY public.moto (matricula, color, cant_km, marca, modelo, situacion, id_moto, imagen) FROM stdin;
    public          postgres    false    220   ��       �          0    24732 	   municipio 
   TABLE DATA           4   COPY public.municipio (nom_mun, id_mun) FROM stdin;
    public          postgres    false    215   g�       �          0    24768 	   situacion 
   TABLE DATA           6   COPY public.situacion (situacion, id_sit) FROM stdin;
    public          postgres    false    218   0�       �          0    41910    tipo_usuario 
   TABLE DATA           3   COPY public.tipo_usuario (id, usuario) FROM stdin;
    public          postgres    false    224   o�       �          0    42086    usuario 
   TABLE DATA           u   COPY public.usuario (nombre_usuario, contrasenia, email, tipo_usuario, id_cliente, mun, id_user, imagen) FROM stdin;
    public          postgres    false    228   ��       �           0    0    cliente_id_cliente_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 7, true);
          public          postgres    false    240            �           0    0    contrato_id_contrato_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.contrato_id_contrato_seq', 1, false);
          public          postgres    false    241            �           0    0    formapago_id_fp_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.formapago_id_fp_seq', 3, true);
          public          postgres    false    245            �           0    0    marca_id_marca_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.marca_id_marca_seq', 13, true);
          public          postgres    false    242            �           0    0    modelo_id_modelo_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.modelo_id_modelo_seq', 13, true);
          public          postgres    false    243            �           0    0    moto_id_moto_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.moto_id_moto_seq', 20, true);
          public          postgres    false    239            �           0    0    municipio_id_mun_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.municipio_id_mun_seq', 17, true);
          public          postgres    false    244            �           0    0    situacion_id_sit_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.situacion_id_sit_seq', 3, true);
          public          postgres    false    247            �           0    0    tipo_usuario_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tipo_usuario_id_seq', 3, true);
          public          postgres    false    223            �           0    0    usuario_id_user_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.usuario_id_user_seq', 2, true);
          public          postgres    false    246            �           2606    24782    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (ci_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    219            �           2606    24819    contrato contrato_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_pkey PRIMARY KEY (fecha_firma);
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_pkey;
       public            postgres    false    222            �           2606    24813    formapago formapago_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.formapago
    ADD CONSTRAINT formapago_pkey PRIMARY KEY (forma_pago);
 B   ALTER TABLE ONLY public.formapago DROP CONSTRAINT formapago_pkey;
       public            postgres    false    221            �           2606    24741    marca marca_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (nom_marca);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            postgres    false    216            �           2606    24751    modelo modelo_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (nom_modelo);
 <   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_pkey;
       public            postgres    false    217            �           2606    24793    moto moto_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_pkey PRIMARY KEY (matricula);
 8   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_pkey;
       public            postgres    false    220            �           2606    24736    municipio municipio_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (nom_mun);
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
       public            postgres    false    228            �           2618    42134    cliente_view _RETURN    RULE     �  CREATE OR REPLACE VIEW public.cliente_view AS
 SELECT cliente.municipio,
    cliente.ci_cliente AS idcliente,
    cliente.nombre,
    count(contrato.matricula) AS cant_alquileres,
        CASE
            WHEN (count(contrato.matricula) <> 0) THEN sum((((contrato.fecha_fin - contrato.fecha_inicio) * 750) + (contrato.dias_prorroga * 300)))
            ELSE (0)::bigint
        END AS valor_total,
    cliente.prim_apellido AS primapellido
   FROM (public.cliente
     LEFT JOIN public.contrato ON (((cliente.ci_cliente)::text = (contrato.ci_cliente)::text)))
  GROUP BY cliente.municipio, cliente.nombre, cliente.ci_cliente
  ORDER BY cliente.municipio;
 3  CREATE OR REPLACE VIEW public.cliente_view AS
SELECT
    NULL::character varying(20) AS municipio,
    NULL::character varying(11) AS idcliente,
    NULL::character varying(20) AS nombre,
    NULL::bigint AS cant_alquileres,
    NULL::bigint AS valor_total,
    NULL::character varying(25) AS primapellido;
       public          postgres    false    219    219    219    219    3313    222    222    222    222    222    231                       2620    58528    contrato deletecontract_tg    TRIGGER     y   CREATE TRIGGER deletecontract_tg BEFORE DELETE ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.deletecontract();
 3   DROP TRIGGER deletecontract_tg ON public.contrato;
       public          postgres    false    259    222                       2620    41945    contrato tg_changesituation    TRIGGER     {   CREATE TRIGGER tg_changesituation BEFORE INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.changesituation();
 4   DROP TRIGGER tg_changesituation ON public.contrato;
       public          postgres    false    263    222            
           2620    42130 !   cliente tg_deletecontratoscliente    TRIGGER     �   CREATE TRIGGER tg_deletecontratoscliente AFTER DELETE ON public.cliente FOR EACH ROW EXECUTE FUNCTION public.deletecontratoscliente();
 :   DROP TRIGGER tg_deletecontratoscliente ON public.cliente;
       public          postgres    false    219    258                       2620    58506    cliente tg_user_delete    TRIGGER     q   CREATE TRIGGER tg_user_delete BEFORE DELETE ON public.cliente FOR EACH ROW EXECUTE FUNCTION public.deleteuser();
 /   DROP TRIGGER tg_user_delete ON public.cliente;
       public          postgres    false    219    261                       2620    41944    contrato tg_validatesituation    TRIGGER     ~   CREATE TRIGGER tg_validatesituation AFTER INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.validatesituation();
 6   DROP TRIGGER tg_validatesituation ON public.contrato;
       public          postgres    false    222    278            �           2606    24783    cliente cliente_municipio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_municipio_fkey FOREIGN KEY (municipio) REFERENCES public.municipio(nom_mun);
 H   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_municipio_fkey;
       public          postgres    false    3305    219    215                       2606    58521    contrato con_forma_pago    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_forma_pago FOREIGN KEY (forma_pago) REFERENCES public.formapago(forma_pago);
 A   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_forma_pago;
       public          postgres    false    222    3317    221                       2606    58511    contrato con_idcliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_idcliente FOREIGN KEY (ci_cliente) REFERENCES public.cliente(ci_cliente) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_idcliente;
       public          postgres    false    3313    222    219                       2606    58516    contrato con_matricula    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT con_matricula FOREIGN KEY (matricula) REFERENCES public.moto(matricula) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT con_matricula;
       public          postgres    false    3315    222    220                       2606    58540     contrato contrato_formapago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_formapago_fkey FOREIGN KEY (forma_pago) REFERENCES public.formapago(forma_pago);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_formapago_fkey;
       public          postgres    false    3317    221    222                       2606    58545     contrato contrato_idcliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_idcliente_fkey FOREIGN KEY (ci_cliente) REFERENCES public.cliente(ci_cliente);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_idcliente_fkey;
       public          postgres    false    219    222    3313                       2606    58550     contrato contrato_matricula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_matricula_fkey FOREIGN KEY (matricula) REFERENCES public.moto(matricula);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_matricula_fkey;
       public          postgres    false    222    220    3315            �           2606    24752    modelo modelo_nommarca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_nommarca_fkey FOREIGN KEY (nom_marca) REFERENCES public.marca(nom_marca);
 E   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_nommarca_fkey;
       public          postgres    false    217    3307    216            �           2606    24794    moto moto_marca_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_marca_fkey FOREIGN KEY (marca) REFERENCES public.marca(nom_marca);
 >   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_marca_fkey;
       public          postgres    false    3307    220    216            �           2606    24799    moto moto_modelo_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_modelo_fkey FOREIGN KEY (modelo) REFERENCES public.modelo(nom_modelo);
 ?   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_modelo_fkey;
       public          postgres    false    220    217    3309                        2606    24804    moto moto_situacion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_situacion_fkey FOREIGN KEY (situacion) REFERENCES public.situacion(situacion);
 B   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_situacion_fkey;
       public          postgres    false    3311    218    220                       2606    50300    usuario mun    FK CONSTRAINT     o   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT mun FOREIGN KEY (mun) REFERENCES public.municipio(nom_mun);
 5   ALTER TABLE ONLY public.usuario DROP CONSTRAINT mun;
       public          postgres    false    3305    228    215                       2606    42096    usuario usuario_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(ci_cliente);
 I   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_id_cliente_fkey;
       public          postgres    false    219    228    3313            	           2606    42091 !   usuario usuario_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_tipo_usuario_fkey FOREIGN KEY (tipo_usuario) REFERENCES public.tipo_usuario(id);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_tipo_usuario_fkey;
       public          postgres    false    3321    228    224            �   \   x�306424037�0����ȫ�t�+�����HM)J�J���M-��42�tN�+)�W�HLJ�K���45500202�4�2�cD�1F\1z\\\ Z(u      �      x������ � �      �   6   x�s�H-,M�4�
I,�J-ITHIUp.JM�,��4�rMKM.�,��4����� ]?�      �   -   x����KI�4�L�M�H�4�r�W��/�/*JL�4����� �H
      �   �   x�E˱
�0�9�+2�yѦ5���.ς��DS5PS�����QFHq�ù���;Ǐ>�ٶ�2	��௖W/R7�r�+��E$ID$������M[%�L�.YA�A���i�尯#���;�1�@�%����`��O~=k�p����7�      �   f   x���006424�����4����KI�t��IQ��K�t�,.���L�I������0426!B��D9�xN��ļd�����ČD��(7� Cd�F �1z\\\ .�)l      �   �   x�5�Kn�PEǾ�x+�x�B�� 
*#&Nb���,9� �K`c8�:;:��v&�5��sb�8���4�EJ.�&�虦��PJ8m�����mZ�96ڋiC�**-����F+�:79�WF�s�W�cķ�j�1Μ¡�u�8�����3Q�`m���/6Nw�N��+�3d��/��?�T2d�~ x̮B�      �   /   x�I��I-�4�r�),��ILI�4�r�,.���L�I�4����� ��s      �   ,   x�3�tL����2�t��L�+I�2�)JLJ�JL�/����� ��
      �   B   x���/NuL����4016���4P�+�8������$b"�S�J��<��9A:�b���� ��     