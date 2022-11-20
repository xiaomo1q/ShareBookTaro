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
import { Add_book_list, Get_book_list, Get_book_type, Update_book_list } from '@/services/book';
import { history } from 'umi';
import styles from './index.less'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { removeProperty } from '@/utils/utils';
const { TextArea } = Input;
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
    book_name: "",
    book_type: "",
    book_author: "",
    isbn: "",
  });
  const [editformValue, setEditFormValue] = useState({
    book_name: "咖啡馆比其他河流更慢",
    book_type: "其他",
    book_author: "库索",
    book_desc: "",
    // create_time : "2022-09-21T06:04:02.000Z", 
    // imgUrl: "https://img2.doubanio.com/view/subject/l/public/s34290201.jpg",
    isbn: "9787572608216",
    press: "湖南文艺出版社"
  });
  const [formName, setFormName] = useState('add');
  const [pagination, setPagination] = useState({
    total: 0,
    pageCount: 10,
    pageIndex: 1,
  });
  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);
  const [book_type, setBookType] = useState<any>([]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const columns = [
    {
      title: 'isbn',
      dataIndex: 'isbn',
      key: 'isbn',
      width: '10%',
    },
    {
      title: '书名',
      dataIndex: 'book_name',
      key: 'book_name',
    },
    {
      title: '作者',
      dataIndex: 'book_author',
      key: 'book_author',
      width: '10%',
    },
    {
      title: '分类',
      dataIndex: 'book_type',
      key: 'book_type',
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: any, row: any, ix: any) => (
        <p>{row.create_time ? moment(row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
      ),
    },
    {
      title: '出版社',
      dataIndex: 'press',
      key: 'press',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, row: any, ix: any) => (
        <Space size={16}>
          <p onClick={() => editRowClickedHandler(row)}>
            <EditOutlined style={{ color: 'var(--gl-border-color)' }} />
          </p>
          <p onClick={() => delRowClickedHandler(row)}>
            <DeleteOutlined style={{ color: '#FF7088' }} />
          </p>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    fetchBookType()
    fetchTable({}, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
  }, []);

  // 获取
  const fetchTable = async (allValues: any, page: any) => {
    const search = removeProperty(allValues)
    await Get_book_list({ search, ...page }).then((res) => {
      setData(res.list);
      setPagination({
        total: res.total,
        pageCount: res.pageCount,
        pageIndex: res.pageIndex,
      });
    })
      .catch((err) => {
        console.log(err, '............');
        setData([{ status: 0 }]);
      });
  };
  // 获取
  const fetchBookType = async () => {
    await Get_book_type().then((res) => {
      const arr: { value: any; label: any; }[] = []
      res.forEach((el: { book_type: any; }) => {
        arr.push({ value: el.book_type, label: el.book_type, })
      });
      setBookType(arr);
    })
      .catch((err) => {
        console.log(err, '............');
      });
  };

  // modal
  const showModal = () => {
    setIsModalVisible(true);
    editForm.setFieldsValue({ add: { name: '', age: 0, time: '' } });
  };

  // 删除
  const delRowClickedHandler = (row: { name: string }) => {
    // DeleteClassList({ name: row.name }).then(res => {
    //     fetchTable(pagination.pageCount, pagination.pageIndex)
    // })
  };

  // 编辑
  const editRowClickedHandler = (row: {
    time: string;
    _id: number;
    name: string;
    age: Number;
  }) => {
    setFormName('edit');
    setIsModalVisible(true);
  };
  // 提交
  const editFinishHandler = async (values: any) => {
    console.log(formName, values[formName]);
    const search = removeProperty(values[formName])
    console.log(search);
    const re: any = await formName === 'add' ? Add_book_list(search) : Update_book_list(search)
    if (re.code === 0) {
      message.success(re.msg);
    } else {
      message.warn(re.msg);
    }
    setIsModalVisible(false);
    fetchTable(formValue, { pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
  };

  //导入 excel
  const propsUpload: any = {
    name: 'file',
    accept: '.xlsx',
    showUploadList: false,
    action: '',
    onChange(info: {
      file: { status: string; originFileObj: string | Blob; name: any };
      fileList: any;
    }) {
      if (info.file.status !== 'uploading') {
        console.warn(info.file, info.fileList);
      }

      let formData = new FormData();
      formData.append('file', info.file.originFileObj);

      if (info.file.status === 'done') {
        // ImportClassList(formData).then((res) => {
        //   console.log(res);
        // });
        message.success(`${info.file.name} file uploaded successfully`);
        // fetchTable(formValue,{ pageCount: pagination.pageCount, pageIndex: pagination.pageIndex });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //导入 ing
  const propsImg: any = {
    name: 'file',
    // accept: "image/*",
    showUploadList: false,
    action: '',
    // beforeUpload: (file: { type: string; name: any; }) => {
    //     if (file.type !== 'image/png') {
    //         message.error(`${file.name} is not a png file`);
    //     }
    //     return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
    // },
    onChange(info: {
      file: { status: string; originFileObj: string | Blob; name: any };
      fileList: any;
    }) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      let formData = new FormData();
      formData.append('file', info.file.originFileObj);

      if (info.file.status === 'done') {
        // uploadImg(formData).then((res) => {
        //   console.log(res);
        // });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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

  const uploadChangedHandler = (files: any) => {
    console.log(files);

  }
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
          <Form.Item label="isbn" name='isbn'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="书名" name='book_name'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="作者" name='book_author'>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="分类" name='book_type'>
            <Select style={{ width: 120 }} options={book_type} />
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
          <Button type="primary" onClick={showModal}> 添加 </Button>
          {/* <Upload {...propsUpload}>
            <Button >导入excel</Button>
          </Upload>
          <Upload {...propsImg}>
            <Button >文件存储</Button>
          </Upload> */}
          <Button onClick={downloadClickedHandler}>导出</Button>
        </Space>
        <div className={styles['borde']} />
        <Table
          // loading
          columns={columns}
          dataSource={data || []}
          size={'small'}
          rowKey="isbn"
          pagination={{
            total: pagination.total,
            current: pagination.pageIndex,
            pageSize: pagination.pageCount,
            onChange: (page, pageSize) => paginationChangedHandler(page, Number(pageSize)),
          }}
        />
      </div>

      <Modal
        title={{ 'add': "添加图书", 'edit': "编辑图书" }[formName]}
        visible={isModalVisible}
        footer={null}
        forceRender={true}
        destroyOnClose={true}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form {...layout} name={formName}
          initialValues={{ [formName]: editformValue }}
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
          <Form.Item name={[formName, 'book_type']} label="分类">
            <Select options={book_type} />
          </Form.Item>
          <Form.Item name={[formName, 'press']} label="出版社">
            <Input />
          </Form.Item>
          <Form.Item name={[formName, 'book_desc']} label="简介">
            <TextArea />
          </Form.Item>
          {/* <Form.Item name={[formName, 'imgUrl']} label="封面" valuePropName="fileList">
            <Upload action="" maxCount={1} listType="picture-card"
              fileList={fileList}
              onChange={uploadChangedHandler}
            >
              {fileList.length >= 8 ? null : <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>}
            </Upload>
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Home;
