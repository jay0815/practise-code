<script setup>
import { onMounted, ref, watchEffect } from 'vue';
const username = ref('');
const hasName = ref(false);
const connectd = ref(false);
const local = ref('')
const remote = ref('')
const tickect = ref('');
let peer;
let socket;
const joinWS = async () => {
  connectd.value = true;
  await startLive()
  socket.send(JSON.stringify({
    message: "create room",
    name: username.value
  }));
}

const startLive = async () => {
  let stream;
  try {
    console.log('尝试调取本地摄像头/麦克风');
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log('摄像头/麦克风获取成功！');
    local.value = stream;
  } catch (e) {
    console.error('摄像头/麦克风获取失败！', e);
    return;
  }
}

const connectAnother = async () => {
  console.log(`------ WebRTC流程开始 ------`);
  console.log('将媒体轨道添加到轨道集', local.value);
  local.value.getTracks().forEach(track => {
    peer.addTrack(track, local.value);
  });

  console.log('创建本地SDP');
  const sdp = await peer.createOffer();
  await peer.setLocalDescription(sdp);
  
  console.log(`传输发起方本地SDP`, sdp);
  socket.send(JSON.stringify({
    message: 'send offer',
    description: sdp
  }));
}

const copy = async () => {
  await navigator.clipboard.writeText(tickect.value);
  window.alert('已复制到剪贴板')
}

onMounted(() => {
  const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  peer = new PeerConnection();
  peer.ontrack = e => {
    if (e && e.streams) {
      console.log('收到对方音频/视频流数据...');
      remote.value = e.streams[0];
    }
  };
  peer.onicecandidate = e => {
    if (e.candidate) {
      console.log('搜集并发送候选人');
      socket.send(JSON.stringify({
        message: "send iceCandidate",
        iceCandidate: e.candidate
      }));
    } else {
      console.log('候选人收集完成！');
    }
  };
  socket = new WebSocket("ws://localhost:8080");
  socket.onopen = (() => {
    console.log('connected');
  })
  socket.onerror = () => console.error('信令通道创建失败！');
  socket.onmessage = e => {
    const data = JSON.parse(e.data);
    const { message, description } = data
    if (message === 'send answer') {
      peer.setRemoteDescription(new RTCSessionDescription(description));
    } else if (message === 'send iceCandidate') {
      const { iceCandidate } = data;
      peer.addIceCandidate(iceCandidate);
    } else if (message === 'member join') {
      connectAnother();
    } else if (message === 'feedback tickect') {
      tickect.value = data.uuid;
    }
  };
})

watchEffect(() => {
  if (username.value !== '' && !hasName.value) {
    hasName.value = true;
  }
})

</script>

<template>
  <label for="username">用户名</label>
  <input id="username" type="text" v-model="username">
  <div v-if="!!tickect">
    <div>{{tickect}}</div>
    <button @click="copy">一键复制</button>
  </div>
  <div id='body'>
    <video id="localVideo" autoplay muted :srcObject="local"></video>
    <video id="remoteVideo" autoplay :srcObject="remote"></video>
  </div>
  <button @click="joinWS">create</button>
</template>

<style scoped>
  #body {
      display: flex;
      height: 80vh;
      margin: 0;
      align-items: center;
      justify-content: center;
      padding: 0 50px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  video {
    max-width: calc(50% - 100px);
    margin: 0 50px;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 0;
    box-shadow: rgba(156, 172, 172, 0.2) 0px 2px 2px, rgba(156, 172, 172, 0.2) 0px 4px 4px, rgba(156, 172, 172, 0.2) 0px 8px 8px, rgba(156, 172, 172, 0.2) 0px 16px 16px, rgba(156, 172, 172, 0.2) 0px 32px 32px, rgba(156, 172, 172, 0.2) 0px 64px 64px;
  }
</style>
