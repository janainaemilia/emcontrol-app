import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import AuthOrApp from './main/authOrApp'
import reducers from './main/reducers'
import registerServiceWorker from './registerServiceWorker'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import { reduxFirestore, getFirestore  } from 'redux-firestore';
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

// import fbConfig from './config/fbConfig'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

// const store =   createStore(reducers, 
//                     // devTools,
//                     compose(
//                         applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//                         reduxFirestore(fbConfig),
//                         reactReduxFirebase(fbConfig)
//                 ))

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AuthOrApp/>
        </MuiThemeProvider>        
    </Provider>
, document.getElementById('app'))
registerServiceWorker()