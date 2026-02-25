import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { type DraggerProps } from "antd/es/upload/Dragger";

interface CoverUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

let onChange: (value: string) => void;

const props: DraggerProps = {
  name: "file",
  action: "http://localhost:3000/book/upload",
  method: "post",
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      onChange(info.file.response);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};

const dragger = (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
  </Dragger>
);

const CoverUpload = (props: CoverUploadProps) => {
  onChange = props.onChange!;

  return props?.value ? (
    <div className="space-y-4">
      <div className="relative w-32 h-32 group">
        <img
          src={"http://localhost:3000/" + props.value}
          alt="封面"
          className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200"
        />
      </div>
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
};

export default CoverUpload;
