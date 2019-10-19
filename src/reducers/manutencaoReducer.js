    
const INITIAL_STATE = { manutencoes: [], manutencoesUsuario: [], manutencao: null, predicoes: [], tipoServicoList: [], predicao: null }

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'MANUTENCAO_LIST':
            return { ...state, manutencoes: action.payload }
        case 'TIPO_SERVICO_LIST':
            return { ...state, tipoServicoList: action.payload }
        case 'MANUTENCAO':
            return { ...state, manutencao: action.payload }
        case 'PREDICAO_LIST':
            return { ...state, predicoes: action.payload }
        case 'PREDICAO':
            return { ...state, predicao: action.payload }
        case 'MANUTENCAO_USUARIO_LIST':
            return { ...state, manutencoesUsuario: action.payload }
		default:
			return state
	}
}