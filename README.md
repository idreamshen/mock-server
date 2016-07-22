# mock-server
基于 express 和 mockjs 构建的轻量级 mock 服务端。只需编辑 mock 规则文件即可进行接口 mock 测试。

# 使用
1. 安装依赖 `npm install`
2. 启动 `node index.js`
3. 访问 http://127.0.0.1:3000/users 和 http://127.0.0.1:3000/user/lemon/info 即可看到 mock 数据

# 说明
1. 规则文件 mock_datas.json 与 mockjs 的语法基本一致，仅多了 $ 变量，$ 变量可以用来指向规则 url 中的参数
2. 规则文件 mock_datas.json 修改后需重新启动服务
