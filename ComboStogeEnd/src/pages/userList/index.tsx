import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  Input,
  InputNumber,
  Space,
  message,
  Upload,
  Radio,
  Spin,
  Select,
} from 'antd';
import moment from 'moment';
import { Get_userinfo_list, Update_only_userinfo, Del_only_userinfo } from '@/services/user';
import { history } from 'umi';
import styles from './index.less'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { removeProperty } from '@/utils/utils';
const { TextArea } = Input;

const initval = {
  book_name: "",
  book_type: "",
  book_author: "",
  book_desc: "",
  // create_time : "2022-09-21T06:04:02.000Z", 
  // imgUrl: "https://img2.doubanio.com/view/subject/l/public/s34290201.jpg",
  isbn: "",
  press: ""
}

const Home: React.FC<any> = (props) => {
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }])
  const [formValue, setFormValue] = useState({
    "nickName": "",
    "phoneNumber": "",
    "gender": "",
  });
  const [editformValue, setEditFormValue] = useState<any>({});
  const [formName, setFormName] = useState('edit');
  const [pagination, setPagination] = useState({
    total: 0,
    pageCount: 10,
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
      title: '编号',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      width: '10%',
      render: (record: string | undefined) => <img src={record} style={{ width: 20 }} />
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: '10%',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (record: string) => record === '0' ? '男' : '女'
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      width: '10%',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: any, row: any, ix: any) => (
        <p>{row.create_time ? moment(row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, row: any, ix: any) => (
        <Space size={16}>
          {/* <p onClick={() => editRowClickedHandler(row)}>
            <EditOutlined style={{ color: 'var(--gl-border-color)' }} />
          </p> */}
          <p onClick={() => delRowClickedHandler(row)}>
            <DeleteOutlined style={{ color: '#FF7088' }} />
          </p>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    fetchTable({}, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
  }, []);

  // 获取
  const fetchTable = async (allValues: any, page: any) => {
    const search = removeProperty(allValues)
    await Get_userinfo_list({ search, ...page }).then((res) => {
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

  // 删除
  const delRowClickedHandler = async (row: { openid: string }) => {
    await Del_only_userinfo({ openid: row.openid }).then(res => {
      if (res.code === 0) {
        message.success(res.msg);
      } else {
        message.warn(res.msg);
      }
      fetchTable(formValue, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
    })
  };

  // 编辑
  const editRowClickedHandler = (row: any) => {
    setFormName('edit');
    editForm.setFieldsValue({ ['edit']: { ...row } })
    setIsModalVisible(true);
  };
  // 提交
  const editFinishHandler = async (values: any) => {
    const search = removeProperty(values[formName])
    const re: any = await Update_only_userinfo(search)
    if (re.code === 0) {
      message.success(re.msg);
    } else {
      message.warn(re.msg);
    }
    setIsModalVisible(false);
    fetchTable(formValue, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
    editForm.resetFields();
  };

  const paginationChangedHandler = (page: number, pageSize: number) => {
    setPagination({
      total: pagination.total,
      pageCount: pageSize,
      pageIndex: page,
    });
    fetchTable(formValue, { pageCount: pageSize, pageIndex: page });
  };

  const downloadClickedHandler = () => {
    // // 手动拼接GET请求
    // // 导出接口
    // const exportAPI = window.location.origin;
    // // 筛选条件
    // let queryStr = '/api/downExcel';
    // // 伪造a标签点击
    // const downloadUrl = `${exportAPI}${queryStr}`;
    // const a = document.createElement('a');
    // a.href = downloadUrl;
    // // a.download = 'users.xls';
    // a.style.display = 'none';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
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
          <Form.Item label="昵称" name='nickName'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="手机号" name='phoneNumber'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="性别" name='gender'>
            <Select style={{ width: 120 }}>
              <Select.Option value='0'>男</Select.Option>
              <Select.Option value='1'>女</Select.Option>
            </Select>
            {/* <Select style={{width:120}} options={[{ value: "0", lable: "男" },{ value: "1", lable: "女" }]} /> */}
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
        <Space size={16} className={styles['action']}>
          <Button onClick={downloadClickedHandler}>导出</Button>
        </Space>
        <div className={styles['borde']} />
        <Table
          columns={columns}
          dataSource={data || []}
          size={'small'}
          rowKey="id"
          pagination={{
            total: pagination.total,
            current: pagination.pageIndex,
            pageSize: pagination.pageCount,
            onChange: (page, pageSize) => paginationChangedHandler(page, Number(pageSize)),
          }}
        />
      </div>
      {/* 
      <Modal
        title={'编辑用户信息'}
        visible={isModalVisible}
        footer={null}
        forceRender={false}
        destroyOnClose={true}
        onCancel={() => {
          setEditFormValue({ ...initval });
          setIsModalVisible(false);
          editForm.resetFields();
        }}
      >
        <Form name={formName}
          {...layout}
          // initialValues={{ [formName]: { ...editformValue } }}
          form={editForm} onFinish={editFinishHandler}>
          <Form.Item required name={[formName, 'isbn']} label="isbn">
            <Input />
          </Form.Item>
          <Form.Item required name={[formName, 'book_name']} label="书名">
            <Input />
          </Form.Item>
          <Form.Item name={[formName, 'book_author']} label="作者">
            <Input />
          </Form.Item>
          <Form.Item name={[formName, 'press']} label="出版社">
            <Input />
          </Form.Item>
          <Form.Item name={[formName, 'book_desc']} label="简介">
            <TextArea autoSize />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Space direction='horizontal'>
              <Button type="primary" htmlType="submit">  提交   </Button>
              <Button onClick={() => { setEditFormValue({ ...initval }); setIsModalVisible(false); editForm.resetFields(); }}>  取消   </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal> */}

    </div>
  );
};

export default Home;
