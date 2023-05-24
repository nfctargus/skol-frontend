import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/AppPage';
import ChatPage from './components/pages/ChatsPage';
import ActiveChatPage from './components/pages/ActiveChatPage';
import { LoginPage } from './components/pages/LoginPage';
import { ReigsterPage } from './components/pages/RegisterPage';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './utils/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

function App() {
    return (
        <ReduxProvider store={store}>
            <Routes>
                <Route path="/" element={<AuthenticatedRoute> <AppPage /> </AuthenticatedRoute>}>
                    <Route path="chats" element={<ChatPage />}>
                        <Route path=":id" element={<ActiveChatPage />} />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<ReigsterPage />} />
            </Routes>
            <ToastContainer theme="light" />
        </ReduxProvider>
    );
}

export default App;
