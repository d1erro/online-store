import { FC } from 'react';
import { TextField } from '@mui/material';

export interface IProfileTextFieldProps {
    id: string;
    label: string;
    disabled: boolean;
}

const ProfileTextField: FC<IProfileTextFieldProps> = ({
    id,
    label,
    disabled,
    ...field
}) => {
    return (
        <TextField
            InputLabelProps={{ shrink: true }}
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
            {...field}
            id={id}
            disabled={disabled}
            label={label}
            variant="outlined"
        />
    );
};

export default ProfileTextField;
