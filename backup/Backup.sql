PGDMP         *    	            |        
   RentaMotos    15.1    15.1 H    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    57476 
   RentaMotos    DATABASE     �   CREATE DATABASE "RentaMotos" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "RentaMotos";
                postgres    false                        3079    57477 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1255    57488 G   calculateimporte(character varying, double precision, double precision)    FUNCTION     �  CREATE FUNCTION public.calculateimporte(id character varying, tar double precision, tarespecial double precision) RETURNS double precision
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
       public          postgres    false            �            1255    57489    changesituation()    FUNCTION     �   CREATE FUNCTION public.changesituation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	update moto set situacion = 'Alquilada' where Moto.matricula = NEW.matricula;
	return NEW;
END;
$$;
 (   DROP FUNCTION public.changesituation();
       public          postgres    false            �            1255    57490    clientesincumplidores()    FUNCTION     �  CREATE FUNCTION public.clientesincumplidores() RETURNS TABLE(nomvre character varying, prim_apellido character varying, seg_apellido character varying, fecha_fin date, fecha_entrega date)
    LANGUAGE sql
    AS $$

       SELECT cl.nombre, cl.primapellido, cl.segapellido, c.fechafin, (c.fechafin + Concat(c.diasprorroga, 'day')::interval) as fecha_entrega
        FROM contrato c
        JOIN cliente cl ON c.idcliente = cl.idcliente
        WHERE c.diasprorroga > 0;
$$;
 .   DROP FUNCTION public.clientesincumplidores();
       public          postgres    false            �            1255    57491     contratoxmarcamodelo(text, text)    FUNCTION     V  CREATE FUNCTION public.contratoxmarcamodelo(marca text, modelo text) RETURNS json
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
       public          postgres    false            �            1255    57492 !   countcontratos(character varying)    FUNCTION     /  CREATE FUNCTION public.countcontratos(id character varying) RETURNS integer
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
       public          postgres    false            �            1255    57493    deletecontratoscliente()    FUNCTION     �   CREATE FUNCTION public.deletecontratoscliente() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	delete from contrato where contrato.idcliente = NEW.idcliente;
end
$$;
 /   DROP FUNCTION public.deletecontratoscliente();
       public          postgres    false            �            1255    57494 "   getcontratobyid(character varying)    FUNCTION     �   CREATE FUNCTION public.getcontratobyid(id character varying) RETURNS void
    LANGUAGE sql
    AS $$
 select * from contrato	inner join cliente on contrato.idcliente = cliente.idcliente
 where cliente.idcliente = id;
$$;
 <   DROP FUNCTION public.getcontratobyid(id character varying);
       public          postgres    false            �            1255    57495    situacionmoto()    FUNCTION     �  CREATE FUNCTION public.situacionmoto() RETURNS TABLE(matricula character varying, marca character varying, situacion character varying, fecha_entrega date)
    LANGUAGE sql
    AS $$
        SELECT matricula, marca, situacion, Case 
			when situacion = 'Alquilada' then (select fechafin::date from contrato where contrato.matricula = moto.matricula)
			else null end as fecha_entrega
		
        FROM moto;
$$;
 &   DROP FUNCTION public.situacionmoto();
       public          postgres    false            �            1255    57496    validatesituation()    FUNCTION     #  CREATE FUNCTION public.validatesituation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
m record;
BEGIN
	select * into m from Moto where matricula = NEW.matricula;
	if m.situacion <> 'Disponible' then
		raise exception 'La moto no esta disponible';
	end if;

	return NEW;
END;
$$;
 *   DROP FUNCTION public.validatesituation();
       public          postgres    false            �            1259    57497    cliente    TABLE     �  CREATE TABLE public.cliente (
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
       public         heap    postgres    false            �            1259    57500    contrato    TABLE     E  CREATE TABLE public.contrato (
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
       public         heap    postgres    false            �            1259    57504    cliente_view    VIEW     �  CREATE VIEW public.cliente_view AS
 SELECT cliente.municipio,
    cliente.nombre,
    cliente.idcliente,
    count(*) AS count,
    sum((((contrato.fechafin - contrato.fechainicio) * 750) + (contrato.diasprorroga * 300))) AS sum
   FROM (public.cliente
     JOIN public.contrato ON (((cliente.idcliente)::text = (contrato.idcliente)::text)))
  GROUP BY cliente.municipio, cliente.nombre, cliente.idcliente
  ORDER BY cliente.municipio;
    DROP VIEW public.cliente_view;
       public          postgres    false    215    216    216    216    215    216    215            �            1259    57509    moto    TABLE       CREATE TABLE public.moto (
    matricula character varying(8) NOT NULL,
    color character varying(15) NOT NULL,
    cantkm double precision DEFAULT 0,
    marca character varying(25) NOT NULL,
    modelo character varying(25) NOT NULL,
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.moto;
       public         heap    postgres    false            �            1259    57513 	   municipio    TABLE     M   CREATE TABLE public.municipio (
    nommun character varying(25) NOT NULL
);
    DROP TABLE public.municipio;
       public         heap    postgres    false            �            1259    57516    cont_mun    VIEW     �  CREATE VIEW public.cont_mun AS
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
       public          postgres    false    216    215    215    216    216    216    219    218    218    218    216    216            �            1259    57521    contrato_view    VIEW     �  CREATE VIEW public.contrato_view AS
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
       public          postgres    false    218    218    215    216    216    216    216    216    218    216    216    215            �            1259    57533    marca    TABLE     K   CREATE TABLE public.marca (
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    57536    modelo    TABLE     z   CREATE TABLE public.modelo (
    nommodelo character varying(25) NOT NULL,
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    57633    contratoxmarca_modelo    VIEW     A  CREATE VIEW public.contratoxmarca_modelo AS
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
       public          postgres    false    216    216    216    216    216    218    218    218    224    225            �            1259    57526 	   formapago    TABLE     P   CREATE TABLE public.formapago (
    formapago character varying(25) NOT NULL
);
    DROP TABLE public.formapago;
       public         heap    postgres    false            �            1259    57529    getclientes    VIEW     P  CREATE VIEW public.getclientes AS
 SELECT cliente.nombre,
    cliente.idcliente,
    public.countcontratos(cliente.idcliente) AS cant_contratos,
    sum(public.calculateimporte(cliente.idcliente, (750)::double precision, (300)::double precision)) AS valor_alquileres
   FROM public.cliente
  GROUP BY cliente.nombre, cliente.idcliente;
    DROP VIEW public.getclientes;
       public          postgres    false    215    250    246    215            �            1259    65637    ingresos_anuales    VIEW     �  CREATE VIEW public.ingresos_anuales AS
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
       public          postgres    false    216    216    216            �            1259    73829    ingresos_municipio    VIEW     �  CREATE VIEW public.ingresos_municipio AS
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
 %   DROP VIEW public.ingresos_municipio;
       public          postgres    false    215    216    215    216    216    216            �            1259    57539 	   moto_view    VIEW     �   CREATE VIEW public.moto_view AS
 SELECT moto.matricula,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cantkm
   FROM public.moto;
    DROP VIEW public.moto_view;
       public          postgres    false    218    218    218    218    218            �            1259    57543 	   situacion    TABLE     P   CREATE TABLE public.situacion (
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.situacion;
       public         heap    postgres    false            �            1259    57546    tipo_usuario    TABLE     k   CREATE TABLE public.tipo_usuario (
    id integer NOT NULL,
    tipo_usuario character varying NOT NULL
);
     DROP TABLE public.tipo_usuario;
       public         heap    postgres    false            �            1259    57551    tipo_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tipo_usuario_id_seq;
       public          postgres    false    228            �           0    0    tipo_usuario_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tipo_usuario_id_seq OWNED BY public.tipo_usuario.id;
          public          postgres    false    229            �            1259    57552    usuario    TABLE       CREATE TABLE public.usuario (
    nombre_usuario character varying(30) NOT NULL,
    contrasenia character varying(8) NOT NULL,
    email character varying(50),
    tipo_usuario integer NOT NULL,
    id_cliente character varying(11),
    municipio character varying(25)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    82022    trabajadores    VIEW     �   CREATE VIEW public.trabajadores AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.email,
    usuario.municipio
   FROM public.usuario
  WHERE (usuario.tipo_usuario = 3);
    DROP VIEW public.trabajadores;
       public          postgres    false    230    230    230    230    230            �            1259    57555    usuario_view    VIEW     �   CREATE VIEW public.usuario_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.email,
    tipo_usuario.tipo_usuario
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)));
    DROP VIEW public.usuario_view;
       public          postgres    false    228    228    230    230    230    230            �           2604    82021    tipo_usuario id    DEFAULT     r   ALTER TABLE ONLY public.tipo_usuario ALTER COLUMN id SET DEFAULT nextval('public.tipo_usuario_id_seq'::regclass);
 >   ALTER TABLE public.tipo_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228            �          0    57497    cliente 
   TABLE DATA           z   COPY public.cliente (idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont) FROM stdin;
    public          postgres    false    215   ~�       �          0    57500    contrato 
   TABLE DATA           |   COPY public.contrato (idcliente, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga) FROM stdin;
    public          postgres    false    216   �       �          0    57526 	   formapago 
   TABLE DATA           .   COPY public.formapago (formapago) FROM stdin;
    public          postgres    false    222   n�       �          0    57533    marca 
   TABLE DATA           )   COPY public.marca (nommarca) FROM stdin;
    public          postgres    false    224   ��       �          0    57536    modelo 
   TABLE DATA           5   COPY public.modelo (nommodelo, nommarca) FROM stdin;
    public          postgres    false    225   ��       �          0    57509    moto 
   TABLE DATA           R   COPY public.moto (matricula, color, cantkm, marca, modelo, situacion) FROM stdin;
    public          postgres    false    218   ��       �          0    57513 	   municipio 
   TABLE DATA           +   COPY public.municipio (nommun) FROM stdin;
    public          postgres    false    219   �       �          0    57543 	   situacion 
   TABLE DATA           .   COPY public.situacion (situacion) FROM stdin;
    public          postgres    false    227          �          0    57546    tipo_usuario 
   TABLE DATA           8   COPY public.tipo_usuario (id, tipo_usuario) FROM stdin;
    public          postgres    false    228   ��       �          0    57552    usuario 
   TABLE DATA           j   COPY public.usuario (nombre_usuario, contrasenia, email, tipo_usuario, id_cliente, municipio) FROM stdin;
    public          postgres    false    230   7�       �           0    0    tipo_usuario_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tipo_usuario_id_seq', 3, true);
          public          postgres    false    229            �           2606    57561    cliente cliente_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (idcliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    215            �           2606    57563    contrato contrato_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_pkey PRIMARY KEY (fechafirma);
 @   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_pkey;
       public            postgres    false    216            �           2606    57565    formapago formapago_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.formapago
    ADD CONSTRAINT formapago_pkey PRIMARY KEY (formapago);
 B   ALTER TABLE ONLY public.formapago DROP CONSTRAINT formapago_pkey;
       public            postgres    false    222            �           2606    57567    marca marca_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (nommarca);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            postgres    false    224            �           2606    57569    modelo modelo_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (nommodelo);
 <   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_pkey;
       public            postgres    false    225            �           2606    57571    moto moto_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_pkey PRIMARY KEY (matricula);
 8   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_pkey;
       public            postgres    false    218            �           2606    57573    municipio municipio_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.municipio
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (nommun);
 B   ALTER TABLE ONLY public.municipio DROP CONSTRAINT municipio_pkey;
       public            postgres    false    219            �           2606    57575    situacion situacion_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.situacion
    ADD CONSTRAINT situacion_pkey PRIMARY KEY (situacion);
 B   ALTER TABLE ONLY public.situacion DROP CONSTRAINT situacion_pkey;
       public            postgres    false    227            �           2606    57577    tipo_usuario tipo_usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tipo_usuario
    ADD CONSTRAINT tipo_usuario_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tipo_usuario DROP CONSTRAINT tipo_usuario_pkey;
       public            postgres    false    228            �           2606    57579    usuario usuario_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (nombre_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    230            �           2620    57580    contrato tg_changesituation    TRIGGER     {   CREATE TRIGGER tg_changesituation BEFORE INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.changesituation();
 4   DROP TRIGGER tg_changesituation ON public.contrato;
       public          postgres    false    216    247            �           2620    57581 !   cliente tg_deletecontratoscliente    TRIGGER     �   CREATE TRIGGER tg_deletecontratoscliente AFTER DELETE ON public.cliente FOR EACH ROW EXECUTE FUNCTION public.deletecontratoscliente();
 :   DROP TRIGGER tg_deletecontratoscliente ON public.cliente;
       public          postgres    false    251    215            �           2620    57582    contrato tg_validatesituation    TRIGGER     ~   CREATE TRIGGER tg_validatesituation AFTER INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.validatesituation();
 6   DROP TRIGGER tg_validatesituation ON public.contrato;
       public          postgres    false    216    254            �           2606    57583    cliente cliente_municipio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_municipio_fkey FOREIGN KEY (municipio) REFERENCES public.municipio(nommun);
 H   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_municipio_fkey;
       public          postgres    false    219    215    3279            �           2606    57588     contrato contrato_formapago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_formapago_fkey FOREIGN KEY (formapago) REFERENCES public.formapago(formapago);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_formapago_fkey;
       public          postgres    false    216    3281    222            �           2606    57593     contrato contrato_idcliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.cliente(idcliente);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_idcliente_fkey;
       public          postgres    false    3273    215    216            �           2606    57598     contrato contrato_matricula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_matricula_fkey FOREIGN KEY (matricula) REFERENCES public.moto(matricula);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_matricula_fkey;
       public          postgres    false    218    3277    216            �           2606    57603    modelo modelo_nommarca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_nommarca_fkey FOREIGN KEY (nommarca) REFERENCES public.marca(nommarca);
 E   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_nommarca_fkey;
       public          postgres    false    225    224    3283            �           2606    57608    moto moto_marca_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_marca_fkey FOREIGN KEY (marca) REFERENCES public.marca(nommarca);
 >   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_marca_fkey;
       public          postgres    false    218    224    3283            �           2606    57613    moto moto_modelo_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_modelo_fkey FOREIGN KEY (modelo) REFERENCES public.modelo(nommodelo);
 ?   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_modelo_fkey;
       public          postgres    false    225    218    3285            �           2606    57618    moto moto_situacion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_situacion_fkey FOREIGN KEY (situacion) REFERENCES public.situacion(situacion);
 B   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_situacion_fkey;
       public          postgres    false    218    3287    227            �           2606    57623    usuario usuario_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(idcliente);
 I   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_id_cliente_fkey;
       public          postgres    false    230    3273    215            �           2606    57628 !   usuario usuario_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_tipo_usuario_fkey FOREIGN KEY (tipo_usuario) REFERENCES public.tipo_usuario(id);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_tipo_usuario_fkey;
       public          postgres    false    3289    228    230            �   ]  x�]T�r�6>/�BO��/%Yv�ر�J�K/ �!S���Q��9���A�P����nk�䌵Rr�-�!��|��Gx�9�<�]�!�6�Ÿ���;=܂2�X�dc-k���M�D���J	����OƔ�-<��g�g�+��8�,�J�`��a=�z"8��;D��]@2x�����HIg����},�7>��R~�3 L�|�� ���r�V�R�_ȉ�%F�]>�<pY0�8.)�g�-�)�g�W��r�2V&�Q�*��@��<�B�'���;/+��ͼڕ	�v�����0&xKM��;F��Äa�|��}�7��
h�t��
�p�X#�m���ʔ�5�x.�H����~Ip}&H#�h���X�t�4�Oe�a���B��s-�#g�������k������F��ܐ�)��<����B��f|G|����3h"v�ɝ�S�C*G�I?������6!�a��~�.*y����}(5E�
Ù5�KC)�B*���!ܐ?J1~�q��S�Z=|�q��B�8'�\�YkZR��8b�y����|�;~����(�� +�7�q���j_s8���%��p�f�ӱCx�c��0"(��%������U	��kE�e�WS,-ޔӒ�{����
���>��K�I��g��>��S�� ��X7��FB��e����i�G�SN�VQBq]c�ɤ��zH����<�H'b
���Z�_�-m��W"�"T��D�X��lg*u���qZ����^�R�E�W���ܙ���ɑ����Ҍ��u����տ�����J�X���i��5S�Dؽ�]�HT7�u����:Y:��I���[�4$,ti      �   s   x���11k�| h�NS�P��C�H�t'D�N�43��p�N9�v�nUVX�7��,H9ަ�s��4�D�?�fɵ�ڗ�"iHg�� -~��� �<�p\/{U}�b3�      �   0   x�s�H-,M�
I,�J-ITHIUp.JM�,��rMKM.�,������ >�      �   8   x�S�H,�I��uI,�L)������KI�L�M�H�r�W��/�/*JL����� �
D      �   �   x�s��IQ��K����KI�rL+�LNT)�̃�8;���9A�AA
n�E�I9�)�0� 7S(/2�M7Ȑ32171#��7D���	I=Ә�E@�`n` ��D�ܢt,4@:-5a�1z\\\ )�50      �   �   x�u˱�0���+��Њ#�h�P5qy�k*�$,~�,��tN�j�+��̨La,\{�!�^��8�I�9&�YtN]+4�9��k�""��>N���a],)mqÔ�	W~�q9�-�Z��^�x+�_�>4      �   �   x�-�A�@C�=Ŝ���]�MX�)�Cƌ�ϰ�ky/�]5�m�Rb2u'v�D�"Z8�
�ۺAܥOsg�_/;��$��"�j�ρ�|�p�3u앨�*?Wqct��<��4��(�tQw�1>�R2�Ԥ��O[/9�o |b=_      �   )   x�I��I-�r�),��ILI�r�,.���L�I����� �a
�      �   ,   x�3�tL����2�t��L�+I�2�)JLJ�JL�/����� ��
      �   @   x���/NuL����4016���41~\n�Ey���E٩E��F�& ac���������� 2o�     