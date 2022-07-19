import store from 'store';

export const AuthKeys = {
  TOKEN: 'TOKEN',
  USER_INFO: 'USER_INFO',
};

class Auth {

  isAdmin() {
    let userInfo = this.getUserInfo();
    return userInfo?.remark == 'admin';
  }
  isAuthenticated() {
    let userInfo = this.getUserInfo();
    let token = this.getToken();

    //return token && userInfo?.id && userInfo?.role !== 'admin';
    return token && userInfo?.ID;
  }

  signIn(token, userInfo) {
    store.set(AuthKeys.TOKEN, token);
    store.set(AuthKeys.USER_INFO, userInfo);
  }

  getUserInfo() {
    return store.get(AuthKeys.USER_INFO)
  }

  getToken() {
    return store.get(AuthKeys.TOKEN)
  }

  signOutAndClear() {
    store.clearAll()
  }
}

const auth = new Auth();
export default auth;
