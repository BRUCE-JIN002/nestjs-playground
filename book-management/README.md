# 图书管理系统 (Book Management System)

这是一个基于 React + NestJS 的全栈图书/封面管理系统，支持用户注册登录、图书增删改查、图片上传、深色模式切换等功能。

## 🛠 技术栈

### 前端 (Frontend)
- **核心框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **UI 组件库**: [Ant Design](https://ant.design/)
- **CSS 框架**: [Tailwind CSS v4](https://tailwindcss.com/)
- **动画库**: [GSAP](https://greensock.com/gsap/) (用于背景动画)
- **路由管理**: [React Router v7](https://reactrouter.com/)
- **HTTP 请求**: [Axios](https://axios-http.com/)
- **Hooks**: [ahooks](https://ahooks.js.org/)

### 后端 (Backend)
- **核心框架**: [NestJS](https://nestjs.com/)
- **语言**: TypeScript
- **文件上传**: Multer
- **数据存储**: 基于 JSON 文件的轻量级存储 (DbService)

## ✨ 主要功能

- **用户系统**:
  - 用户注册与登录
  - 用户头像上传与更新
  - 个人信息展示
- **图书管理**:
  - 图书列表展示（卡片式布局）
  - 图书搜索（支持模糊查询）
  - 添加图书（支持封面上传）
  - 编辑图书信息
  - 删除图书
- **界面交互**:
  - 响应式设计
  - **深色模式/浅色模式切换** (支持 View Transition API 动画)
  - 动态背景动画
  - 优雅的表单验证与提示

## 🚀 快速开始

### 前置要求
- Node.js (推荐 v18+)
- npm 或 yarn

### 1. 启动后端服务

```bash
cd back-end

# 安装依赖
npm install

# 启动开发服务器 (默认端口 3000)
npm run start:dev
```

后端服务启动后，API 地址为 `http://localhost:3000`，静态资源（封面、头像）也通过此端口访问。

### 2. 启动前端服务

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务启动后，通常访问地址为 `http://localhost:5173`。

## 📁 项目结构

```
book-management/
├── back-end/          # NestJS 后端项目
│   ├── src/
│   │   ├── book/      # 图书模块 (Controller, Service)
│   │   ├── user/      # 用户模块 (Controller, Service, Entity)
│   │   ├── db/        # JSON 文件数据库服务
│   │   └── ...
│   ├── uploads/       # 上传的文件存储目录
│   └── ...
│
└── frontend/          # React 前端项目
    ├── src/
    │   ├── components/# 业务组件 (Login, Register, BookManagement, Profile...)
    │   ├── interface/ # API 接口定义
    │   ├── utils/     # 工具函数 (ViewTransition...)
    │   └── ...
    └── ...
```

## 📝 注意事项

- 数据存储在后端的 `db.json` (或其他 JSON 文件) 中，请确保后端进程有读写权限。
- 上传的图片会存储在后端的 `uploads` 目录下。
- 前端通过 `proxy` 或 CORS 与后端通信，开发环境下默认配置了跨域处理。

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进本项目！
