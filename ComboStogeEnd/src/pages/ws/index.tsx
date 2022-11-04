import React, { useState, useEffect } from 'react';
import './index.less'
import { Input, Modal, Button, Form, Space, Upload, message } from 'antd';
import io from 'socket.io-client'
import moment from 'moment';
import { uploadImg } from '@/services/index'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

const { Search } = Input;
const socket = io('ws://127.0.0.1:3030', { transports: ['websocket'] })
const Wss: React.FC<any> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState(localStorage.getItem('name'));
    const [data, setData] = useState<any>([]);
    // 创建一个空的editorState作为初始值
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'));

    const [form] = Form.useForm();
    useEffect(() => {
        getWebSocket()
        setTimeout(() => {
            scrollBottom()
        }, 100)
    }, [])

    const getWebSocket = () => {
        socket.on("connect", () => {
            socket.emit('chat')
            socket.on("chat", (data: any) => {
                setData(data)
            });
        });
    }


    // 回到底部
    const scrollBottom = () => {
        const s: any = document.getElementById('box')
        s.scrollTop = s.scrollHeight
    }
    // 发送
    const onSearch = (value: any) => {
        socket.emit('chat', { name: name, value: value.value.toHTML(), time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
        socket.on("chat", (data: any) => {
            setData(data)
        });
        setTimeout(() => {
            scrollBottom()
        }, 100)
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    // 富文本 change
    const handleChange = (editorState: any) => {
        // setEditorState(editorState)
        // socket.emit('chat', { name: name, value: editorState.toHTML(), time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
        // socket.on("chat", (data: any) => {
        //     setData(data)
        // });
        // scrollBottom()
    }

    // 导入
    const propsFiles: any = {
        name: 'file',
        showUploadList: false,
        action: '',
        onChange(info: { file: { status: string; originFileObj: string | Blob; name: any; size: number; }, fileList: any; }) {
            if (info.file.status !== 'uploading') { }

            let formData = new FormData();
            formData.append('file', info.file.originFileObj);

            if (info.file.status === 'done') {
                console.log(info.file, info.fileList);
                // console.log(info.file.name);
                uploadImg(formData).then(res => {
                    let valueType, size;
                    if (res.type.indexOf('image') !== -1) {
                        valueType = `<img src=${res.url} width='100%' height='100%'/>`
                    } else {
                        //获取最后一个.的位置
                        var index = res.url.lastIndexOf(".");
                        //获取后缀
                        var ext = res.url.substr(index + 1);
                        size = (info.file.size / 1024).toFixed(0) + "kb";
                        valueType = ` <a href=${res.url} download=${res.fileName}> <div class='ws-dow'>
                            <div class='dow-left'> <h5>${res.fileName}</h5>  <label>${size}</label></div>
                            <div class='dow-right'> <img src=${require(`@/assets/images/${ext}.svg`)} /> </div> </div>  </a>`
                    }
                    socket.emit('chat', { name: name, value: valueType, file: info.file.name, size: size, time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') })
                    socket.on("chat", (data: any) => {
                        setData(data)
                    });
                    setTimeout(() => {
                        scrollBottom()
                    }, 100)
                    form.resetFields();
                })


                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    // 编辑器 控制键
    const controls: any[string] = ['blockquote'
        , 'bold'
        , 'code'
        , 'clear'
        , 'emoji'
        // ,'font-family'
        // ,'font-size'
        , 'fullscreen'
        // ,'headings'
        // , 'hr'
        // , 'italic'
        // , 'letter-spacing'
        // , 'line-height'
        // , 'link'
        // , 'list-ol'
        // , 'list-ul'
        // , 'media'
        // , 'redo'
        // , 'remove-styles'
        // , 'separator'
        // , 'strike-through'
        // , 'superscript'
        // , 'subscript'
        // , 'text-align'
        // ,'text-color'
        // ,'text-indent'
        // ,'underline'
        // ,'undo'
        // ,'table'
        , 'media'
    ]

    const extendControls: any = [
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload {...propsFiles} >
                    {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                    <button type="button" className="control-item button upload-button" data-title="上传文件">
                        插入
                    </button>
                </Upload>
            )
        }
    ]
    return (
        <div className="ws">
            <Modal title="请输入你的名称" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(true)}>
                <Input placeholder="请输入你的名称" onChange={(e) => { setName(e.target.value) }} />
            </Modal>

            <Space direction="vertical" style={{ width: '100%' }}>

                <div className="box" id='box'>
                    <div className='scroll'>
                        {
                            data.map((it: any, ix: React.Key | null | undefined) =>
                                <div className={it.name == name ? 'item right' : 'item left'} key={ix}>
                                    <img className="header-img" src="https://images-1300238189.cos.ap-shanghai.myqcloud.com/icon/saqure.png" />
                                    <div className='.p'>
                                        <p className="name">{JSON.parse(it.name)}</p>
                                        <div className="message" dangerouslySetInnerHTML={{ __html: it.value }}></div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="input-box">
                    <Form form={form} name="control-hooks" onFinish={onSearch}  >
                        <Form.Item name="value" label="">
                            <BraftEditor
                                value={editorState}
                                controls={controls}
                                onChange={handleChange}
                                contentStyle={{ height: 220 }}
                                extendControls={extendControls}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                发送
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Space>
        </div>
    );
};


export default Wss;