const initialState = {
  login: false,
  phone: '',
  group: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...state,
        login: false,
        phone: '',
        group: ''
      };
    case 'LOGIN':
      return {
        ...state,
        login: true,
        phone: action.payload.phone,
        group: action.payload.group
      };
    case 'SETGROUPS':
      return {
        ...state,
        group: action.payload
      };
    default:
      return state;
  }

}
export default authReducer;