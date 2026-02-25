import { Button, Form, Input, message } from "antd";
import { login } from "../../interface";
import AnimatedBackground from "../AnimatedBackground";

interface LoginUser {
  username: string;
  password: string;
}

const onFinish = async (values: LoginUser) => {
  try {
    const res = await login(values.username, values.password);

    if (res.status === 201 || res.status === 200) {
      message.success("登录成功");
      localStorage.setItem("username", values.username); // Save username

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (e: any) {
    message.error(e?.response?.data?.message || "登录失败");
  }
};

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Login = () => {
  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600 h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-extrabold leading-9 tracking-tight text-white drop-shadow-md">
          封面管理系统
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">请登录您的账号</p>
      </div>

      <div className="relative z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/95 backdrop-blur-sm p-8 shadow-2xl rounded-xl border border-white/20">
        <Form
          {...layout1}
          onFinish={onFinish}
          colon={false}
          autoComplete="off"
          className="space-y-6"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
            className="mb-4"
          >
            <Input
              placeholder="请输入用户名"
              className="block w-full rounded-lg border-gray-300 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            className="mb-4"
          >
            <Input.Password
              placeholder="请输入密码"
              className="block w-full rounded-lg border-gray-300 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <Form.Item {...layout2} className="mb-2">
            <div className="flex justify-end text-sm">
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                没有账号？去注册 &rarr;
              </a>
            </div>
          </Form.Item>

          <Form.Item {...layout2} className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5 h-auto border-none"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
