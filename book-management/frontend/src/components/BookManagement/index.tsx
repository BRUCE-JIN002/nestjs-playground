import { Button, Card, Form, Input, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { deleteBook, list } from "../../interface";
import CreateBookModal from "./CreateBookModal";
import UpdateBookModal from "./UpdateBookModal";
import Profile from "../Profile";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

const BookManage = () => {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [name, setName] = useState("");
  const [isCreateBookModalOpen, setCraeteBookModalOpen] = useState(false);
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [num, setNum] = useState(0);
  const [form] = Form.useForm();

  async function fetchData() {
    try {
      const data = await list(name);

      if (data.status === 201 || data.status === 200) {
        setBookList(data.data);
      }
    } catch (e: any) {
      message.error(e?.response?.data?.message || "系统异常");
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteBook(id);
      message.success("删除成功");
      setNum(Math.random());
    } catch (e: any) {
      message.error(e?.response?.data?.message || "系统异常");
    }
  }

  useEffect(() => {
    fetchData();
  }, [name, num]);

  async function searchBook(values: { name: string }) {
    setName(values.name);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark font-sans transition-colors duration-300">
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        handleClose={() => {
          setCraeteBookModalOpen(false);
          setNum(Math.random());
        }}
      />
      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          setNum(Math.random());
        }}
      />

      {/* Header Section - Fixed */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm z-50 sticky top-0 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                封面管理
              </h1>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex-1 max-w-2xl flex justify-end">
                <Form
                  form={form}
                  onFinish={searchBook}
                  name="search"
                  layout="inline"
                  colon={false}
                  className="w-full flex flex-wrap md:flex-nowrap justify-end gap-3 items-center"
                >
                  <Form.Item
                    name="name"
                    className="!mb-0 flex-grow md:flex-grow-0"
                  >
                    <Input
                      prefix={<SearchOutlined className="text-gray-400" />}
                      placeholder="请输入封面名称"
                      className="w-full md:w-64 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      allowClear
                      onChange={(e) => {
                        if (!e.target.value) {
                          setName("");
                          form.setFieldsValue({ name: "" });
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="!mb-0 !mr-0">
                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                        className="bg-blue-600 hover:bg-blue-500 border-none shadow-sm rounded-lg px-6 h-9"
                      >
                        搜索
                      </Button>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bg-emerald-500 hover:bg-emerald-400 border-none shadow-sm rounded-lg px-6 h-9"
                        onClick={() => setCraeteBookModalOpen(true)}
                      >
                        添加封面
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>

              <div className="flex justify-end items-center ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto">
          {bookList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500 animate-fade-in">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg font-medium">暂无图书数据</p>
              <p className="text-sm">点击右上角添加新图书</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
              {bookList.map((book) => (
                <Card
                  key={book.id}
                  className="group overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full"
                  styles={{ body: { flex: 1, padding: "1.25rem" } }}
                  cover={
                    <div className="h-56 overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                      <img
                        alt={book.name}
                        src={`http://localhost:3000/${book.cover}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  }
                  actions={[
                    <div
                      key="edit"
                      className="flex justify-center items-center h-full w-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={(e) => {
                        e.preventDefault();
                        setUpdateId(book.id);
                        setUpdateBookModalOpen(true);
                      }}
                    >
                      <EditOutlined className="mr-2" /> 编辑
                    </div>,
                    <Popconfirm
                      key="delete"
                      title="确定删除该图书?"
                      description="此操作无法撤销"
                      onConfirm={() => handleDelete(book.id)}
                      okText="删除"
                      cancelText="取消"
                      okButtonProps={{ danger: true }}
                    >
                      <div className="flex justify-center items-center h-full w-full hover:bg-red-50 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                        <DeleteOutlined className="mr-2" /> 删除
                      </div>
                    </Popconfirm>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <div
                        className="text-lg font-bold text-gray-800 truncate mb-1"
                        title={book.name}
                      >
                        {book.name}
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 w-fit px-2 py-0.5 rounded-full font-medium">
                          {book.author}
                        </div>
                        <p
                          className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2 h-10 leading-relaxed"
                          title={book.description}
                        >
                          {book.description || "暂无描述信息..."}
                        </p>
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookManage;
