import { useState } from 'react';
import type { SubmitEvent } from 'react';

import {
  CheckSquare,
  Lock,
  Mail,
} from 'lucide-react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      navigate('/', {
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          'Não foi possível realizar o login.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.logo}>
          <CheckSquare size={28} />
        </div>

        <div className={styles.header}>
          <h1>List Manager</h1>

          <p>
            Entre na sua conta para continuar
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="email">
              E-mail
            </label>

            <div
              className={
                styles.inputWrapper
              }
            >
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">
              Senha
            </label>

            <div
              className={
                styles.inputWrapper
              }
            >
              <Lock size={18} />

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={
              styles.submitButton
            }
            disabled={loading}
          >
            {loading
              ? 'Entrando...'
              : 'Entrar'}
          </button>

          <div
            className={
              styles.registerLink
            }
          >
            <span>
              Não tem uma conta?
            </span>

            <Link to="/register">
              Cadastre-se
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}