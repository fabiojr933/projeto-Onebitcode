import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './screens/home';
import Register from './screens/auth/register'
import Login from './screens/auth/login'
import NotesIndex from './screens/notes/index'
import UserEdit from './screens/users/edit'
import ProtectedRoute from './components/auth/private';

const RouteDom = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/register" element={< Register />} />
                <Route path="/login" element={< Login />} />
                <Route path="/notes" element={<ProtectedRoute> < NotesIndex /> </ProtectedRoute>} />
                <Route path="/users/edit" element={ <ProtectedRoute>< UserEdit /> </ProtectedRoute>  } />
            </Routes>
        </BrowserRouter>


    )
}

export default RouteDom;