# dvault-front

```
docker build -t dvault_front:v1.0 --build-arg API_BASE_URL=$API_BASE_URL .
```

```
docker run --name  dvault_front -p 3000:3000 -d dvault_front:v1.0 
```

---
step with caddy

```
docker build -t dvault_front:v1.0 --build-arg API_BASE_URL=$API_BASE_URL .
```

```
docker run --name dvault_front -p 80:80 dvault_front:v1.0
```
