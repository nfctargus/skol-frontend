import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/AppPage';
import ChatPage from './components/pages/ChatsPage';
import ActiveChatPage from './components/pages/ActiveChatPage';
import { LoginPage } from './components/pages/LoginPage';


function App() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="chats" element={<ChatPage />}>
                    <Route path=":id" element={<ActiveChatPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
