// 可配置的文件
window.kt_config = {
  usePixelStream: true, // 是否使用 UE 像素流
  usePixelStreamMultiplayer: false,//采用多对多像素流 or 一对一像素流
  ws_url: "ws://10.1.10.21:89/ws/", // ws 返回一个像素流地址，一定要有末尾的 /，用于后端匹配像素流ip 也就是 stream_port，UE像素流多对多地址
  stream_port: "", // 多对多流媒体端口 用于后端匹配像素流ip
  stream_ip: "http://192.168.3.99:667/", // UE像素流一对一地址
  monitor_ip: "http://192.168.3.99:1399", //监控ip
  username:"admin1",
  password:"e10adc3949ba59abbe56e057f20f883e",
  api_url: "http://192.168.3.201:8001",
  showSafety: true,
};