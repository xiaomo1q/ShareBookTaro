import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Select,
  Card,
  message,
} from 'antd';
import {
  accountUserList,
  accountUserRole,
  accountUserDel,
} from '@/services/user';

const { Option } = Select;
const { TextArea } = Input;
const Home: React.FC<any> = (props) => {
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [columns, setColumns] = useState<any>([
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '描述',
      dataIndex: 'dsc',
      key: 'dsc',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, row: any, ix: any) => (
        <Space>
          <Button type="primary" onClick={() => editRowClickedHandler(row)}>
            edit
          </Button>
          <Button type="primary" onClick={() => delRowClickedHandler(row)}>
            Del
          </Button>
        </Space>
      ),
    },
  ]);
  const [data, setData] = useState();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    fetchTable();
  }, []);

  // 获取
  const fetchTable = () => {
    accountUserList().then((res) => {
      setData(res);
    });
  };

  // 删除
  const delRowClickedHandler = (row: any) => {
    accountUserDel({ username: row.username }).then((res) => {
      fetchTable();
      message.warn(res);
    });
  };

  // 编辑
  const editRowClickedHandler = (row: any) => {
    editForm.setFieldsValue({
      username: row.username,
      id: row._id,
      role: row.role,
      dsc: row.dsc,
    });
    setIsModalVisible(true);
  };
  // 提交
  const onFinish = (values: any) => {
    // values.id = isFormID
    accountUserRole(values).then((res: any) => {
      fetchTable();
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card bordered={false}>
          <p>
            在这里，你可以对系统中的用户进行管理，例如添加一个新用户，或者修改系统中已经存在的用户。
          </p>
        </Card>

        {/* extra={<Button type="primary" onClick={showModal}> 添加用户 </Button>}  */}
        <Card title="用户管理" bordered={false} style={{ width: '100%' }}>
          <Modal
            title="formName"
            visible={isModalVisible}
            footer={null}
            forceRender={true}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form {...layout} name="add" form={editForm} onFinish={onFinish}>
              <Form.Item name={'id'} label="id">
                <Input disabled />
              </Form.Item>
              <Form.Item name={'username'} label="姓名">
                <Input />
              </Form.Item>
              <Form.Item name={'role'} label="角色">
                <Select>
                  <Option value="admin">管理员</Option>
                  <Option value="user">编辑员</Option>
                  <Option value="test">游客</Option>
                </Select>
              </Form.Item>
              <Form.Item name={'dsc'} label="描述">
                <TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Space />
          <Table
            columns={columns}
            dataSource={data}
            size={'small'}
            rowKey="_id"
          />
        </Card>
      </Space>
    </div>
  );
};

export default Home;
