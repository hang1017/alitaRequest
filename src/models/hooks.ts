import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface HooksModelState {
  name: string;
}

export interface HooksModelType {
  namespace: 'hooks';
  state: HooksModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<HooksModelState>;
  };
}

const HooksModel: HooksModelType = {
  namespace: 'hooks',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default HooksModel;
