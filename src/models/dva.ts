import { Reducer } from 'redux';
import { queryHeroList, getHeroDetails } from '@/services/api';
import { Effect } from '@/models/connect';

export interface DvaModelState {
  heroList: any[];
}

export interface DvaModelType {
  namespace: 'dva';
  state: DvaModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<DvaModelState>;
  };
}

const DvaModel: DvaModelType = {
  namespace: 'dva',

  state: {
    heroList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(queryHeroList);
      const detail = yield call(getHeroDetails, { ename: 110 });
      console.log(detail);
      yield put({
        type: 'save',
        payload: {
          heroList: data,
        },
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
