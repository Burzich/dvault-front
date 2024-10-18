import axios from 'axios';

// Пример запроса на сервер для логина
export const apiLogin = async (username, password) => {
  const response = await axios.post('http://your-backend-url.com/login', {
    username,
    password,
  });
  return response.data;
};

// Пример запроса на сервер для проверки токена
export const apiVerifyToken = async (token) => {
  const response = await axios.post('http://your-backend-url.com/verify-token', {
    token,
  });
  return response.data;
};
