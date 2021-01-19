export function logOut() {
  return {
    type: 'LOGOUT',
    payload: false
  }
}

export function setLoginState(data) {
  return {
    type: 'LOGIN',
    payload: data
  }
}
export function setAuthGroup(group){
  return {
    type: 'SETGROUPS',
    payload: group
  }
}