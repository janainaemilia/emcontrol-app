    
const userKey = 'emcontrol_user'
const validToken = 'validToken'
const INITIAL_STATE = {
	usuario: JSON.parse(localStorage.getItem(userKey)),
	validToken: JSON.parse(localStorage.getItem(validToken))
}

/* Validando o token da sessão do usuário a partir do valor armazenado no localStorage */ 
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'USER':
			localStorage.setItem(userKey, JSON.stringify(action.payload))
			localStorage.setItem(validToken, true)
			return { ...state, usuario: action.payload, validToken: true }
		case 'LOGOUT':
			localStorage.setItem(userKey, null)
			localStorage.setItem(validToken, false)
			return { ...state, usuario: null, validToken: false }
		default:
			return state
	}
}