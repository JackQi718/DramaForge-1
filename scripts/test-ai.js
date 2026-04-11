// 测试 DeepSeek AI 配置
// 运行: node scripts/test-ai.js

const https = require('https');

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error('❌ 错误: DEEPSEEK_API_KEY 环境变量未设置');
  console.log('\n请在 .env.local 文件中设置 DEEPSEEK_API_KEY');
  process.exit(1);
}

console.log('✓ API Key 已配置');
console.log('正在测试 DeepSeek API 连接...\n');

const data = JSON.stringify({
  model: 'deepseek-chat',
  messages: [
    {
      role: 'system',
      content: '你是一个测试助手。',
    },
    {
      role: 'user',
      content: '请回复"测试成功"',
    },
  ],
  max_tokens: 50,
});

const options = {
  hostname: 'api.deepseek.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const parsed = JSON.parse(responseData);
        const reply = parsed.choices[0]?.message?.content;
        console.log('✅ API 连接成功！');
        console.log('AI 回复:', reply);
        console.log('\n配置正确，可以开始使用 AI 功能了！');
      } catch (error) {
        console.error('❌ 解析响应失败:', error.message);
        console.log('响应内容:', responseData);
      }
    } else {
      console.error(`❌ API 请求失败 (状态码: ${res.statusCode})`);
      console.log('响应内容:', responseData);
      
      if (res.statusCode === 401) {
        console.log('\n可能的原因：API Key 无效或已过期');
      } else if (res.statusCode === 429) {
        console.log('\n可能的原因：请求频率超限');
      }
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 网络请求失败:', error.message);
  console.log('\n请检查网络连接');
});

req.write(data);
req.end();
