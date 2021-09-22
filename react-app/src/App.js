import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/Splash';
import Home from './components/Home';

function App() {
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact={true} >
                    <Splash />
                </Route>
                <ProtectedRoute path='/home' exact={true} >
                    <Home />
                </ProtectedRoute>
                <Route>
                    <h1>Page Not Found</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
