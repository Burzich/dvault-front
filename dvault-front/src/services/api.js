import axios from 'axios';

// api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
var ROOT_TOKEN = '';
export let IS_INIT = false;
export let FIRST_INIT = false;

// serg
export const initializeVault = async () => {
    if (!IS_INIT) {
        try {
            const initResponse = await axios.post(`${API_BASE_URL}/sys/init`);
            // status по /v1/sys/seal-status
            const data = initResponse.data;
            if (data.errors && data.errors.includes('already initialized')){
                console.log('Vault already initialized. Not first.');
                IS_INIT = true;
            } else {
                const { root_token, keys } = data;
    
                ROOT_TOKEN = root_token;
                IS_INIT = true;
                FIRST_INIT = true
                
                const firstKey = keys[0];
                const secondKey = keys[1];
                
                console.log(`ROOT_TOKEN: ${ROOT_TOKEN}`);
                console.log(`First Key: ${firstKey}`);
                console.log(`Second Key: ${secondKey}`);
                
                await axios.post(`${API_BASE_URL}/sys/unseal`, { key: firstKey });
                await axios.post(`${API_BASE_URL}/sys/unseal`, { key: secondKey });
                
                console.log('Vault init success');
            }
        } catch (error) {
            console.error('error init Vault:', error);
        }
    } else {
        console.log('Vault was init');
    }
};

//initializeVault();

// serg end

// Получение списка секретов
export const fetchSecrets = async () => {
    try {
        console.log("", `${API_BASE_URL}`)
        const response = await fetch(`${API_BASE_URL}/sys/mounts`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'X-Vault-Token': 'hvs.eLNSDATfuaG9xmJTBrqprFo3'
            }
        });
        const data = await response.json();

        // Преобразуем объект в массив секретов с названием и описанием
        const secretsArray = Object.keys(data.data).map(key => ({
            title: key,
            description: data.data[key].description
        }));

        return secretsArray;
    } catch (error) {
        console.error('Ошибка при получении списка секретов:', error);
        throw error;
    }
};

// Создание нового секрета
export const createSecret = async (newSecret) => {
    try {
        const response = await fetch(`${API_BASE_URL}/mounts`, {
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
  const response = await axios.post(`${API_BASE_URL}/token`, {
    token,
  });
  return response.data;
};

// Для хеша
export const hashText = async (algorithm, format, inputText) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hash`, {
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
