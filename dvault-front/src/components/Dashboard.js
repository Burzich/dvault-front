import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, List, ListItem, ListItemText, Grid2 } from '@mui/material';
import Secret from './Items/Secret';

const Dashboard = () => {
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
        : [];

    return (
        <Box sx={{ 
            padding: '20px',
            pl: '70px' 
            }}>
            {/* Заголовок */}
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            <Divider />

            {/* Основной контент в двух колонках */}
            <Grid2 
                container 
                spacing={2} 
                sx={{ 
                    mt: '20px',
                }}>
                
                {/* Левая зона - список секретов */}
                <Grid2 xs={12} md={6} sx={{width: '48%'}}>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                margin: '10px'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                component="h2"
                                sx={{
                                    pb: '10px',
                                    
                                }}
                            >
                                Secrets List
                            </Typography>
                            <List>
                                {secrets.map((secret, index) => (
                                    <ListItem key={index} 
                                        sx={{
                                            borderTop: '1px solid #ccc'
                                        }}
                                    >
                                        <Secret
                                            key={index}
                                            title={secret.title}
                                            description={secret.description}
                                            onView={() => alert(`Viewing ${secret.title}`)} // Функция для кнопки
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Grid2>

                {/* Правая зона - поиск секретов */}
                <Grid2 xs={12} md={6} sx={{width: '48%'}}>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                margin: '10px'
                            }}
                        >
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
    
                            <List>
                                {filteredSecrets.length > 0 ? (
                                    filteredSecrets.map((secret, index) => (
                                        <ListItem key={index}
                                            sx={{
                                                borderTop: '1px solid #ccc'
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
                                    <Typography variant="body2"></Typography>
                                )}
                            </List>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Dashboard;
