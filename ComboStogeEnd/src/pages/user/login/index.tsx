import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch, Link, useIntl, history, useModel } from 'umi';
import styles from './index.less';
import { UserModelState } from '@/models/user';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { LoginParamsType } from '@/pages/data.d';
import { accountCaptcha } from '@/services/user';
/**
 * 登录页
 */
interface LoginProps {
  userLogin: UserModelState;
  submitLoading?: boolean;
  dispatch: Dispatch;
  location: Location & { query: any };
}
const Login: React.FC<LoginProps> = (props) => {
  const { userLogin, submitLoading, dispatch, location } = props;
  const { query } = location;
  const { redirect } = query;
  const { loginStatus } = userLogin;
  const { formatMessage } = useIntl();
  const [loginForm] = Form.useForm();
  const [formName, setFormName] = useState('login');
  const [captchaImg, setCaptchaImg] = useState<Interface.Captcha>({
    text: '',
    img: '',
  });
  useEffect(() => {
    fetchCaptcha();
  }, []);
  const fetchCaptcha = async () => {
    const CaptchaImg: Interface.Captcha = await accountCaptcha().then((res) => {
      return res;
    });
    setCaptchaImg(CaptchaImg);
  };
  // 登录
  const handleSubmit = async (values: any) => {
    if (formName === 'login') {
      const res: boolean = await dispatch({
        type: 'user/login',
        payload: values[formName],
      });
      if (res === true) {
        message.success('登录成功！');
        history.replace(redirect || '/');
      }
    } else {
      const res: boolean = await dispatch({
        type: 'user/register',
        payload: values[formName],
      });
      message.success(res);
    }
  };

  // 表单组件
  const FormItemComponents = (props: any) => {
    const { name } = props;
    return (
      <>
        {/* <h1 className={styles.title}>
          {name === 'login' ? '登录' : '注册'}
        </h1> */}
        {/*  initialValues={{ 'username': 'admin', 'password': "123456" }} */}
        <Form
          name="basic"
          onFinish={handleSubmit}
          initialValues={{}}
          form={loginForm}
        >
          <Form.Item
            label=""
            name={[name, 'name']}
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              // placeholder={'用户名: admin or test or user'}
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label=""
            rules={[{ required: true, message: '请输入密码' }]}
            name={[name, 'password']}
          >
            <Input.Password
              // placeholder={'密码：123456'}
              prefix={<UnlockOutlined />}
            />
          </Form.Item>

          {name === 'login' ? (
            <Form.Item
              label=""
              rules={[
                { required: true, message: '请输入验证码' },
                {
                  validator: (_, value) => {
                    let reg = new RegExp(value, 'gi');
                    if (captchaImg.text.match(reg)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('验证码不正确呢');
                    }
                  },
                },
              ]}
              name={[name, 'captcha']}
            >
              <div className={styles['login-flex']}>
                <Input prefix={<UnlockOutlined />} />
                <div
                  className={styles['captcha-svg']}
                  dangerouslySetInnerHTML={{ __html: captchaImg.img }}
                  onClick={fetchCaptcha}
                ></div>
              </div>
            </Form.Item>
          ) : (
            <Form.Item
              label=""
              name={[name, 'rePassword']}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue([name, 'password']) === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('您输入的两个密码不匹配!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={'确认密码'}
                prefix={<UnlockOutlined />}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              className={styles.submit}
              htmlType="submit"
              loading={submitLoading}
            >
              {name === 'login' ? '登录' : ' 注册'}
            </Button>
          </Form.Item>
          {/* <div className={styles['text-align-right']} onClick={registerClickedHandler}>
                    {name === 'login' ? ' 还没有账户？现在注册！' : '现在就去登录！'}
                </div> */}
          {loginStatus === 'error' && !submitLoading && (
            <Alert message={'用户名或密码错误！'} type="error" showIcon />
          )}
        </Form>
      </>
    );
  };
  // 切换注册
  const registerClickedHandler = () => {
    if (formName === 'login') {
      setFormName('register');
    } else {
      setFormName('login');
    }
    loginForm.resetFields();
  };
  return (
    <div className={styles.main}>
      <div className={styles['main-left']}>
        <img src={require('@/assets/images/login-bg.png')} />
      </div>
      <div className={styles['main-right']}>
        <img src={require('@/assets/images/logo-f.svg')} className={styles['main-logo']} />
        <FormItemComponents name={formName} />
      </div>
    </div>
  );
};

export default connect(
  ({
    user,
    loading,
  }: {
    user: UserModelState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userLogin: user,
    submitLoading: loading.effects['userLogin/login'],
  }),
)(Login);
