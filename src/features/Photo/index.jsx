import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import Main from './pages/Main';
import AddEdit from './pages/AddEdit';

Photo.propTypes = {
    
};

function Photo(props) {
    // get current route
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={Main}/>
            <Route path={`${match.url}/add`} component={AddEdit} />
            <Route path={`${match.url}/:photoId`} component={AddEdit}/>
        </Switch>
    );
}

export default Photo; 