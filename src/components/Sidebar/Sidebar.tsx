import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ListPlus,
  LogOut,
  Settings,
} from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';

import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const lists = [
  { id: 1, name: 'Trabalho' },
  { id: 2, name: 'Estudos' },
  { id: 3, name: 'Compras' },
  { id: 4, name: 'Projetos' },
];

export function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const { logout } = useAuth();

  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.collapsed : ''
      }`}
    >
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <CheckSquare size={20} />
          </div>

          {!collapsed && (
            <span className={styles.brandName}>
              List Manager
            </span>
          )}
        </div>

        <button
          type="button"
          className={styles.toggleButton}
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
          className={styles.newListButton}
        >
          <ListPlus size={18} />

          {!collapsed && (
            <span>Nova lista</span>
          )}
        </button>

        {!collapsed && (
          <div className={styles.section}>
            <span className={styles.sectionTitle}>
              Minhas listas
            </span>

            <nav className={styles.list}>
              {lists.map((list) => (
                <button
                  key={list.id}
                  type="button"
                  className={styles.listItem}
                >
                  <span
                    className={styles.listIcon}
                  />

                  <span>{list.name}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.footerButton}
        >
          <Settings size={18} />

          {!collapsed && (
            <span>Configurações</span>
          )}
        </button>

        <button
          type="button"
          className={styles.footerButton}
          onClick={logout}
        >
          <LogOut size={18} />

          {!collapsed && (
            <span>Sair</span>
          )}
        </button>

        <div className={styles.user}>
          <div className={styles.avatar}>
            D
          </div>

          {!collapsed && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                Douglas
              </span>

              <span className={styles.userEmail}>
                Usuário
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}