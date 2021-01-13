## Rest Server - Configuraciones Iniciales

```
npm install

```

## Para subir a Heroku

```
git push heroku main
```

## Comandos para crear variables en Heroku

```
heroku config:set MONGO_URI="XXXXXXX"
 
    heroku config:get nombre
    heroku config:unset nombre
    heroku config:set nombre="DB"
```