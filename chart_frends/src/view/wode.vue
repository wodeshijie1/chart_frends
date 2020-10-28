<template>
<div>

  <div class="talk_con" id="talk_con_id">
        <div class="talk_show" id="words">
            <div class="atalk"><span id="asay">欢迎进入模拟客户聊天</span></div>
        </div>
        <div class="talk_input"  id="talk_input_id">>
         <input type="text"  v-if="input" v-model="text11" class="text_name" placeholder="你的名字"  >
         <input type="text" readOnly="true" v-else v-model="text11" class="text_name" placeholder="你的名字"  >
			<input type="text" v-model="text" :text="text" class="text" placeholder="请输入你要发送的内容"  >
            <input type="button" value="发送" class="talk_sub" @click="sent_text()" id="talksub" >
        </div>
    </div>
</div>
</template>
<script>
import api from "../utils/api";
export default {
    data() {
    return {
      input:true,
    text:'',
    text11:'',
    path:"ws://127.0.0.1:9090/chart",
    socket:""
    }
},
mounted(){
  this.init();
},
 methods:{
   async sent_text(){
    this.socket.send("欢迎——"+this.text11+"——进入聊天室")
    if(this.text=='' || this.text11==''){
      alert('请输入内容')
    }else{
      this.input=false
 var res = await api.wode({name:this.text,name1:this.text11});
        console.log(res)
        if(res.code===200){
      	this.text = "";
        }else{
            alert('发送失败')
        }
    }
     },
    init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
          var Words = document.getElementById('words');
          var str = '<div class="atalk" style="margin:10px;"><span style="display:inline-block;background:#0181cc;border-radius:10px;color:#fff;padding:5px 10px;">' + msg.data +'</span></div>';
          // 将之前的内容与要发的内容拼接好 提交
          Words.innerHTML = Words.innerHTML + str;
          // 置空
          this.text = "";
          // 滑动到最底部
          Words.scrollTop = Words.scrollHeight;
            console.log(msg.data)
        },
        send: function () {
            this.socket.send("wpdesjokoe")
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
    destroyed () {
        // 销毁监听
        this.socket.onclose = this.close
    },
}
</script>
<style scoped>
.text{
  width: 73%;
  height: 30px;
}
.text_name{
  width: 10%;
  height: 30px;
}
.talk_con_mob{
				width:600px;
				height:500px;
				border:1px solid #666;
				margin:50px auto 0;
				background:#f9f9f9;
			}
			.talk_show_mob{
				width:580px;
				height:420px;
				border:1px solid #666;
				background:#fff;
				margin:10px auto 0;
				overflow:auto;
			}
			.talk_input_mob{
				width:580px;
				margin:10px auto 0;
			}
			.talk_word_mob{
				width:420px;
				height:26px;
				padding:0px;
				float:left;
				margin-left:10px;
				outline:none;
				text-indent:10px;
			}

			.talk_con{
				width:600px;
				height:500px;
				border:1px solid #666;
				margin:50px auto 0;
				background:#f9f9f9;
			}
			.talk_show{
				width:580px;
				height:420px;
				border:1px solid #666;
				background:#fff;
				margin:10px auto 0;
				overflow:auto;
			}
			.talk_input{
				width:580px;
				margin:10px auto 0;
			}
			.whotalk{
				width:80px;
				height:30px;
				float:left;
				outline:none;
			}
			.talk_word{
				width:420px;
				height:26px;
				padding:0px;
				float:left;
				margin-left:10px;
				outline:none;
				text-indent:10px;
			}
			.talk_sub{
				width:10%;
				height:30px;
				float:right;
        color: red;
        background: #3416df;
				margin-right:10px;
			}
			.atalk{
			   margin:10px;
			}
			.atalk span{
				display:inline-block;
				background:#0181cc;
				border-radius:10px;
				color:#fff;
				padding:5px 10px;
			}


</style>
