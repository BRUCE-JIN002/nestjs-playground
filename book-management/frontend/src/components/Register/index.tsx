import { Button, Form, Input, message } from "antd";
import { register } from "../../interface";
import AnimatedBackground from "../AnimatedBackground";

interface RegisterUser {
  username: string;
  password: string;
  password2: string;
}

const onFinish = async (values: RegisterUser) => {
  if (values.password !== values.password2) {
    message.error("两次密码不一致");
    return;
  }

  try {
    const res = await register(values.username, values.password);

    if (res.status === 201 || res.status === 200) {
      message.success("注册成功");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  } catch (e: any) {
    message.error(e?.response?.data?.message || "注册失败");
  }
};

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Register = () => {
  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600 h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-extrabold leading-9 tracking-tight text-white drop-shadow-md">
          封面管理系统
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          注册一个新的账号
        </p>
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

          <Form.Item
            label="确认密码"
            name="password2"
            rules={[{ required: true, message: "请输入确认密码!" }]}
            className="mb-4"
          >
            <Input.Password
              placeholder="请再次输入密码"
              className="block w-full rounded-lg border-gray-300 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <Form.Item {...layout2} className="mb-2">
            <div className="flex justify-end text-sm">
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                已有账号？去登录 &rarr;
              </a>
            </div>
          </Form.Item>

          <Form.Item {...layout2} className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:from-indigo-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5 h-auto border-none"
            >
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
