import { useState } from 'react';

import { Sidebar } from '../../components/Sidebar/Sidebar';

import styles from './Home.module.css';

export function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() =>
          setCollapsed((previous) => !previous)
        }
      />

      <main
        className={`${styles.content} ${
          collapsed ? styles.collapsed : ''
        }`}
      >
        <h1>List Manager</h1>

        <p>
          Bem-vindo ao seu gerenciador de listas.
        </p>
      </main>
    </div>
  );
}