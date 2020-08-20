import React, { FC, useEffect } from 'react';
import { DvaModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  dva: DvaModelState;
}

const DvaPage: FC<PageProps> = ({ dva, dispatch }) => {
  useEffect(() => {
    dispatch!({
      type: 'dva/fetch',
    });
  }, []);
  const { heroList = [] } = dva;
  return <div className={styles.center}>Hello {JSON.stringify(heroList)}</div>;
};

export default connect(({ dva }: { dva: DvaModelState }) => ({ dva }))(DvaPage);
