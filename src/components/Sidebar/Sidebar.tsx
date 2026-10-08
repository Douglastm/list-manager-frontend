import {
  useEffect,
  useState,
} from 'react';

import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ListPlus,
  LogOut,
  Settings,
} from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';

import {
  createList,
  getLists,
} from '../../services/listService';

import type { List } from '../../types/list';

import { NewListModal } from '../NewListModal/NewListModal';
import { UserSettingsModal } from '../UserSettingsModal/UserSettingsModal';

import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const {
    user,
    updateUser,
    logout,
  } = useAuth();

  const [lists, setLists] =
    useState<List[]>([]);

  const [loadingLists, setLoadingLists] =
    useState(true);

  const [isNewListModalOpen, setIsNewListModalOpen] =
    useState(false);

  const [creatingList, setCreatingList] =
    useState(false);

  const [isSettingsOpen, setIsSettingsOpen] =
    useState(false);

  const [updatingUser, setUpdatingUser] =
    useState(false);

  useEffect(() => {
    async function loadLists() {
      try {
        const response =
          await getLists();

        setLists(response);
      } catch (error) {
        console.error(
          'Erro ao carregar listas:',
          error,
        );
      } finally {
        setLoadingLists(false);
      }
    }

    loadLists();
  }, []);

  async function handleCreateList(
    name: string,
    description: string,
  ): Promise<void> {
    setCreatingList(true);

    try {
      const newList =
        await createList({
          name,
          description,
        });

      setLists((currentLists) => [
        ...currentLists,
        newList,
      ]);

      setIsNewListModalOpen(false);
    } finally {
      setCreatingList(false);
    }
  }

  async function handleUpdateUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    setUpdatingUser(true);

    try {
      await updateUser({
        name,
        email,
        password,
      });

      setIsSettingsOpen(false);
    } finally {
      setUpdatingUser(false);
    }
  }

  const userInitial =
    user?.name
      ?.charAt(0)
      .toUpperCase() ?? 'U';

  return (
    <>
      <aside
        className={`${styles.sidebar} ${
          collapsed
            ? styles.collapsed
            : ''
        }`}
      >
        <div className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <CheckSquare size={20} />
            </div>

            {!collapsed && (
              <span
                className={
                  styles.brandName
                }
              >
                List Manager
              </span>
            )}
          </div>

          <button
            type="button"
            className={
              styles.toggleButton
            }
            onClick={onToggle}
            aria-label={
              collapsed
                ? 'Expandir menu'
                : 'Recolher menu'
            }
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <div className={styles.content}>
          <button
            type="button"
            className={
              styles.newListButton
            }
            onClick={() =>
              setIsNewListModalOpen(true)
            }
          >
            <ListPlus size={18} />

            {!collapsed && (
              <span>
                Nova lista
              </span>
            )}
          </button>

          {!collapsed && (
            <div
              className={
                styles.section
              }
            >
              <span
                className={
                  styles.sectionTitle
                }
              >
                Minhas listas
              </span>

              <nav
                className={styles.list}
              >
                {loadingLists ? (
                  <span
                    className={
                      styles.loading
                    }
                  >
                    Carregando...
                  </span>
                ) : lists.length === 0 ? (
                  <span
                    className={
                      styles.empty
                    }
                  >
                    Nenhuma lista criada.
                  </span>
                ) : (
                  lists.map((list) => (
                    <button
                      key={list.id}
                      type="button"
                      className={
                        styles.listItem
                      }
                    >
                      <span
                        className={
                          styles.listIcon
                        }
                      />

                      <span>
                        {list.name}
                      </span>
                    </button>
                  ))
                )}
              </nav>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={
              styles.footerButton
            }
            onClick={() =>
              setIsSettingsOpen(true)
            }
          >
            <Settings size={18} />

            {!collapsed && (
              <span>
                Configurações
              </span>
            )}
          </button>

          <button
            type="button"
            className={
              styles.footerButton
            }
            onClick={logout}
          >
            <LogOut size={18} />

            {!collapsed && (
              <span>
                Sair
              </span>
            )}
          </button>

          <div className={styles.user}>
            <div
              className={
                styles.avatar
              }
            >
              {userInitial}
            </div>

            {!collapsed && (
              <div
                className={
                  styles.userInfo
                }
              >
                <span
                  className={
                    styles.userName
                  }
                >
                  {user?.name ??
                    'Usuário'}
                </span>

                <span
                  className={
                    styles.userEmail
                  }
                >
                  {user?.email ?? ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <NewListModal
        open={isNewListModalOpen}
        loading={creatingList}
        onClose={() =>
          setIsNewListModalOpen(false)
        }
        onSubmit={handleCreateList}
      />

      <UserSettingsModal
        open={isSettingsOpen}
        user={user}
        loading={updatingUser}
        onClose={() =>
          setIsSettingsOpen(false)
        }
        onSubmit={handleUpdateUser}
      />
    </>
  );
}