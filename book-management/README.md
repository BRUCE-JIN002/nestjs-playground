# 图书封面管理系统 (Book Cover Management System)

一个基于 **React 19** + **NestJS 11** 的全栈图书封面管理系统，提供用户认证、图书 CRUD、封面上传、头像管理等功能。

## 🛠️ 技术栈

### 前端 (Frontend)
| 技术 | 版本 | 说明 |
|------|------|------|
| **React** | 19.1.0 | 核心 UI 框架 |
| **Vite** | 6.3.5 | 构建工具 |
| **Ant Design** | 6.3.0 | UI 组件库 |
| **Tailwind CSS** | 4.2.1 | CSS 框架 |
| **React Router** | 7.13.1 | 路由管理 |
| **Axios** | 1.13.5 | HTTP 请求 |
| **GSAP** | 3.14.2 | 背景动画 |
| **ahooks** | 3.9.6 | React Hooks 库 |
| **TypeScript** | 5.8.3 | 类型支持 |

### 后端 (Backend)
| 技术 | 版本 | 说明 |
|------|------|------|
| **NestJS** | 11.0.1 | Node.js 框架 |
| **TypeScript** | 5.7.3 | 开发语言 |
| **Multer** | 2.0.2 | 文件上传 |
| **class-validator** | 0.14.3 | 数据验证 |
| **class-transformer** | 0.5.1 | 数据转换 |
| **JSON 存储** | - | 轻量级数据存储 (DbService) |

## ✨ 功能特性

### 👤 用户系统
- **注册/登录**: 用户名密码认证
- **头像上传**: 支持 PNG/JPG/GIF 格式图片上传
- **个人信息**: 展示用户名和头像

### 📚 图书管理
- **列表展示**: 卡片式布局展示图书信息
- **搜索功能**: 支持按书名模糊查询
- **添加图书**: 创建图书记录并上传封面
- **编辑图书**: 修改图书名称、作者、描述、封面
- **删除图书**: 移除图书记录

### 🎨 界面特性
- **响应式设计**: 适配不同屏幕尺寸
- **深色/浅色模式**: 支持 View Transition API 平滑切换
- **动态背景**: GSAP 实现的优雅背景动画
- **表单验证**: 完整的输入校验与错误提示

## 🚀 快速开始

### 环境要求
- Node.js >= 18.x
- npm / pnpm / yarn

### 1️⃣ 启动后端服务

```bash
cd back-end

# 安装依赖
npm install

# 启动开发服务器 (默认端口 3000)
npm run start:dev
```

后端服务说明:
- API 地址: `http://localhost:3000`
- 静态资源: `http://localhost:3000/uploads` (封面、头像)
- CORS: 已启用跨域支持

### 2️⃣ 启动前端服务

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务说明:
- 访问地址: `http://localhost:5173`
- API 请求: 直接调用 `http://localhost:3000`

## 📁 项目结构

```
book-management/
├── back-end/                    # NestJS 后端
│   ├── src/
│   │   ├── book/                # 图书模块
│   │   │   ├── book.controller.ts
│   │   │   ├── book.service.ts
│   │   │   ├── dto/             # 数据传输对象
│   │   │   ├── entities/        # 实体定义
│   │   │   └── my-file-storage.ts
│   │   ├── user/                # 用户模块
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   ├── db/                  # JSON 数据库服务
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── uploads/                 # 上传文件存储
│   └── package.json
│
└── frontend/                    # React 前端
    ├── src/
    │   ├── components/          # 业务组件
    │   │   ├── AnimatedBackground/  # 动态背景
    │   │   ├── BookManagement/      # 图书管理
    │   │   ├── Login/               # 登录页
    │   │   ├── Profile/             # 个人资料
    │   │   └── Register/            # 注册页
    │   ├── interface/           # API 接口封装
    │   ├── utils/               # 工具函数
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## 🔌 API 接口

### 用户接口
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/user/register` | 用户注册 |
| POST | `/user/login` | 用户登录 |
| POST | `/user/upload` | 上传图片 |
| POST | `/user/update/avatar` | 更新头像 |

### 图书接口
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/book/list?name=` | 获取图书列表 (支持搜索) |
| GET | `/book/:id` | 获取图书详情 |
| POST | `/book/create` | 创建图书 |
| PUT | `/book/update` | 更新图书 |
| DELETE | `/book/delete/:id` | 删除图书 |
| POST | `/book/upload` | 上传封面图片 |

## ⚙️ 配置说明

### 文件上传限制
- 支持格式: `.png`, `.jpg`, `.gif`
- 文件大小: 最大 3MB

### 数据存储
- 用户数据和图书数据存储在 JSON 文件中
- 上传的文件保存在 `back-end/uploads/` 目录

## 📝 注意事项

1. 确保后端服务先启动，前端依赖后端 API
2. JSON 数据文件需要读写权限
3. 开发环境下 CORS 已配置，生产环境需调整
4. 上传目录 `uploads/` 需要可写权限

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进本项目！

## 📄 许可证

UNLICENSED
