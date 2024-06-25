import { Card, Input, Button, Form, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
interface IProps {
    loading?: boolean;
    error?: string | null;
    handleRegistration: (credentials: INewUser) => void;
}

interface INewUser {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegistrationForm({
    loading,
    error,
    handleRegistration,
}: IProps) {
    const { handleSubmit, control } = useForm<INewUser>();

    const [registrationForm, setRegistrationForm] = useState<INewUser>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    function onRegistration() {
        handleRegistration(registrationForm);
    }

    return (
        <Card bordered title="Register">
            <Alert message={error} type="error" showIcon />
            <Form layout="vertical" onFinish={onRegistration}>
                `
            </Form>
        </Card>
    );
}
