import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, List, ListItem, Grid2 } from '@mui/material';
import Secret from './Items/Secret';
import { fetchSecrets } from '../services/api'; // Импортируем API функции

const Dashboard = () => {
    // Состояние для секретов и поиска
    const [secrets, setSecrets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Получение секретов через API при загрузке компонента
    useEffect(() => {
        const loadSecrets = async () => {
            setLoading(true);
            try {
                const secretsFromApi = await fetchSecrets();
                setSecrets(secretsFromApi);
            } catch (error) {
                console.error('Ошибка загрузки секретов:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSecrets();
    }, []);

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Фильтрация секретов по поисковому запросу
    const filteredSecrets = searchTerm
        ? secrets.filter(secret =>
            secret.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : secrets;

    return (
        <Box sx={{ padding: '20px', pl: '70px' }}>
            {/* Заголовок */}
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            <Divider />

            {/* Основной контент в двух колонках */}
            <Grid2 container spacing={2} sx={{ mt: '20px' }}>
                {/* Левая зона - список секретов */}
                <Grid2 xs={12} md={6} sx={{ width: '48%' }}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '10px' }}>
                        <Box sx={{ margin: '10px' }}>
                            <Typography variant="h6" component="h2" sx={{ pb: '10px' }}>
                                Secrets List
                            </Typography>
                            <List>
                                {loading ? (
                                    <Typography variant="body2">Loading...</Typography>
                                ) : (
                                    filteredSecrets.map((secret, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{ borderTop: '1px solid #ccc' }}
                                        >
                                            <Secret
                                                title={secret.title}
                                                description={secret.description}
                                                onView={() => alert(`Viewing ${secret.title}`)}
                                            />
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Box>
                    </Box>
                </Grid2>

                {/* Правая зона - поиск секретов */}
                <Grid2 xs={12} md={6} sx={{ width: '48%' }}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '10px' }}>
                        <Box sx={{ margin: '10px' }}>
                            <Typography variant="h6" component="h2">
                                Search Secrets
                            </Typography>
                            <TextField
                                fullWidth
                                label="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Dashboard;
