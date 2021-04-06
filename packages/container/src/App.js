import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/header';
import Progress from './components/Progress';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthApp onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/dashboard'>
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardApp onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/'>
                                <MarketingApp onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                        </Switch> 
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};