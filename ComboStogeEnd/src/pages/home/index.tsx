import { Action_notice_list, GET_overview_data } from '@/services/book';
import { Button, Input, List, Popover, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { EchartsBar, EchartsPie } from './pie';

const { Search } = Input;
const RenderCardFour = ({ paras }: { paras: any }) => {
  return (<div className={`${styles['group-1']}`}>
    <div className={`${styles['image-wrapper']}`}>
      <img className={`${styles['image-7']}`} src={"https://images-1300238189.cos.ap-shanghai.myqcloud.com/" + paras.icon} />
    </div>
    <div className={`${styles['txt-right']}`}>
      <p className={`${styles['group-txt']}`}>{paras.title}</p>
      <p className={`${styles['group-num']}`}>{paras.num}</p>
    </div>
  </div>);
}

const obj = {
  visits_today: 0,
  total_books: 0,
  total_users: 0,
  total_book_reviews: 0,
  bar: [],
  pie: [],
  notice: []
}
const HomeIndexV = () => {
  const [overview, setOverview] = useState({ ...obj });

  const fetchData = async () => {
    await GET_overview_data().then(res => setOverview(res))
  }
  useEffect(() => {
    fetchData()
  }, []);
  useEffect(() => {
    overview.bar && overview.bar.length > 0 && EchartsBar('bar', overview.bar)
    overview.pie && overview.pie.length > 0 && EchartsPie('pie', overview.pie)
  }, [overview.bar, overview.pie]);

  const actionNotice = async (type: string, params: { desc: string; status: number; }) => {
    await Action_notice_list({ type, params }).then(res => { })
    await GET_overview_data().then(res => setOverview(res))
  }

  return (
    <div className={styles['home-index']}>
      <div className={styles['home-head']}>
        <Space direction='horizontal' size={24}>
          <RenderCardFour paras={{ title: "今日访问量", num: overview.visits_today, icon: 'dashuju.svg.svg' }} />
          <RenderCardFour paras={{ title: "图书总量", num: overview.total_books, icon: 'book.svg.svg' }} />
          <RenderCardFour paras={{ title: "用户总量", num: overview.total_users, icon: 'shuliangtongji.svg.svg' }} />
          <RenderCardFour paras={{ title: "书评总量", num: overview.total_book_reviews, icon: 'ziyuan.svg.svg' }} />
        </Space>
      </div>
      <div className={styles['home-main']}>
        <div className={styles['home-left']}>
          <Space direction='vertical' size={24}>
            <div className={`${styles['group-2']}`}>
              <p className={`${styles['group-num']}`}>图书分类</p>
              <div id='bar' className={`${styles['group-chart']}`} />
            </div>
            <div className={`${styles['group-2']}`}>
              <p className={`${styles['group-num']}`}>男女比例</p>
              <div id='pie' className={`${styles['group-chart']}`} />
            </div>
          </Space>

        </div>
        <div className={styles['home-right']}>
          <List
            header={<div className={styles['group-txt']}>通知公告
              <Popover placement="topLeft" title="新增公告" trigger="click" content={<Search
                placeholder="请输入"
                allowClear
                enterButton="确定"
                size="large"
                onSearch={(value: string) => actionNotice('add', { desc: value, status: 0 })}
              />}>
                <Button >新增公告</Button>
              </Popover>
            </div>}
            // footer={<div>Footer</div>}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={overview.notice || []}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit"  onClick={() => actionNotice('delete', { ...item })}>删除</a>,
                  item.status === 0 ? <a key="list-loadmore-more"
                    onClick={() => actionNotice('update', { ...item, status: 1 })}
                  >发送</a> : <a key="list-loadmore-more" style={{ color: '#dedede' }}>已发送</a>
                ]}
              >
                {item.desc}
              </List.Item>
            )}
          />
        </div>
      </div>

    </div >
  );
};

export default HomeIndexV;