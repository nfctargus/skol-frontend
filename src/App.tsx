import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/AppPage';
import ChatPage from './components/pages/ChatsPage';
import ActiveChatPage from './components/pages/ActiveChatPage';


function App() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="chats" element={<ChatPage />}>
                    <Route path=":id" element={<ActiveChatPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
