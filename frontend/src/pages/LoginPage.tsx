// 导入 React 的 useState Hook
// useState 用于在函数组件中管理状态（数据）
import { useState } from "react";
// 导入 React Router 的 useNavigate Hook
// useNavigate 用于在代码中实现页面跳转
import { useNavigate } from "react-router-dom";
// 导入登录 API 方法
import { login } from "../services/api";

const LoginPage = () => {
  // 第十步：添加页面跳转功能
  // useNavigate 返回一个函数，用于跳转到其他页面
  // navigate('/') 会跳转到首页
  const navigate = useNavigate();

  // ========== 状态管理 ==========
  // useState 是 React 提供的 Hook（钩子函数）
  // 作用：让函数组件能够"记住"数据，当数据改变时自动更新页面

  // useState("") 的含义：
  // - "" 是初始值（空字符串，表示输入框初始为空）
  // - 返回一个数组，包含两个元素：
  //   1. username: 当前状态的值（用户输入的用户名）
  //   2. setUsername: 更新状态的函数（当用户输入时调用这个函数）

  // 数组解构：const [a, b] = [1, 2] 相当于 a=1, b=2
  const [username, setUsername] = useState("");

  // 第三步：添加密码状态管理
  // 和用户名一样，用于存储用户输入的密码
  // 初始值也是空字符串
  const [password, setPassword] = useState("");

  // 添加错误状态管理
  // errorMessage: 存储错误信息（比如"用户名或密码错误"）
  // 初始值为 null（表示没有错误）
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 添加加载状态管理
  // isLoading: 表示是否正在登录中
  // true = 正在登录（显示"登录中..."）
  // false = 未在登录（显示"登录"按钮）
  const [isLoading, setIsLoading] = useState(false);
  // ========== 渲染页面 ==========
  // return 后面是 JSX（类似 HTML，但可以写 JavaScript）
  return (
    <div>
      <h2>登录</h2>

      {/* 输入框容器 */}
      <div style={{ marginBottom: "15px" }}>
        {/* 
          label 标签：用于标识输入框
          htmlFor="username" 关联到 id="username" 的输入框
          点击 label 时，会自动聚焦到对应的输入框
        */}
        <label
          htmlFor="username"
          style={{ display: "block", marginBottom: "5px" }}
        >
          用户名
        </label>

        {/* 
          输入框：用户在这里输入用户名
          
          关键属性说明：
          1. type="text": 文本输入框（不是密码框）
          2. id="username": 唯一标识，用于 label 关联
          3. value={username}: 
             - 绑定到 username 状态
             - 输入框显示的值 = username 的值
             - 这叫"受控组件"（React 控制输入框的值）
          4. onChange={(e) => setUsername(e.target.value)}:
             - onChange: 当用户输入时触发
             - e: 事件对象，包含输入框的信息
             - e.target: 触发事件的元素（就是这个输入框）
             - e.target.value: 输入框当前的值（用户刚输入的内容）
             - setUsername(...): 调用函数更新 username 状态
             - 流程：用户输入 → 触发 onChange → 更新状态 → 页面自动更新
        */}
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "300px", // 宽度 300 像素
            padding: "8px", // 内边距 8 像素（让文字不贴边）
            border: "1px solid #ddd", // 边框：1像素实线，灰色
            borderRadius: "4px", // 圆角 4 像素
          }}
        />
      </div>

      {/* 第四步：添加密码输入框 */}
      <div style={{ marginBottom: "15px" }}>
        {/* 
          label 标签：用于标识密码输入框
          htmlFor="password" 关联到 id="password" 的输入框
        */}
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "5px" }}
        >
          密码
        </label>

        {/* 
          密码输入框：和用户名输入框类似，但 type="password"
          
          关键属性说明：
          1. type="password": 密码输入框（输入的内容会显示为圆点或星号，隐藏实际字符）
          2. id="password": 唯一标识，用于 label 关联
          3. value={password}: 绑定到 password 状态，显示当前密码值
          4. onChange={(e) => setPassword(e.target.value)}:
             - 当用户输入密码时触发
             - 更新 password 状态
             - 流程和用户名输入框完全一样
        */}
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 第五步：添加登录按钮 */}
      <button
        type="button"
        onClick={async () => {
          // 调用登录 API
          // 先清除之前的错误信息
          setErrorMessage(null);
          // 设置加载状态为 true（开始加载）
          setIsLoading(true);

          try {
            // 调用 login 函数，传入用户名和密码
            // await 表示等待异步操作完成
            const result = await login(username, password);

            // 如果登录成功（result.success === true）
            if (result.success) {
              console.log("登录成功！", result.user);
              // 清除错误信息
              setErrorMessage(null);

              // 第十一步：保存用户登录状态
              // localStorage 是浏览器提供的存储，数据会持久保存（即使关闭浏览器）
              // 将用户信息转换为 JSON 字符串后存储
              localStorage.setItem("user", JSON.stringify(result.user));

              // 触发自定义事件，通知导航栏更新登录状态
              // 这样导航栏会立即显示"个人中心"和"登出"按钮
              window.dispatchEvent(new Event("loginStatusChanged"));

              // 跳转到首页
              navigate("/");
            } else {
              // 如果登录失败，设置错误信息
              setErrorMessage(result.message || "登录失败，请重试");
            }
          } catch (error: any) {
            // 如果请求出错（比如网络错误、服务器错误等）
            // 设置错误信息
            setErrorMessage(
              error.response?.data?.message || "网络错误，请稍后重试"
            );
          } finally {
            // 无论成功还是失败，都要设置加载状态为 false（结束加载）
            setIsLoading(false);
          }
        }}
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontSize: "16px",
          opacity: isLoading ? 0.6 : 1,
        }}
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : "登录"}
      </button>

      {/* 第八步：显示错误信息 */}
      {/* 如果 errorMessage 不为空，显示错误提示 */}
      {errorMessage && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#fee",
            color: "#c33",
            border: "1px solid #fcc",
            borderRadius: "4px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <p>用户名: {username || "(空)"}</p>
      <p>密码: {password ? "***" : "(空)"}</p>
    </div>
  );
};

export default LoginPage;
