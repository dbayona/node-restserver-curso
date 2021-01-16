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

## Google Sign In

https://console.developers.google.com/

Si se presenta el siguiente mensaje de error en la consola del explorador:
- Not a valid origin for the client: url has not been whitelisted for client ID “ID”

Se deben seguir los siguientes pasos

1. Activate both Analytics and Google Plus APIs on your project
   - Google Analytics API
   - Google+ API
2. Create new OAUTH 2.0 client credentials
   Add the Authorized Javascript Origins under Restrictions section
3. Use the new client id.
