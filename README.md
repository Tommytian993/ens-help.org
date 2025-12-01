# ENS 患者平台 - React + Django + PostgreSQL

全栈患者平台，使用 React 前端、Django REST Framework 后端和 PostgreSQL 数据库。

## 技术栈

- **前端**: React + TypeScript
- **后端**: Django + Django REST Framework
- **数据库**: PostgreSQL
- **API**: RESTful API

## 项目结构

```
test_map/
├── backend/          # Django 后端
│   ├── api/          # API 应用
│   ├── map/          # 地图应用
│   ├── ens_platform/ # Django 项目配置
│   └── venv/         # Python 虚拟环境
├── frontend/         # React 前端
└── README.md
```

## 快速开始

### 方法一：使用自动设置脚本（推荐）

```bash
# 运行设置脚本
./setup.sh
```

脚本会自动：
- 检查 PostgreSQL 是否安装
- 创建 Python 虚拟环境
- 安装所有依赖
- 创建数据库
- 运行数据库迁移

### 方法二：手动设置

#### 1. 安装 PostgreSQL

确保已安装并运行 PostgreSQL：

```bash
# macOS (使用 Homebrew)
brew install postgresql
brew services start postgresql

# 创建数据库
createdb ens_platform
```

#### 2. 设置后端

```bash
cd backend

# 创建虚拟环境（如果还没有）
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 创建 .env 文件
cat > .env << EOF
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=ens_platform
DB_USER=your-username
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
EOF

# 运行数据库迁移
python manage.py makemigrations
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser

# 运行开发服务器
python manage.py runserver
```

后端将在 `http://localhost:8000` 运行。

#### 3. 设置前端

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm start
```

前端将在 `http://localhost:3000` 运行。

## API 端点

- `GET /api/provinces/` - 获取所有省份
- `GET /api/provinces/{id}/cities/` - 获取省份下的城市
- `GET /api/provinces/map_data/` - 获取地图数据格式
- `GET /api/cities/` - 获取所有城市
- `GET /api/cities/by_province/?province_id={id}` - 根据省份获取城市
- `GET /api/clinics/` - 获取所有诊所
- `GET /api/health-logs/` - 获取健康日志（需要认证）
- `GET /api/memorials/` - 获取纪念园记录
- `GET /api/users/current/` - 获取当前用户信息

## 数据库模型

- **Province**: 省份信息
- **City**: 城市信息
- **Clinic**: 诊所信息
- **Patient**: 患者信息
- **HealthLog**: 健康日志
- **Memorial**: 纪念园记录

## 开发

### 后端开发

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### 前端开发

```bash
cd frontend
npm start
```

## 部署

### 生产环境设置

1. 设置 `DEBUG=False` 在 `.env` 文件中
2. 设置强密码的 `SECRET_KEY`
3. 配置生产数据库
4. 运行 `python manage.py collectstatic`
5. 使用 Gunicorn 或 uWSGI 运行 Django
6. 使用 Nginx 作为反向代理
7. 构建 React 应用: `cd frontend && npm run build`

## 许可证

MIT

