import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd-mobile';
import { HooksModelState, ConnectProps, connect, useRequest } from 'alita';
import { queryHeroList, getHeroDetails } from '@/services/api';
import styles from './index.less';

interface PageProps extends ConnectProps {
  hooks: HooksModelState;
}

const HooksPage: FC<PageProps> = ({ dispatch }) => {
  const [heroDetail, setHeroDetail] = useState([]);
  // 英雄列表
  const { data = [], run } = useRequest(queryHeroList, {
    manual: true,
    formatResult: (e) => {
      return e;
    },
  });
  console.log(data);

  // 英雄详情
  const detail = useRequest(
    () =>
      getHeroDetails({
        ename: 110,
      }),
    {
      onSuccess: (e) => {
        setHeroDetail(e);
      },
      formatResult: (e) => {
        return e;
      },
    },
  );

  // async await 请求方式
  const initData = async () => {
    const hreoList = await queryHeroList();
    console.log(hreoList);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={styles.center}>
      <Button onClick={() => run()}>请求数据</Button>
      Hello {JSON.stringify(heroDetail)}
    </div>
  );
};

export default connect(({ hooks }: { hooks: HooksModelState }) => ({ hooks }))(HooksPage);
