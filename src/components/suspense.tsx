import { CircularProgress } from '@mui/material';

const SuspenseComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    );
};

export default SuspenseComponent;
