import { FC } from 'react';
import { TextField } from '@mui/material';

export interface IProfileTextFieldProps {
    id: string;
    label: string;
    disabled: boolean;
    helperText: any;
    error: boolean;
}

const ProfileTextField: FC<IProfileTextFieldProps> = ({
    id,
    label,
    disabled,
    helperText,
    error,
    ...field
}) => {
    return (
        <TextField
            InputLabelProps={{ shrink: true }}
            {...field}
            fullWidth
            id={id}
            label={label}
            variant="outlined"
            disabled={disabled}
            helperText={helperText}
            error={error}
        />
    );
};

export default ProfileTextField;
