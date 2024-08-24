Inicialmente antes de ejecutar el proyecto, teclear el comando npm install con internet y vpn para instalar dependencias(Son una pila).
Despues ejecutar npm run dev, para ejecutar el proyecto tanto el front como el back. El back se ejecuta en http://localhost:3000
y el front en http://localhost:5173 (Señores es copiar la dirrecion despues de ejecutar el comando en dos pestañas del navegador y listo). 


# Rutas API BACKEND
## Cliente
http://localhost:3000/api/moto/client GET
http://localhost:3000/api/moto/client/pdf GET
http://localhost:3000/api/moto/client/bad GET
http://localhost:3000/api/moto/client POST
http://localhost:3000/api/moto/client/:id DELETE
http://localhost:3000/api/moto/client/:id PATCH

## Contrato
http://localhost:3000/api/contract GET
http://localhost:3000/api/contract/pdf GET
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