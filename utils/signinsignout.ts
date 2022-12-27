import { Store } from 'vuex';
import { timestampLog as $timestampLog } from './consolelog'

// Connect to VueStore

const signout = (store:Store<any>) => {
  $timestampLog('User Signed Out')
  localStorage.refresh_token = undefined;
  localStorage.access_token = undefined;
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('saved_filter');
  localStorage.removeItem('loggedin');
  localStorage.removeItem('career_id');
  localStorage.removeItem('introInfo');
  localStorage.removeItem('avatar_url');
  localStorage.removeItem('first_name');
  localStorage.removeItem('last_name');
  store.commit('SET_LOGGED_IN', false);
  window.location.reload();
  // window.location.href='/';
};

export { signout }
