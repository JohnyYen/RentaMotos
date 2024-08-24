PGDMP                         |        
   RentaMotos    15.1    15.1 =    k           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            l           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            m           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            n           1262    24731 
   RentaMotos    DATABASE     ~   CREATE DATABASE "RentaMotos" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Cuba.1252';
    DROP DATABASE "RentaMotos";
                postgres    false                        3079    24757 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            o           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
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
       public          postgres    false            �            1255    41908 "   getcontratobyid(character varying)    FUNCTION     �   CREATE FUNCTION public.getcontratobyid(id character varying) RETURNS void
    LANGUAGE sql
    AS $$
 select * from contrato	inner join cliente on contrato.idcliente = cliente.idcliente
 where cliente.idcliente = id;
$$;
 <   DROP FUNCTION public.getcontratobyid(id character varying);
       public          postgres    false            �            1255    41943    validatesituation()    FUNCTION     #  CREATE FUNCTION public.validatesituation() RETURNS trigger
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
       public         heap    postgres    false            �            1259    24788    moto    TABLE       CREATE TABLE public.moto (
    matricula character varying(8) NOT NULL,
    color character varying(15) NOT NULL,
    cantkm double precision DEFAULT 0,
    marca character varying(25) NOT NULL,
    modelo character varying(25) NOT NULL,
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.moto;
       public         heap    postgres    false            �            1259    42079    contrato_view    VIEW     �  CREATE VIEW public.contrato_view AS
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
       public          postgres    false    222    222    222    222    222    220    220    220    219    219    222    222            �            1259    24809 	   formapago    TABLE     P   CREATE TABLE public.formapago (
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
       public          postgres    false    219    219    243    241            �            1259    24737    marca    TABLE     K   CREATE TABLE public.marca (
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    24747    modelo    TABLE     z   CREATE TABLE public.modelo (
    nommodelo character varying(25) NOT NULL,
    nommarca character varying(25) NOT NULL
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    42075 	   moto_view    VIEW     �   CREATE VIEW public.moto_view AS
 SELECT moto.matricula,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cantkm
   FROM public.moto;
    DROP VIEW public.moto_view;
       public          postgres    false    220    220    220    220    220            �            1259    24732 	   municipio    TABLE     M   CREATE TABLE public.municipio (
    nommun character varying(25) NOT NULL
);
    DROP TABLE public.municipio;
       public         heap    postgres    false            �            1259    24768 	   situacion    TABLE     P   CREATE TABLE public.situacion (
    situacion character varying(25) NOT NULL
);
    DROP TABLE public.situacion;
       public         heap    postgres    false            �            1259    41910    tipo_usuario    TABLE     k   CREATE TABLE public.tipo_usuario (
    id integer NOT NULL,
    tipo_usuario character varying NOT NULL
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
       public          postgres    false    224            p           0    0    tipo_usuario_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tipo_usuario_id_seq OWNED BY public.tipo_usuario.id;
          public          postgres    false    223            �            1259    42086    usuario    TABLE     �   CREATE TABLE public.usuario (
    nombre_usuario character varying(30) NOT NULL,
    contrasenia character varying(8) NOT NULL,
    email character varying(50),
    tipo_usuario integer NOT NULL,
    id_cliente character varying(11)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    42101    usuario_view    VIEW     �   CREATE VIEW public.usuario_view AS
 SELECT usuario.nombre_usuario,
    usuario.contrasenia,
    usuario.email,
    tipo_usuario.tipo_usuario
   FROM (public.usuario
     JOIN public.tipo_usuario ON ((usuario.tipo_usuario = tipo_usuario.id)));
    DROP VIEW public.usuario_view;
       public          postgres    false    228    228    228    228    224    224            �           2604    41913    tipo_usuario id    DEFAULT     r   ALTER TABLE ONLY public.tipo_usuario ALTER COLUMN id SET DEFAULT nextval('public.tipo_usuario_id_seq'::regclass);
 >   ALTER TABLE public.tipo_usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            b          0    24778    cliente 
   TABLE DATA           z   COPY public.cliente (idcliente, nombre, segnombre, primapellido, segapellido, edad, municipio, sexo, numcont) FROM stdin;
    public          postgres    false    219   vO       e          0    24814    contrato 
   TABLE DATA           |   COPY public.contrato (idcliente, matricula, fechainicio, fechafin, fechafirma, formapago, seguro, diasprorroga) FROM stdin;
    public          postgres    false    222   �R       d          0    24809 	   formapago 
   TABLE DATA           .   COPY public.formapago (formapago) FROM stdin;
    public          postgres    false    221   fS       _          0    24737    marca 
   TABLE DATA           )   COPY public.marca (nommarca) FROM stdin;
    public          postgres    false    216   �S       `          0    24747    modelo 
   TABLE DATA           5   COPY public.modelo (nommodelo, nommarca) FROM stdin;
    public          postgres    false    217   �S       c          0    24788    moto 
   TABLE DATA           R   COPY public.moto (matricula, color, cantkm, marca, modelo, situacion) FROM stdin;
    public          postgres    false    220   �T       ^          0    24732 	   municipio 
   TABLE DATA           +   COPY public.municipio (nommun) FROM stdin;
    public          postgres    false    215   U       a          0    24768 	   situacion 
   TABLE DATA           .   COPY public.situacion (situacion) FROM stdin;
    public          postgres    false    218   �U       g          0    41910    tipo_usuario 
   TABLE DATA           8   COPY public.tipo_usuario (id, tipo_usuario) FROM stdin;
    public          postgres    false    224   �U       h          0    42086    usuario 
   TABLE DATA           _   COPY public.usuario (nombre_usuario, contrasenia, email, tipo_usuario, id_cliente) FROM stdin;
    public          postgres    false    228   /V       q           0    0    tipo_usuario_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tipo_usuario_id_seq', 3, true);
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
       public            postgres    false    228            �           2620    41945    contrato tg_changesituation    TRIGGER     {   CREATE TRIGGER tg_changesituation BEFORE INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.changesituation();
 4   DROP TRIGGER tg_changesituation ON public.contrato;
       public          postgres    false    222    242            �           2620    41944    contrato tg_validatesituation    TRIGGER     ~   CREATE TRIGGER tg_validatesituation AFTER INSERT ON public.contrato FOR EACH ROW EXECUTE FUNCTION public.validatesituation();
 6   DROP TRIGGER tg_validatesituation ON public.contrato;
       public          postgres    false    222    244            �           2606    24783    cliente cliente_municipio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_municipio_fkey FOREIGN KEY (municipio) REFERENCES public.municipio(nommun);
 H   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_municipio_fkey;
       public          postgres    false    3245    215    219            �           2606    24830     contrato contrato_formapago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_formapago_fkey FOREIGN KEY (formapago) REFERENCES public.formapago(formapago);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_formapago_fkey;
       public          postgres    false    221    222    3257            �           2606    24820     contrato contrato_idcliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.cliente(idcliente);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_idcliente_fkey;
       public          postgres    false    222    219    3253            �           2606    24825     contrato contrato_matricula_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contrato
    ADD CONSTRAINT contrato_matricula_fkey FOREIGN KEY (matricula) REFERENCES public.moto(matricula);
 J   ALTER TABLE ONLY public.contrato DROP CONSTRAINT contrato_matricula_fkey;
       public          postgres    false    3255    222    220            �           2606    24752    modelo modelo_nommarca_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_nommarca_fkey FOREIGN KEY (nommarca) REFERENCES public.marca(nommarca);
 E   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_nommarca_fkey;
       public          postgres    false    216    3247    217            �           2606    24794    moto moto_marca_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_marca_fkey FOREIGN KEY (marca) REFERENCES public.marca(nommarca);
 >   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_marca_fkey;
       public          postgres    false    216    220    3247            �           2606    24799    moto moto_modelo_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_modelo_fkey FOREIGN KEY (modelo) REFERENCES public.modelo(nommodelo);
 ?   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_modelo_fkey;
       public          postgres    false    220    217    3249            �           2606    24804    moto moto_situacion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.moto
    ADD CONSTRAINT moto_situacion_fkey FOREIGN KEY (situacion) REFERENCES public.situacion(situacion);
 B   ALTER TABLE ONLY public.moto DROP CONSTRAINT moto_situacion_fkey;
       public          postgres    false    218    3251    220            �           2606    42096    usuario usuario_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(idcliente);
 I   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_id_cliente_fkey;
       public          postgres    false    219    3253    228            �           2606    42091 !   usuario usuario_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_tipo_usuario_fkey FOREIGN KEY (tipo_usuario) REFERENCES public.tipo_usuario(id);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_tipo_usuario_fkey;
       public          postgres    false    3261    224    228            b   ]  x�]T�r�6>/�BO��/%Yv�ر�J�K/ �!S���Q��9���A�P����nk�䌵Rr�-�!��|��Gx�9�<�]�!�6�Ÿ���;=܂2�X�dc-k���M�D���J	����OƔ�-<��g�g�+��8�,�J�`��a=�z"8��;D��]@2x�����HIg����},�7>��R~�3 L�|�� ���r�V�R�_ȉ�%F�]>�<pY0�8.)�g�-�)�g�W��r�2V&�Q�*��@��<�B�'���;/+��ͼڕ	�v�����0&xKM��;F��Äa�|��}�7��
h�t��
�p�X#�m���ʔ�5�x.�H����~Ip}&H#�h���X�t�4�Oe�a���B��s-�#g�������k������F��ܐ�)��<����B��f|G|����3h"v�ɝ�S�C*G�I?������6!�a��~�.*y����}(5E�
Ù5�KC)�B*���!ܐ?J1~�q��S�Z=|�q��B�8'�\�YkZR��8b�y����|�;~����(�� +�7�q���j_s8���%��p�f�ӱCx�c��0"(��%������U	��kE�e�WS,-ޔӒ�{����
���>��K�I��g��>��S�� ��X7��FB��e����i�G�SN�VQBq]c�ɤ��zH����<�H'b
���Z�_�-m��W"�"T��D�X��lg*u���qZ����^�R�E�W���ܙ���ɑ����Ҍ��u����տ�����J�X���i��5S�Dؽ�]�HT7�u����:Y:��I���[�4$,ti      e   s   x���11k�| h�NS�P��C�H�t'D�N�43��p�N9�v�nUVX�7��,H9ަ�s��4�D�?�fɵ�ڗ�"iHg�� -~��� �<�p\/{U}�b3�      d   0   x�KMKM.�,��r�H-,M�
I,�J-ITHIUp.JM�,������ '/      _   8   x�S�H,�I��uI,�L)������KI�L�M�H�r�W��/�/*JL����� �
D      `   �   x�s��IQ��K����KI�rL+�LNT)�̃�8;���9A�AA
n�E�I9�)�0� 7S(/2�M7Ȑ32171#��7D���	I=Ә�E@�`n` ��D�ܢt,4@:-5a�1z\\\ )�50      c   �   x�u˱�0���+��Њ#�h�P5qy�k*�$,~�,��tN�j�+��̨La,\{�!�^��8�I�9&�YtN]+4�9��k�""��>N���a],)mqÔ�	W~�q9�-�Z��^�x+�_�>4      ^   �   x�-�A�@C�=Ŝ���]�MX�)�Cƌ�ϰ�ky/�]5�m�Rb2u'v�D�"Z8�
�ۺAܥOsg�_/;��$��"�j�ρ�|�p�3u앨�*?Wqct��<��4��(�tQw�1>�R2�Ԥ��O[/9�o |b=_      a   )   x�I��I-�r�),��ILI�r�,.���L�I����� �a
�      g   ,   x�3�tL����2�t��L�+I�2�)JLJ�JL�/����� ��
      h   "   x���/NuL����4016���4\1z\\\ t&�     