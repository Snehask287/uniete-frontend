import React from 'react';
import Sidebar from './components/Sidebar';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />

      {/* Main content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 40px', /* some spacing from left sidebar */
        backgroundColor: '#f5f5f5',
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
