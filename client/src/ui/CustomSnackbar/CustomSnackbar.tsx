import { Alert, Snackbar } from '@mui/material';
import { SyntheticEvent } from 'react';

function CustomSnackbar({
    open,
    handleClose,
    message,
    success,
}: {
    open: boolean;
    handleClose: (e: SyntheticEvent | Event, reason?: string) => void;
    message: string;
    success: boolean;
}) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={success ? 'success' : 'error'}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;
