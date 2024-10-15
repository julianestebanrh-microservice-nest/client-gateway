<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Client Gateway Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. Ejecutar `npm run start:dev`

## Nats

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
