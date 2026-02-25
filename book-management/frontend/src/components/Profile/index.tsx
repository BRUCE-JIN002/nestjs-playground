import {
  Avatar,
  Popover,
  Switch,
  Button,
  Divider,
  Space,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UploadProps } from "antd";
import { updateUserAvatar } from "../../interface";

const Profile = () => {
  const [username, setUsername] = useState<string>("User");
  const [avatar, setAvatar] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get username
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Get avatar
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }

    // Get theme preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    window.location.href = "/login";
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: "http://localhost:3000/user/upload",
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        const avatarPath = info.file.response;
        // Update avatar in DB
        updateUserAvatar(username, avatarPath)
          .then(() => {
            message.success("头像更新成功");
            setAvatar(avatarPath);
            localStorage.setItem("avatar", avatarPath);
          })
          .catch(() => {
            message.error("头像更新失败");
          });
      } else if (info.file.status === "error") {
        message.error("头像上传失败");
      }
    },
  };

  const content = (
    <div className="w-48">
      <div className="flex flex-col items-center p-2">
        <Upload {...uploadProps}>
          <div className="relative group cursor-pointer">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={avatar ? `http://localhost:3000/${avatar}` : null}
              className="bg-blue-500 mb-2"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <UploadOutlined className="text-white text-xl" />
            </div>
          </div>
        </Upload>
        <span className="font-bold text-lg dark:text-white">{username}</span>
        <span className="text-gray-500 text-sm mb-4 dark:text-gray-400">
          {username}
        </span>
      </div>

      <Divider className="my-2" />

      <div className="flex justify-between items-center px-2 py-2">
        <span className="dark:text-white">深色模式</span>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </div>

      <Divider className="my-2" />

      <Button
        type="text"
        danger
        block
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="text-left"
      >
        退出登录
      </Button>
    </div>
  );

  return (
    <Space>
      {/* Theme Toggle Button (Standalone) */}
      <Button
        shape="circle"
        icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
        onClick={() => toggleTheme(!isDarkMode)}
        className="border-none shadow-none bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
      />

      {/* Profile Popover */}
      <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        overlayClassName="dark:bg-gray-800"
      >
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full transition-colors pr-3">
          <Avatar
            style={{ backgroundColor: "#1890ff" }}
            icon={<UserOutlined />}
            src={avatar ? `http://localhost:3000/${avatar}` : null}
          >
            {username[0]?.toUpperCase()}
          </Avatar>
          <span className="font-medium text-gray-700 dark:text-gray-200 hidden md:inline-block">
            {username}
          </span>
        </div>
      </Popover>
    </Space>
  );
};

export default Profile;
