    
const INITIAL_STATE = { meusEquipamentos: [], equipamentos: [], equipamento: null, categorias: [], subcategorias: [], nomes: [], readyToSearch: false }

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'EQUIPAMENT_LIST':
			return { ...state, meusEquipamentos: action.payload }
		case 'ALL_EQUIPAMENT_LIST':
            return { ...state, equipamentos: action.payload }
        case 'EQUIPAMENT':
			return { ...state, equipamento: action.payload }
		case 'CATEGORIA_LIST':
            return { ...state, categorias: action.payload }
        case 'SUBCATEGORIA_LIST':
			return { ...state, subcategorias: action.payload }
		case 'NOMES_LIST':
			return { ...state, nomes: action.payload }
		case 'CALL_ENGINE':
			return { ...state, readyToSearch: action.payload }
		default:
			return state
	}
}