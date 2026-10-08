import {
  useEffect,
  useState,
  type MouseEvent,
  type SubmitEvent,
} from 'react';

import {
  Lock,
  Mail,
  User,
  X,
} from 'lucide-react';

import type { AuthUser } from '../../types/auth';

import styles from './UserSettingsModal.module.css';

interface UserSettingsModalProps {
  open: boolean;
  user: AuthUser | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
}

export function UserSettingsModal({
  open,
  user,
  loading,
  onClose,
  onSubmit,
}: UserSettingsModalProps) {
  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  useEffect(() => {
    if (open) {
      setName(user?.name ?? '');
      setEmail(user?.email ?? '');
      setPassword('');
      setError('');
    }
  }, [open, user]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === 'Escape' &&
        !loading
      ) {
        onClose();
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [open, loading, onClose]);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedName =
      name.trim();

    const trimmedEmail =
      email.trim();

    const trimmedPassword =
      password.trim();

    if (!trimmedName) {
      setError(
        'Informe seu nome.',
      );

      return;
    }

    if (!trimmedEmail) {
      setError(
        'Informe seu e-mail.',
      );

      return;
    }

    if (!trimmedPassword) {
      setError(
        'Informe sua senha.',
      );

      return;
    }

    try {
      setError('');

      await onSubmit(
        trimmedName,
        trimmedEmail,
        trimmedPassword,
      );

      setPassword('');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          'Não foi possível atualizar seus dados.',
        );
      }
    }
  }

  function handleOverlayClick(
    event: MouseEvent<HTMLDivElement>,
  ) {
    if (
      event.target === event.currentTarget &&
      !loading
    ) {
      onClose();
    }
  }

  return (
    <div
      className={styles.overlay}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-settings-title"
      >
        <div className={styles.header}>
          <div>
            <h2 id="user-settings-title">
              Configurações
            </h2>

            <p>
              Atualize as informações da
              sua conta.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={loading}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="user-name">
              Nome
            </label>

            <div className={styles.inputWrapper}>
              <User
                size={17}
                className={styles.inputIcon}
              />

              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(
                    event.target.value,
                  );
                  setError('');
                }}
                placeholder="Seu nome"
                maxLength={100}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="user-email">
              E-mail
            </label>

            <div className={styles.inputWrapper}>
              <Mail
                size={17}
                className={styles.inputIcon}
              />

              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value,
                  );
                  setError('');
                }}
                placeholder="Seu e-mail"
                maxLength={150}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="user-password">
              Senha
            </label>

            <div className={styles.inputWrapper}>
              <Lock
                size={17}
                className={styles.inputIcon}
              />

              <input
                id="user-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value,
                  );
                  setError('');
                }}
                placeholder="Digite sua senha"
                disabled={loading}
              />
            </div>

            <span className={styles.hint}>
              Informe sua senha para confirmar
              a alteração.
            </span>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading
                ? 'Salvando...'
                : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}