import { login, logout } from '../../services/sys/user';

export default {
  namespace: 'login',

  state: {
    type: '',
    status: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      const origin = window.location.origin;
      const redirect = window.location.search.split('=')[1];

      if (response.code !== '0') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            type: 'account',
            currentAuthority: 'guest',
          },
        });

        return false;
      }

      yield put({
        type: 'changeLoginStatus',
        payload: {
          type: 'account',
          status: '0',
          currentAuthority: response.result.groupList.length ? response.result.groupList : 'guest',
        },
      });
      window.location.href = redirect ? `${origin}/#${decodeURIComponent(redirect)}` : '/';
    },
    *logout(_, { put, select, call }) {
      yield call(logout);
      window.location.href = `/?redirect=${encodeURIComponent(
        window.g_history.location.pathname
      )}#/sys/user/login`;
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
