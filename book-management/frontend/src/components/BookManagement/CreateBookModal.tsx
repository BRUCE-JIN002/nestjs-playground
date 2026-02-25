import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { create } from "../../interface";
import CoverUpload from "./Coverupload";

interface CreateBookModalProps {
  isOpen: boolean;
  handleClose: VoidFunction;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface CreateBook {
  name: string;
  author: string;
  description: string;
  cover: string;
}

const CreateBookModal = (props: CreateBookModalProps) => {
  const [form] = useForm<CreateBook>();

  const handleOk = async function () {
    await form.validateFields();

    const values = form.getFieldsValue();

    try {
      const res = await create(values);

      if (res.status === 201 || res.status === 200) {
        message.success("创建成功");
        form.resetFields();
        props.handleClose();
      }
    } catch (e) {
      //@ts-expect-error 忽略e?.response?.data?.message的类型错误
      message.error(e?.response?.data?.message || "创建失败");
    }
  };

  return (
    <Modal
      title="新增图书"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"创建"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="封面名称"
          name="name"
          rules={[{ required: true, message: "请输入封面名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="作者"
          name="author"
          rules={[{ required: true, message: "请输入图书作者!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: "请输入图书描述!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="封面"
          name="cover"
          rules={[{ required: true, message: "请上传图书封面!" }]}
        >
          <CoverUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBookModal;
