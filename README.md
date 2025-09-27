# ENS 患者平台 - Next.js 版本

这是一个为 Empty Nose Syndrome (ENS) 患者构建的综合平台，包含地图、论坛、纪念园和健康日志功能。

## 🚀 功能特色

### 🗺️ 诊所地图
- 交互式中国地图显示 ENS 诊所分布
- 省份和城市级别的详细信息
- 患者数量和诊所统计
- 支持地图缩放和导航

### 💬 患者论坛
- 分类讨论区（治疗经验、症状讨论、情感支持等）
- 发帖、回复、点赞功能
- 搜索和筛选功能
- 实时统计数据

### 🕯️ 患者纪念园
- 纪念逝去的 ENS 患者
- 添加纪念记录
- 温馨的纪念墙展示

### 📊 健康日志
- 详细的症状记录和跟踪
- 数据可视化图表
- 用药记录和效果评估
- 睡眠质量和情绪状态监控

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式**: CSS3 + 响应式设计
- **图表库**: ECharts
- **地图数据**: 阿里云 DataV GeoJSON
- **部署**: 静态导出支持

## 📦 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式运行
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本
```bash
npm run build
```

### 4. 启动生产服务器
```bash
npm start
```

### 5. 静态导出（可选）
```bash
npm run build
# 生成的文件在 out/ 目录
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（地图）
│   ├── globals.css        # 全局样式
│   ├── memorial/          # 纪念园页面
│   ├── forum/             # 论坛页面
│   └── health-log/        # 健康日志页面
├── components/            # React 组件
│   └── EChartsComponent.tsx
└── data/                  # 数据文件（如需要）
```

## 🎨 设计特点

- **响应式设计**: 完美适配桌面和移动设备
- **现代化 UI**: 使用渐变背景和毛玻璃效果
- **交互体验**: 流畅的动画和过渡效果
- **数据可视化**: 专业的图表展示
- **无障碍设计**: 良好的可访问性支持

## 🔧 配置说明

### Next.js 配置
- 支持静态导出
- 图片优化配置
- TypeScript 支持

### 地图配置
- 使用阿里云 DataV GeoJSON 数据
- 支持省份和城市级别地图
- 自定义地图样式和交互

### 图表配置
- ECharts 集成
- 多种图表类型支持
- 响应式图表设计

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [ECharts](https://echarts.apache.org/) - 数据可视化
- [阿里云 DataV](https://datav.aliyun.com/) - 地图数据
- ENS 患者社区 - 提供需求和反馈

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

---

**注意**: 这是一个演示项目，实际使用时请确保数据安全和隐私保护。


