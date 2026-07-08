# 运势测试网站 - Vercel 部署指南

## 前置要求

- [Node.js](https://nodejs.org/) >= 16
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/) 账号
- [Vercel](https://vercel.com/) 账号（可用 GitHub 登录）

---

## 第一步：创建 GitHub 仓库

1. 登录 GitHub，点击右上角 **+** > **New repository**
2. 填写信息：
   - **Repository name**: `fortune-test`
   - **Description**: 运势测试网站 - 五行命理、星座运势、趣味测试
   - 选择 **Public**（Vercel 免费版可部署公开仓库）
3. 点击 **Create repository**
4. 在项目目录中执行以下命令推送到 GitHub：

```bash
cd fortune-test

# 初始化 Git（如尚未初始化）
git init
git add .
git commit -m "feat: 初始化运势测试网站项目"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/<你的用户名>/fortune-test.git

# 推送
git branch -M main
git push -u origin main
```

---

## 第二步：在 Vercel 部署

### 方式一：通过 Vercel Dashboard（推荐）

1. 登录 [vercel.com](https://vercel.com/)
2. 点击 **Add New...** > **Project**
3. 在 Import 列表中找到你的 `fortune-test` 仓库，点击 **Import**
4. Vercel 会自动识别为 **Vite** 框架，保持默认配置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 点击 **Deploy**
6. 等待构建完成，即可获得访问链接（格式：`https://<项目名>.vercel.app`）

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录中执行
cd fortune-test

# 登录（首次使用需要）
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

---

## 第三步：配置自定义域名（可选）

1. 在 Vercel Dashboard 中进入你的项目
2. 点击 **Settings** > **Domains**
3. 输入你的自定义域名（如 `fortune.example.com`）
4. 点击 **Add**
5. 根据提示到你的域名注册商配置 DNS 记录：

| 类型  | 名称    | 值                         |
| ----- | ------- | -------------------------- |
| CNAME | fortune | cname.vercel-dns.com       |

6. 等待 DNS 生效（通常几分钟到几小时），HTTPS 证书会自动签发

---

## 项目构建验证

如需本地验证构建是否正常：

```bash
npm install
npm run build
npm run preview
```

浏览器访问 `http://localhost:4173` 即可预览。

---

## 常见问题

### Q: 部署后页面刷新 404？

项目已配置 `vercel.json` 进行 SPA 路由重写，所有路径会回退到 `index.html`，不会出现此问题。

### Q: 构建失败？

确保 `node_modules` 已正确安装：

```bash
rm -rf node_modules
npm install
npm run build
```

### Q: 如何自动部署？

推送代码到 GitHub `main` 分支后，Vercel 会自动触发构建和部署。每次推送都会生成一个预览部署。
