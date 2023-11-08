import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default Loader;
