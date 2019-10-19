import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import AuthReducer from '../reducers/authReducer'
import UsuarioReducer from '../reducers/usuarioReducer'
import EquipamentoReducer from '../reducers/equipamentoReducer'
import ManutencaoReducer from '../reducers/manutencaoReducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    usuario: UsuarioReducer,
    equipamento: EquipamentoReducer,
    manutencao: ManutencaoReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer