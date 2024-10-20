import axios from 'axios';

// api.js

// const API_BASE_URL = 'http://your-api-url.com/v1'; // Замените на свой реальный URL
const API_BASE_URL = process.env.API_BASE_URL;

// Получение списка секретов
export const fetchSecrets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/secrets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.secrets;
    } catch (error) {
        console.error('Ошибка при получении списка секретов:', error);
        throw error;
    }
};

// Создание нового секрета
export const createSecret = async (newSecret) => {
    try {
        const response = await fetch(`${API_BASE_URL}/secrets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSecret)
        });
        if (!response.ok) {
            throw new Error('Ошибка при создании секрета');
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при создании нового секрета:', error);
        throw error;
    }
};

// Пример запроса на сервер для логина
export const apiLogin = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

// Пример запроса на сервер для проверки токена
export const apiVerifyToken = async (token) => {
  const response = await axios.post(`${API_BASE_URL}/verify-token`, {
    token,
  });
  return response.data;
};

// Для хеша
export const hashText = async (algorithm, format, inputText) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hashing`, {
            algorithm: algorithm,
            format: format,
            input: inputText
        });
        return response.data.sum;
    } catch (error) {
        console.error('Ошибка при хешировании:', error);
        throw new Error('Error generating hash.');
    }
};
