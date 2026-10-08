import { useState } from 'react';
import type { SubmitEvent } from 'react';
import {
  CheckSquare,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { register } from '../../services/authService';

import styles from './Register.module.css';

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não são iguais.');
      return;
    }

    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });

      navigate('/login', {
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          'Não foi possível realizar o cadastro.',
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
          <h1>Criar conta</h1>

          <p>
            Crie sua conta para começar a organizar
            suas listas
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="name">
              Nome
            </label>

            <div className={styles.inputWrapper}>
              <User size={18} />

              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              E-mail
            </label>

            <div className={styles.inputWrapper}>
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
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

            <div className={styles.inputWrapper}>
              <Lock size={18} />

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">
              Confirmar senha
            </label>

            <div className={styles.inputWrapper}>
              <Lock size={18} />

              <input
                id="confirmPassword"
                type="password"
                placeholder="Digite sua senha novamente"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
                minLength={6}
                autoComplete="new-password"
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
            className={styles.submitButton}
            disabled={loading}
          >
            {loading
              ? 'Criando conta...'
              : 'Criar conta'}
          </button>

          <div className={styles.loginLink}>
            <span>Já possui uma conta?</span>

            <Link to="/login">
              Entrar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}