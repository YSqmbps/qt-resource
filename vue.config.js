const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // webSocketServer:false, //解决Vue控制台报错：WebSocketClient.js:13 WebSocket connection to ‘ws://192.168.x.x:8080/ws‘ failed:
})
