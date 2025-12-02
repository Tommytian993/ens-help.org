// 导入 React 的 useState Hook
// useState 用于在函数组件中管理状态（数据）
import { useState } from "react";

const LoginPage = () => {
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

      {/* 
        显示当前输入的值（用于测试和调试）
        {username || "(空)"} 的含义：
        - 如果 username 有值，显示 username
        - 如果 username 是空字符串（falsy），显示 "(空)"
        - 这样可以看到状态是否正常工作
      */}
      <p>用户名: {username || "(空)"}</p>
      <p>密码: {password ? "***" : "(空)"}</p>
    </div>
  );
};

export default LoginPage;
