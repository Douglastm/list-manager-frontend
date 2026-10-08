import {
  useEffect,
  useState,
  type MouseEvent,
  type SubmitEvent,
} from 'react';

import { X } from 'lucide-react';

import styles from './NewListModal.module.css';

interface NewListModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
  ) => Promise<void>;
}

export function NewListModal({
  open,
  loading,
  onClose,
  onSubmit,
}: NewListModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setError('');
    }
  }, [open]);

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

    const trimmedName = name.trim();
    const trimmedDescription =
      description.trim();

    if (!trimmedName) {
      setError(
        'Informe um nome para a lista.',
      );

      return;
    }

    if (!trimmedDescription) {
      setError(
        'Informe uma descrição para a lista.',
      );

      return;
    }

    try {
      setError('');

      await onSubmit(
        trimmedName,
        trimmedDescription,
      );

      setName('');
      setDescription('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          'Não foi possível criar a lista.',
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
        aria-labelledby="new-list-title"
      >
        <div className={styles.header}>
          <div>
            <h2 id="new-list-title">
              Nova lista
            </h2>

            <p>
              Crie uma nova lista para
              organizar suas tarefas.
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
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor="list-name">
              Nome da lista
            </label>

            <input
              id="list-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(
                  event.target.value,
                );
                setError('');
              }}
              placeholder="Ex: Compras"
              autoFocus
              maxLength={100}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="list-description">
              Descrição
            </label>

            <textarea
              id="list-description"
              value={description}
              onChange={(event) => {
                setDescription(
                  event.target.value,
                );
                setError('');
              }}
              placeholder="Ex: Lista de compras do mês"
              maxLength={500}
              rows={4}
              disabled={loading}
            />
          </div>

          {error && (
            <span className={styles.error}>
              {error}
            </span>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={
                styles.cancelButton
              }
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={
                styles.createButton
              }
              disabled={loading}
            >
              {loading
                ? 'Criando...'
                : 'Criar lista'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}