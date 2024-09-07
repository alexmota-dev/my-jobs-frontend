import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { theme } from '../../Theme';

export function InputTextField({ onChange, label, error, value, type }: { onChange: Function, label: string, error?: string, value?: string, type?: string }) {
    return (
        <ThemeProvider theme={theme}>
            <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: '100%'}}>
                <TextField
                    type={type ?? 'text'} 
                    color='primary'
                    value={value} 
                    error={!!error} 
                    helperText={error} 
                    id="outlined-basic" 
                    label={value ? '' : label} 
                    variant="outlined" 
                    onChange={(e) => onChange(e.currentTarget.value)}
                    style={{ margin: '1vh 0 1vh 0' }} />
            </div>
        </ThemeProvider>
    )
}