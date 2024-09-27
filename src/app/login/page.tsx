'use client'
import LoginForm from '@/components/loginForm';
import React from 'react';
import styles from './style.module.scss'

const Login:React.FC = () => {
    return (
        <div className={styles.login}>
        <LoginForm />
        </div>
    )
}

export default Login;
