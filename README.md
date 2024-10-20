# dvault-front

Step with caddy

```
docker build -t dvault_front:v1.0 --build-arg API_BASE_URL=$API_BASE_URL .
```

```
docker run --name dvault_front -p 80:80 -d dvault_front:v1.0
```
