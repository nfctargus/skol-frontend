import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/AppPage';
import ChatPage from './components/pages/chats/ChatsPage';
import ActiveChatPage from './components/pages/chats/ActiveChatPage';
import { LoginPage } from './components/pages/LoginPage';
import { ReigsterPage } from './components/pages/RegisterPage';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './utils/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { User } from './utils/types';
import { AuthContext } from './utils/context/AuthContext';
import ActiveGroupChatPage from './components/pages/group-chats/ActiveGroupChatPage';
import UserProfileForm from './components/forms/UserProfileForm';
import "react-tooltip/dist/react-tooltip.css";
import { socket, SocketContext } from './utils/context/SocketContext';

function App() {
    const [user, setUser] = useState<User>();
    return (
        <ReduxProvider store={store}>
            <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
                <SocketContext.Provider value={socket}>
                    <Routes>
                        <Route path="/" element={<AuthenticatedRoute> <AppPage /> </AuthenticatedRoute>}>
                            <Route path="chats" element={<ChatPage />}>
                                <Route path=":id" element={<ActiveChatPage />} />
                            </Route>
                            <Route path="groups" element={<ChatPage />}>
                                <Route path=":id" element={<ActiveGroupChatPage />} />
                            </Route>
                            <Route path="profile" element={<UserProfileForm />} />
                        </Route>
                        
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<ReigsterPage />} />
                    </Routes>
                </SocketContext.Provider>
            </AuthContext.Provider>
            <ToastContainer theme="light" />
        </ReduxProvider>
    );
}

export default App;
