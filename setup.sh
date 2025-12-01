#!/bin/bash

echo "🚀 开始设置 ENS 患者平台..."

# 检查 PostgreSQL 是否安装
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL 未安装。请先安装 PostgreSQL。"
    echo "macOS: brew install postgresql && brew services start postgresql"
    exit 1
fi

# 设置后端
echo "📦 设置后端..."
cd backend

# 创建虚拟环境（如果不存在）
if [ ! -d "venv" ]; then
    echo "创建 Python 虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "安装 Python 依赖..."
pip install -r requirements.txt

# 创建 .env 文件（如果不存在）
if [ ! -f ".env" ]; then
    echo "创建 .env 文件..."
    cat > .env << EOF
SECRET_KEY=django-insecure-$(openssl rand -hex 32)
DEBUG=True
DB_NAME=ens_platform
DB_USER=$(whoami)
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
EOF
    echo "✅ .env 文件已创建，请根据需要修改数据库配置"
fi

# 创建数据库（如果不存在）
echo "创建数据库..."
createdb ens_platform 2>/dev/null || echo "数据库可能已存在"

# 运行迁移
echo "运行数据库迁移..."
python manage.py migrate

# 创建超级用户提示
echo ""
echo "✅ 后端设置完成！"
echo "运行 'python manage.py createsuperuser' 创建管理员账户"
echo "运行 'python manage.py runserver' 启动后端服务器"

# 设置前端
echo ""
echo "📦 设置前端..."
cd ../frontend

# 安装依赖
echo "安装 Node.js 依赖..."
npm install

echo ""
echo "✅ 前端设置完成！"
echo "运行 'npm start' 启动前端开发服务器"

echo ""
echo "🎉 设置完成！"
echo ""
echo "下一步："
echo "1. 编辑 backend/.env 文件，配置数据库连接"
echo "2. 在 backend 目录运行: python manage.py createsuperuser"
echo "3. 在 backend 目录运行: python manage.py runserver"
echo "4. 在 frontend 目录运行: npm start"
echo "5. 访问 http://localhost:3000 查看应用"

