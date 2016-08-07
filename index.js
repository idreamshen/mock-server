var express = require('express');
var Mock = require('mockjs');
var is = require('is_js');
var mockDates = require('./mock_datas.json');
var app = express();

app.set('json spaces', 4);

/**
 * 遍历 mock_data 文件中的数据,给每个 url 绑定一个 get 请求
 */
mockDates.forEach(function (mockData) {
    app.get(mockData.url, function (req, res) {

        replaceVariablesInMockData(mockData.response, req); // 将 mockData.response 中的 $ 变量替换为 req 中对应的参数
        var data = Mock.mock(mockData.response); // 生成 mock
        res.json(data); // 发送 mock

    });
});

app.listen(3000); // 监听 3000 端口


/**
 * 递归替换 mock data 中的变量,待优化
 * @param json
 * @param req
 */
function replaceVariablesInMockData(json, req) {

    for (var key in json) {
        var value = json[key];

        if (is.string(value)) {
            if (value[0] === '$') {
                json[key] = req.params[value.substring(1)]
            }
        } else if (is.json(value)) {
            replaceVariablesInMockData(value, req);
        } else if (is.array(value)) {

            value.forEach(function (e) {
                replaceVariablesInMockData(e, req);
            });

        }
    }

}