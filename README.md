Inicialmente antes de ejecutar el proyecto, teclear el comando npm install con internet y vpn para instalar dependencias(Son una pila).
Despues ejecutar npm run dev, para ejecutar el proyecto tanto el front como el back. El back se ejecuta en http://localhost:3000
y el front en http://localhost:5173 (Señores es copiar la dirrecion despues de ejecutar el comando en dos pestañas del navegador y listo). 


## Consultas Faltantes
http://localhost:3000/api/user/worker GET Listado de trabajadores
http://localhost:3000/api/pagos GET Importe general para el administrador
http://localhost:3000/api/pagos/:mun GET Falta definir la vista pagos_mun_view en postgres, y con eso funcionara
http://localhost:3000/api/contract/:id GET obtener todos los contratos de un cliente


## Necesario Revisar
- Llenar las tablas mediante la aplicación
- Realizar pruebas de inserción y modificación
- Anotar y manejar las excepciones que pasen
- Pulir cualquier detalle necesario
- Buscar una forma que cuando ocurra un error 500 desde el Front reiniciar el servidor (MUY OPCIONAL)
- Evitar tener que refrescar la pantalla cada vez que se modifique, elimine o cree una entidad, solucionar eso (OPCIONAL)

## Rutas PDF Faltantes
- http://localhost:3000/api/contract/worker/pdf/:mun Obtener PDF de los contratos segun el municipio
- http://localhost:3000/api/client/worker/pdf/:mun Obtener PDF de los clientes segun el municipio
- http://localhost:3000/api/pagos/worker/pdf/:mun Obtener PDF de los pagos mensuales
# Rutas API BACKEND
## Cliente
http://localhost:3000/api/client GET
http://localhost:3000/api/client/mun/:mun GET NEW
http://localhost:3000/api/client/pdf GET
http://localhost:3000/api/client/worker/pdf/:mun GET NEW
http://localhost:3000/api/client/bad GET
http://localhost:3000/api/client POST
http://localhost:3000/api/client/:id DELETE
http://localhost:3000/api/client/:id PATCH

## Contrato
http://localhost:3000/api/contract GET
http://localhost:3000/api/contract/worker/:mun GET NEW
http://localhost:3000/api/contract/pdf GET
http://localhost:3000/api/contract/worker/pdf/:mun GET NEW
http://localhost:3000/api/contract/mun GET
http://localhost:3000/api/contract/marcxmodel GET
http://localhost:3000/api/contract POST
http://localhost:3000/api/contract/:idCliente/:matricula DELETE
http://localhost:3000/api/contract/:idCliente/:matricula PATCH

## Moto
http://localhost:3000/api/moto GET
http://localhost:3000/api/moto/pdf GET
http://localhost:3000/api/moto/situation GET
http://localhost:3000/api/moto POST
http://localhost:3000/api/moto/:id DELETE
http://localhost:3000/api/moto/:id PATCH

## Usuarios
http://localhost:3000/api/user POST
http://localhost:3000/api/user/client POST
http://localhost:3000/api/user/worker POST
http://localhost:3000/api/user/worker GET
http://localhost:3000/api/user/:userName Delete

## Forma Pago
http://localhost:3000/api/formaPago GET
http://localhost:3000/api/formaPago POST
http://localhost:3000/api/formaPago/:form DELETE
http://localhost:3000/api/formaPago/:id PATCH

## Modelo
http://localhost:3000/api/model GET
http://localhost:3000/api/model POST
http://localhost:3000/api/model/:id DELETE
http://localhost:3000/api/model/:id PATCH

## Marca
http://localhost:3000/api/marc GET
http://localhost:3000/api/marc POST
http://localhost:3000/api/marc/:id DELETE
http://localhost:3000/api/marc/:id PATCH

## Municipio
http://localhost:3000/api/mun GET

## Situation
http://localhost:3000/api/situation GET

## Pagos
http://localhost:3000/api/pagos GET
http://localhost:3000/api/pagos/:mun GET
