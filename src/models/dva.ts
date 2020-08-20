import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface DvaModelState {
  name: string;
}

export interface DvaModelType {
  namespace: 'dva';
  state: DvaModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<DvaModelState>;
  };
}

const DvaModel: DvaModelType = {
  namespace: 'dva',

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

export default DvaModel;
