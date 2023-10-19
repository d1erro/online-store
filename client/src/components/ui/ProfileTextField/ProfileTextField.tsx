import { FC } from 'react';
import { TextField } from '@mui/material';

export interface IProfileTextFieldProps {
    id: string;
    label: string;
    defaultValue: string;
    disabled: boolean;
}

const ProfileTextField: FC<IProfileTextFieldProps> = ({
    id,
    label,
    defaultValue,
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
            defaultValue={defaultValue}
            variant="outlined"
        />
    );
};

export default ProfileTextField;
