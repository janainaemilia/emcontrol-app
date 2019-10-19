    
const INITIAL_STATE = { usuarios: [], cliente: null }

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'USER_LIST':
            return { ...state, usuarios: action.payload }
        case 'CLIENT':
			return { ...state, cliente: action.payload }
		default:
			return state
	}
}