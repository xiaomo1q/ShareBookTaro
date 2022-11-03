import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, DatePicker, Input, InputNumber, Space, message, Upload, Spin } from 'antd';
import moment from 'moment'
import { GetClassList, PostClassList, DeleteClassList, PUTClassList, downloadFile } from '@/services/index'
import { ImportClassList, uploadImg } from '@/services/index'
import { history } from 'umi';
const { Search } = Input;
const Home: React.FC<any> = (props) => {
    const [editForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFormID, setIsFormID] = useState(0);
    const [formName, setFormName] = useState('add');
    const [startDate, setStartDate] = useState('2020-01-01');
    const [pagination, setPagination] = useState({ total: 0, pageCount: 10, pageIndex: 1 });

    const [columns, setColumns] = useState<any>([{
        title: 'id',
        dataIndex: '_id',
        key: '_id',
        width: 150
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
        render: (text: any, row: any, ix: any) => <p>{row.date ? moment(row.date).format("YYYY-MM-DD") : ''}</p>
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: '操作',
        key: 'action',
        render: (text: any, row: any, ix: any) => (
            <Space>
                <Button type="primary" onClick={() => editRowClickedHandler(row)}>edit</Button>
                <Button type="primary" onClick={() => delRowClickedHandler(row)}>Del</Button>
            </Space>
        ),
    },
    ])
    const [data, setData] = useState<any>([])
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        fetchTable(pagination.pageCount, pagination.pageIndex)

    }, [])

    // 获取
    const fetchTable = async (pageCount: number, pageIndex: number) => {
        await GetClassList({ pageCount: pageCount, pageIndex: pageIndex }).then(res => {
            if (res.code === '0') {
                setData(res.data)
                setPagination({
                    total: res.total, pageCount: res.pageCount, pageIndex: res.pageIndex,
                })
            } else {
                setData([{ status: 0 }])
            }
        }).catch(err => {
            console.log(err, '............');
            setData([{ status: 0 }])
        })
    }

    // modal
    const showModal = () => {
        setIsModalVisible(true);
        editForm.setFieldsValue({ add: { name: '', age: 0, time: '' } })
    };

    // 删除
    const delRowClickedHandler = (row: { name: string }) => {
        DeleteClassList({ name: row.name }).then(res => {
            fetchTable(pagination.pageCount, pagination.pageIndex)
        })
    }

    // 编辑
    const editRowClickedHandler = (row: { time: string; _id: number; name: string; age: Number; }) => {
        setFormName('edit');
        setStartDate(row.time)
        setIsFormID(row._id)
        editForm.setFieldsValue({ edit: { name: row.name, age: row.age } })
        setIsModalVisible(true);
    }
    // 提交
    const onFinish = (values: any) => {
        if (formName === 'add') {
            PostClassList(values[formName]).then(re => {
                if (re.code === 0) {
                    message.success(re.msg);
                    fetchTable(pagination.pageCount, pagination.pageIndex)
                } else {
                    message.error(re.msg);
                }
                setIsModalVisible(false);
            })
        } else {
            values[formName].id = isFormID
            PUTClassList(values[formName]).then((res: any) => {
                fetchTable(pagination.pageCount, pagination.pageIndex)
                setIsModalVisible(false);
            })
        }
    };

    // 查询
    const onSearch = (value: string) => {
    }

    //导入 excel
    const propsUpload: any = {
        name: 'file',
        accept: ".xlsx",
        showUploadList: false,
        action: '',
        onChange(info: { file: { status: string; originFileObj: string | Blob; name: any; }; fileList: any; }) {
            if (info.file.status !== 'uploading') {
                console.warn(info.file, info.fileList);
            }

            let formData = new FormData();
            formData.append('file', info.file.originFileObj);

            if (info.file.status === 'done') {
                ImportClassList(formData).then(res => {
                    console.log(res);
                })
                message.success(`${info.file.name} file uploaded successfully`);
                fetchTable(pagination.pageCount, pagination.pageIndex)
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
        onChange(info: { file: { status: string; originFileObj: string | Blob; name: any; }; fileList: any; }) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            let formData = new FormData();
            formData.append('file', info.file.originFileObj);

            if (info.file.status === 'done') {
                uploadImg(formData).then(res => {
                    console.log(res);
                })
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    const onChange = (page: number, pageSize: number) => {
        setPagination({
            total: pagination.total, pageCount: pageSize, pageIndex: page
        })
        fetchTable(pageSize, page)
    }

    const downloadClickedHandler = () => {
        console.log(window.location.origin);
        // 手动拼接GET请求
        // 导出接口
        const exportAPI = window.location.origin;
        // 筛选条件
        let queryStr = '/api/downExcel';
        // 伪造a标签点击
        const downloadUrl = `${exportAPI}${queryStr}`;
        const a = document.createElement('a');
        a.href = downloadUrl;
        // a.download = 'users.xls';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                <Button type="primary" onClick={showModal}> 添加 </Button>
                <Upload {...propsUpload}>
                    <Button >导入excel</Button>
                </Upload>
                <Upload {...propsImg}>
                    <Button >文件存储</Button>
                </Upload>
                <Button onClick={downloadClickedHandler}>导出</Button>
            </Space>
            <Modal title="formName" visible={isModalVisible} footer={null} forceRender={true} onCancel={() => setIsModalVisible(false)}>
                <Form {...layout} name="add" form={editForm} onFinish={onFinish} >
                    <Form.Item name={[formName, 'name']} label="姓名" >
                        <Input />
                    </Form.Item>
                    <Form.Item name={[formName, 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={[formName, 'date']} label="日期">
                        <DatePicker format={'YYYY-MM-DD'} value={moment(startDate)} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Space />
            {
                data[0] ? data[0].status === 0 ? <h1>出错啦出错啦，请找网络人员</h1> : <Table columns={columns} dataSource={data} size={'small'} rowKey='_id'
                    pagination={{
                        total: pagination.total,
                        current: pagination.pageIndex,
                        pageSize: pagination.pageCount,
                        onChange: (page, pageSize) => onChange(page, Number(pageSize))
                    }}
                /> : <Spin />
            }

        </Space>
    );
};


export default Home;