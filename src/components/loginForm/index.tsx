import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import awsalesLogo from '@/assets/awsales.png';
import styles from './style.module.scss';
import Loading from '../loading';
import schema from './validation';
import { ILoginForm } from '@/types/index';
import Image from 'next/image';
import Cookies from 'js-cookie'; // Importando js-cookie para gerenciar cookies

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILoginForm) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (data.email === 'awsales@admin.com' && data.password === 'admin') {
        Cookies.set('accessToken', '123456', { expires: 1 });
        setLoading(false);
        window.location.href = '/';
      } else {
        setLoading(false);
        setError('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.loginCard}>
          <Image src={awsalesLogo} alt="Tractian Logo" className={styles.logo} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
                className={styles.input}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <input
                type="password"
                placeholder="Password"
                {...register('password')}
                className={styles.input}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
