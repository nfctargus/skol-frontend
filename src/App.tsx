import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/AppPage';
import ChatPage from './components/pages/ChatsPage';
import ActiveChatPage from './components/pages/ActiveChatPage';
import { LoginPage } from './components/pages/LoginPage';
import { ReigsterPage } from './components/pages/RegisterPage';


function App() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="chats" element={<ChatPage />}>
                    <Route path=":id" element={<ActiveChatPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ReigsterPage />} />
        </Routes>
    );
}

export default App;
