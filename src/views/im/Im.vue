<template>
  <div class="back">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card2">
          <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">在线用户<span
              style="font-size: 12px">（点击聊天气泡开始聊天）</span></div>
          <div v-for="user in users" :key="user.nickname" style="padding: 10px 0">
            <span>{{ user.nickname }}</span>
            <i class="el-icon-chat-dot-round" style="margin-left: 10px; font-size: 16px; cursor: pointer"
              @click="chatUser = user.nickname;handlePicture()" />
            <span v-if="user.nickname === chatUser"
              style="font-size: 12px;color: limegreen; margin-left: 5px">chatting...</span>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card class="box-card2">
          <div style="text-align: center">
            Web聊天室（{{ chatUser }}）
          </div>
          <div style="height: 350px; margin-top:10px; overflow:auto; border-top: 1px solid #ccc" v-html="content" />
          <div style="height: 200px">
            <textarea v-model="text" style="height: 140px; width: 100%; padding: 20px; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none" />
            <div style="text-align: right; padding-right: 10px;margin-top: 10px;">
              <el-button type="primary" size="mini" @click="send">发送</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getPicture
  } from '../../api/getPicture.js'

  let socket

  export default {
    name: 'Im',
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        user: {},
        isCollapse: false,
        users: [],
        chatUser: '',
        text: '',
        messages: [],
        content: '',
        userPicture: '',
        chatUserPicture: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      handlePicture() {
        let data = {
          accountNickname: this.chatUser
        }
        console.log(88888)
        console.log(this.chatUser)
        getPicture(data).then((res) => {
          // console.log(res.infor)
          // console.log(res.infor.accountPicture)
          this.chatUserPicture = res.datas.infor[0].accountPicture
        })
      },
      send() {
        if (!this.chatUser) {
          this.$message({
            type: 'warning',
            message: '请选择聊天对象'
          })
          return
        }
        if (!this.text) {
          this.$message({
            type: 'warning',
            message: '请输入内容'
          })
        } else {
          if (typeof(WebSocket) === 'undefined') {
            console.log('您的浏览器不支持WebSocket')
          } else {
            console.log('您的浏览器支持WebSocket')
            // 组装待发送的消息 json
            // {"from": "zhang", "to": "admin", "text": "聊天文本"}
            const message = {
              from: this.user.nickname,
              to: this.chatUser,
              text: this.text
            }
            socket.send(JSON.stringify(message)) // 将组装好的json发送给服务端，由服务端进行转发
            this.messages.push({
              user: this.user.nickname,
              text: this.text
            })
            // 构建消息内容，本人消息
            this.createContent(null, this.user.nickname, this.text)
            this.text = ''
          }
        }
      },
      createContent(remoteUser, nowUser, text) { // 这个方法是用来将 json的聊天消息数据转换成 html的。
        let html
        // 当前用户消息
        if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
          html = '<div class="el-row" style="padding: 5px 0">\n' +
            '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
            '    <div class="tip left">' + text + '</div>\n' +
            '  </div>\n' +
            '  <div class="el-col el-col-2">\n' +
            '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
            '    <img src=' + this.userPicture + ' style="object-fit: cover;">\n' +
            '  </span>\n' +
            '  </div>\n' +
            '</div>'
        } else if (remoteUser) { // remoteUser表示远程用户聊天消息，蓝色的气泡
          html = '<meta name="referrer" content="no-referrer">' +
            '<div class="el-row" style="padding: 5px 0">\n' +
            '  <div class="el-col el-col-2" style="text-align: right">\n' +
            '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
            '    <img src=' + this.chatUserPicture + ' style="object-fit: cover;">\n' +
            '  </span>\n' +
            '  </div>\n' +
            '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
            '    <div class="tip right">' + text + '</div>\n' +
            '  </div>\n' +
            '</div>'
        }
        console.log(html)
        this.content += html
      },
      init() {
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
        const nickname = this.user.nickname
        this.userPicture = this.user.picture
        console.log(this.userPicture)
        const _this = this
        console.log(111)
        console.log(nickname)
        if (typeof(WebSocket) === 'undefined') {
          console.log('您的浏览器不支持WebSocket')
        } else {
          console.log('您的浏览器支持WebSocket')
          const socketUrl = 'ws://localhost:8080/imserver/' + nickname
          if (socket != null) {
            socket.close()
            socket = null
          }
          // 开启一个websocket服务
          socket = new WebSocket(socketUrl)
          // 打开事件
          socket.onopen = function() {
            console.log('websocket已打开')
          }
          //  浏览器端收消息，获得从服务端发送过来的文本消息
          socket.onmessage = function(msg) {
            console.log('收到数据====' + msg.data)
            const data = JSON.parse(msg
              .data) // 对收到的json数据进行解析， 类似这样的： {"users": [{"nickname": "zhang"},{ "nickname": "admin"}]}
            if (data.users) { // 获取在线人员信息
              _this.users = data.users.filter(user => user.nickname !==
                nickname) // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
            } else {
              // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
              //  // {"from": "zhang", "text": "hello"}
              if (data.from === _this.chatUser) {
                _this.messages.push(data)
                // 构建消息内容
                _this.createContent(data.from, null, data.text)
              }
            }
          }
          // 关闭事件
          socket.onclose = function() {
            console.log('websocket已关闭')
          }
          // 发生了错误事件
          socket.onerror = function() {
            console.log('websocket发生了错误')
          }
        }
      }

    }
  }
</script>

<style>
  .box-card2 {
    border-radius: 15px;
    border: none;
    padding-top: 5px;
    padding-left: 5px;
    height: 610px;
  }

  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width: auto;
    display: inline-block !important;
    display: inline;
  }

  .right {
    background-color: deepskyblue;
  }

  .left {
    background-color: forestgreen;
  }

  .back {
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #d5fffc 0%, #ffffff 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, #f0fdff 0%, #d3f1f4 100%);
    padding: 24px;
  }
</style>
