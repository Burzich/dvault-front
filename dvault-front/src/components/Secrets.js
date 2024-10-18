import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, List, ListItem, Button, Grid } from '@mui/material';
import Secret from './Items/Secret';

const Secrets = () => {
    // Состояние для секретов и поиска
    const [secrets, setSecrets] = useState([
        { title: 'Secret 1', description: 'Description for Secret 1' },
        { title: 'Secret 2', description: 'Description for Secret 2' },
        { title: 'Secret 3', description: 'Description for Secret 3' },
        { title: 'Secret 4', description: 'Description for Secret 4' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Обработчик создания нового секрета (можно заменить модальным окном или редиректом на форму)
    const handleCreateSecret = () => {
        alert('Creating new secret...');
    };

    return (
        <Box sx={{ padding: '20px', pl: '70px' }}>
            {/* Заголовок */}
            <Typography variant="h4" component="h1" gutterBottom>
                Secrets
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Grid для размещения кнопки и поиска в одной строке */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Поле для поиска по названию */}
                <Grid item xs={12} md={10}>
                    <TextField
                        label="Search Secrets"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid>

                {/* Кнопка создания нового секрета */}
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateSecret}
                        fullWidth
                        sx={{
                            height: '100%'
                        }}
                    >
                        Create New Secret
                    </Button>
                </Grid>
            </Grid>

            {/* Основной контент - список секретов */}
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                    <Typography variant="h6" component="h2" sx={{ pb: '10px' }}>
                        Secrets List
                    </Typography>
                    <List>
                        {filteredSecrets.length > 0 ? (
                            filteredSecrets.map((secret, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        borderTop: index !== 0 ? '1px solid #ccc' : 'none',
                                    }}
                                >
                                    <Secret
                                        key={index}
                                        title={secret.title}
                                        description={secret.description}
                                        onView={() => alert(`Viewing ${secret.title}`)} // Функция для кнопки
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2">No secrets found.</Typography>
                        )}
                    </List>
                </Box>
            </Grid>
        </Box>
    );
};

export default Secrets;
