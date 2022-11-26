import { Get_order_information } from '@/services/book';
import { removeProperty } from '@/utils/utils';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, message, Select, Space, Table
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
const { TextArea } = Input;


const Home: React.FC<any> = (props) => {
  const [formValue, setFormValue] = useState({
    "book_name": "",
    "toUser_name": "",
    "formUser_name": "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pageCount: 15,
    pageIndex: 1,
  });
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const columns = [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
    },
    {
      title: '书名',
      dataIndex: 'book_name',
    },
    {
      title: '原书籍主人',
      dataIndex: 'toUser_name',
    },
    {
      title: '现书籍主人',
      dataIndex: 'formUser_name',
      width: '10%',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: any, row: any, ix: any) => (
        <p>{row.create_time ? moment(row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
      ),
    },
  ]

  useEffect(() => {
    fetchTable({}, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
  }, []);

  // 获取
  const fetchTable = async (allValues: any, page: any) => {
    const search = removeProperty(allValues)
    await Get_order_information({ search, ...page }).then((res) => {
      setData(res.list);
      setPagination({
        total: res.total,
        pageCount: res.pageCount,
        pageIndex: res.pageIndex,
      });
    })
      .catch((err: any) => {
        console.log(err, '............');
        setData([{ status: 0 }]);
      });
  };


  const paginationChangedHandler = (page: number, pageSize: number) => {
    setPagination({
      total: pagination.total,
      pageCount: pageSize,
      pageIndex: page,
    });
    fetchTable(formValue, { pageCount: pageSize, pageIndex: page });
  };

  return (
    <div className={styles['book-list']}>
      <div className={styles['header']}>
        <Form
          form={form}
          layout='inline'
          onFinish={(values) => {
            const obj = removeProperty(values)
            setFormValue({ ...formValue, ...obj })
            fetchTable(values, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
          }}
        >
          <Form.Item label="书名" name='book_name'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="原书籍主人" name='toUser_name'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="现书籍主人" name='formUser_name'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item>
            <Space direction='horizontal'>
              <Button type="primary" htmlType="submit">确认</Button>
              <Button onClick={() => { form.resetFields(); }}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>

      <div className={styles['main']}>
        <Table
          columns={columns}
          dataSource={data || []}
          size={'small'}
          rowKey="oid"
          pagination={{
            total: pagination.total,
            current: pagination.pageIndex,
            pageSize: pagination.pageCount,
            hideOnSinglePage: false,
            onChange: (page, pageSize) => paginationChangedHandler(page, Number(pageSize)),
          }}
        />
      </div>
    </div>
  );
};

export default Home;
