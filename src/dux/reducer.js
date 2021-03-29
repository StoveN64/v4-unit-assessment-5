// create initial state
const initialState = {
    username: '',
    profilePicture: ''
}

// actions (types)
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT'

// action creators
export function updateUser(user){
    return{
        type: UPDATE_USER,
        payload: user
    };
}
export function logout(){
    return{
        type: LOGOUT
        // payload: NOT NEEDED ACTUALLY
    };
}




// Ask eric why typscript error pops up, cant remember solution from lecture
// also; reducer function (export default)
export default function reducer(state: initialState, action){
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                username: payload.username,
                profilePicture: payload.profile_pic
            };
        case LOGOUT:
            return initialState;
        default: return state;
    }
}