import { useState } from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((previous) => !previous)}
      />

      <main
        style={{
          marginLeft: collapsed ? '68px' : '260px',
          minHeight: '100vh',
          padding: '32px',
          transition: 'margin-left 0.2s ease',
        }}
      >
        <h1>List Manager</h1>

        <p>Bem-vindo ao seu gerenciador de listas.</p>
      </main>
    </div>
  );
}

export default App;
