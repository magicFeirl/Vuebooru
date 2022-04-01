import {
  createStore
} from 'vuex'

import {
  imageViewer
} from './modules';

import {
  message
} from '../hooks/useMessageTip';

const store = createStore({
  state: {
    search: '',
    login: Boolean(localStorage.getItem('login')) || false,
    user_id: localStorage.getItem('user_id') || ''
  },
  mutations: {
    search(state, keyword) {
      state.search = keyword;
    },
    login(state, user_id) {
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("login", true);
      state.login = true;
      state.user_id = user_id;
    },
    logout(state) {
      const deleteCookie = (key) => {
        document.cookie = key + '=;expires=0;path=/;'
      }

      localStorage.removeItem('user_id');
      localStorage.removeItem('login');
      state.login = false;
      state.user_id = '';

      deleteCookie('user_id');
      deleteCookie('pass_hash');
      message('You have logout', '', 3000);
    }
  },
  modules: {
    imageViewer
  }
})

export default store
