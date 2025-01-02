import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './assets/store';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
