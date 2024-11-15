<template>  
    <div class="resource-box">  
        <div class="body">
            <div class="banner-wrap scenes-ready">
                <div id="stage">
                    <div class="space"></div>
                    <div class="mountains">
                        <div class="mountain mountain-1"></div>
                        <div class="mountain mountain-2"></div>
                        <div class="mountain mountain-3"></div>
                    </div>
                    <div class="bear"></div>
                </div>
            </div>
        </div>
        
        <div class="user-resource-func">用户端资源功能</div>  
        <div class="content-container">
            <div v-for="resource in resources" :key="resource.id" class="resource-container" :style="colors[colorId(resource.id)]"> 
                <div class="resource-id">{{ resource.id }}</div>
                <div class="download-box">
                    <a @click="downloadResource(resource)">
                        <img class="download-png" src="../assets/icon-png/下载.png" alt="">
                    </a>
                </div>
                    
                <div class="name-box">
                    <div class="resource-name">{{ resource.name }}</div>
                </div>
            </div>  
        </div>
    </div>  
  </template>  
  
  <script>  
  import axios from 'axios'  
  export default {  
      name: "UserResource",  
      data() {  
          return {  
              resources: [
                {id:'001',name:'html常用知识点总结'},
                {id:'002',name:'css常用知识点总结'},
                {id:'003',name:'javascript常用知识点总结'},
                {id:'004',name:'ajax常用知识点总结'},
                {id:'005',name:'vue常用知识点总结'},
                {id:'006',name:'react常用知识点总结'},
              ], // 将初始值更改为一个空数组  
              colors:[
                'background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);',
                'background-image: linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);',
                'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);',
                'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);'                
            ]
          }  
      },  
      methods: {  
          async fetchResources() {  
              try {  
                  const response = await axios.post('https://qingteng-recruitment/resource?code=0')  
                  this.resources = response.data   
              } catch (error) {  
                  console.log('获取资源失败', error);  
              }  
          },  
          async downloadResource(resource) {  
              try {  
                  const response = await axios.post(`https://qingteng-recruitment/resource_download?id=${resource.id}`, {  
                      name: resource.name  
                  }, {  
                      responseType: 'blob' // 处理二进制文件下载  
                  })  
  
                  if (response.status === 200) {  
                      // 创建一个下载链接并触发点击  
                      const url = window.URL.createObjectURL(new Blob([response.data]))  
                      const link = document.createElement('a')  
                      link.href = url // 修正为 href  
                      link.setAttribute('download', resource.name + '.docx')  
                      document.body.appendChild(link)  
                      link.click()  
                      document.body.removeChild(link) // 清理临时链接  
                  }  
              } catch (error) {  
                  console.error('下载资源失败', error)  
                  // 处理下载错误  
                  if (error.response && error.response.status === 401) {  
                      this.$message.error('未授权，无法下载资源')  
                  } else {  
                      this.$message.error('下载失败，请重试')  
                  }  
              }  
          },
            //自动往右滚动
        scrollToRight() {
        // 获取窗口的宽度
        const windowWidth = window.innerWidth
        // 计算30%的宽度
        const scrollPosition = windowWidth * 0.3;
        // 滚动到指定位置
        window.scrollTo(scrollPosition, 0)
        },

        // 颜色函数
        colorId(id) {
            return id%4
        }
      },
      
      mounted() {  
          this.fetchResources() // 页面加载时获取资源  
          this.scrollToRight()
      }  
  }  
  </script>  
  
<style>  
.resource-box {
    width: 100vw;
    height: 300vh;
    background-color: #f5f5f5;
}



.body {
    background: #1B1D1F;
    background-image: linear-gradient(to top, #141626 0%, #040319 80%);
    margin: 0;
    padding: 0;
    height: 30vh;
    width: 100%;
}
#stage {
    overflow: hidden;
    position: relative;
    z-index: 0;
}

.banner-wrap, #stage {
    width: 100%;
    height: 100%;
}
.scenes-ready #stage .space {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-animation: moving 450s linear 0.8s infinite normal none;
    -moz-animation: moving 450s linear 0.8s infinite normal none;
    animation: moving 450s linear 0.8s infinite normal none;
}
#stage .space {
    width: 3840px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: url(../assets/mountain-png/space.png) repeat-x;
}
@keyframes moving {
0% {
    transform: translate3d(0, 0, 0);
}
100% {
    transform: translate3d(-50%, 0, 0);
}
}
.scenes-ready #stage .mountains {
    opacity: 1;
    -webkit-animation: mountains-in 0.8s ease-out 0s 1 normal forwards;
    -moz-animation: mountains-in 0.8s ease-out 0s 1 normal forwards;
    animation: mountains-in 0.8s ease-out 0s 1 normal forwards;
}
#stage .mountains {
    width: 100%;
    height: 17.78125em;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    opacity: 0;
    -webkit-transition: opacity 0.2s linear 0s;
    -moz-transition: opacity 0.2s linear 0s;
    transition: opacity 0.2s linear 0s;
    -webkit-transform-origin: center top;
    -moz-transform-origin: center top;
    transform-origin: center top;
}
@keyframes mountains-in {
0% {
    transform: scale(1.5);
}
100% {
    transform: scale(1);
}
}
.scenes-ready #stage .mountain-1 {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-animation: moving 100s linear 0.8s infinite normal none;
    -moz-animation: moving 100s linear 0.8s infinite normal none;
    animation: moving 100s linear 0.8s infinite normal none;
}
#stage .mountain-1 {
    height: 10.5em;
    z-index: 3;
    background: url(../assets/mountain-png/mountain-1.png) repeat-x;
    background-size: auto 50%;
    background-position: 0 bottom;
}
#stage .mountain {
    width: 240em;
    position: absolute;
    left: 0;
    bottom: 0;
}
.scenes-ready #stage .mountain-2 {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-animation: moving 160s linear 0.8s infinite normal none;
    -moz-animation: moving 160s linear 0.8s infinite normal none;
    animation: moving 160s linear 0.8s infinite normal none;
}
#stage .mountain-2 {
    height: 12em;
    z-index: 2;
    background: url(../assets/mountain-png/mountain-2.png) repeat-x;
    background-size: auto 50%;
    background-position: 0 bottom;
}
.scenes-ready #stage .mountain-3 {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-animation: moving 360s linear 0.8s infinite normal none;
    -moz-animation: moving 360s linear 0.8s infinite normal none;
    animation: moving 360s linear 0.8s infinite normal none;
}
#stage .mountain-3 {
    height: 17.78125em;
    z-index: 1;
    background: url(../assets/mountain-png/mountain-3.png) repeat-x;
    background-size: auto 30%;
    background-position: 0 bottom;
}
.scenes-ready #stage .bear {
    -webkit-animation: bear-run-in 3.6s step-end 0.6s 1 normal forwards, bear-run 0.8s steps(8) 4.2s infinite normal forwards;
    -moz-animation: bear-run-in 3.6s step-end 0.6s 1 normal forwards, bear-run 0.8s steps(8) 4.2s infinite normal forwards;
    animation: bear-run-in 3.6s step-end 0.6s 1 normal forwards, bear-run 0.8s steps(8) 4.2s infinite normal forwards;
}
.scenes-ready #stage .bear {
    opacity: 1;
    -webkit-transition: opacity 0.4s linear 0.6s;
    -moz-transition: opacity 0.4s linear 0.6s;
    transition: opacity 0.4s linear 0.6s;
}
#stage .bear {
    width: 3.12em;
    height: 1.625em;
    position: absolute;
    margin-left: -1.5625em;
    left: -4%;
    bottom: 20px;
    z-index: 999;
    background: url(../assets/mountain-png/bear.png) 0 0 no-repeat;
    background-size: 25em 100%;
    opacity: 0;
}
@keyframes bear-run-in {
    0% {
    background-position: 0em 0;
    left: -4%;
}
1.38889% {
    background-position: -3.125em 0;
    left: -2.25%;
}
2.77778% {
    background-position: -6.25em 0;
    left: -0.5%;
}
4.16667% {
    background-position: -9.375em 0;
    left: 1.25%;
}
5.55556% {
    background-position: -12.5em 0;
    left: 3%;
}
6.94444% {
    background-position: -15.625em 0;
    left: 4.75%;
}
8.33333% {
    background-position: -18.75em 0;
    left: 6.5%;
}
9.72222% {
    background-position: -21.875em 0;
    left: 8.25%;
}
11.1111% {
    background-position: -25em 0;
    left: 10%;
}
11.1111% {
    background-position: 0em 0;
    left: 10%;
}
12.7778% {
    background-position: -3.125em 0;
    left: 11.5%;
}
14.4444% {
    background-position: -6.25em 0;
    left: 13%;
}
16.1111% {
    background-position: -9.375em 0;
    left: 14.5%;
}
17.7778% {
    background-position: -12.5em 0;
    left: 16%;
}
19.4444% {
    background-position: -15.625em 0;
    left: 17.5%;
}
21.1111% {
    background-position: -18.75em 0;
    left: 19%;
}
22.7778% {
    background-position: -21.875em 0;
    left: 20.5%;
}
24.4444% {
    background-position: -25em 0;
    left: 22%;
}
24.4444% {
    background-position: 0em 0;
    left: 22%;
}
26.3889% {
    background-position: -3.125em 0;
    left: 23.25%;
}
28.3333% {
    background-position: -6.25em 0;
    left: 24.5%;
}
30.2778% {
    background-position: -9.375em 0;
    left: 25.75%;
}
32.2222% {
    background-position: -12.5em 0;
    left: 27%;
}
34.1667% {
    background-position: -15.625em 0;
    left: 28.25%;
}
36.1111% {
    background-position: -18.75em 0;
    left: 29.5%;
}
38.0556% {
    background-position: -21.875em 0;
    left: 30.75%;
}
40% {
    background-position: -25em 0;
    left: 32%;
}
40% {
    background-position: 0em 0;
    left: 32%;
}
42.2222% {
    background-position: -3.125em 0;
    left: 33%;
}
44.4444% {
    background-position: -6.25em 0;
    left: 34%;
}
46.6667% {
    background-position: -9.375em 0;
    left: 35%;
}
48.8889% {
    background-position: -12.5em 0;
    left: 36%;
}
51.1111% {
    background-position: -15.625em 0;
    left: 37%;
}
53.3333% {
    background-position: -18.75em 0;
    left: 38%;
}
55.5556% {
    background-position: -21.875em 0;
    left: 39%;
}
57.7778% {
    background-position: -25em 0;
    left: 40%;
}
57.7778% {
    background-position: 0em 0;
    left: 40%;
}
60.2778% {
    background-position: -3.125em 0;
    left: 40.75%;
}
62.7778% {
    background-position: -6.25em 0;
    left: 41.5%;
}
65.2778% {
    background-position: -9.375em 0;
    left: 42.25%;
}
67.7778% {
    background-position: -12.5em 0;
    left: 43%;
}
70.2778% {
    background-position: -15.625em 0;
    left: 43.75%;
}
72.7778% {
    background-position: -18.75em 0;
    left: 44.5%;
}
75.2778% {
    background-position: -21.875em 0;
    left: 45.25%;
}
77.7778% {
    background-position: -25em 0;
    left: 46%;
}
77.7778% {
    background-position: 0em 0;
    left: 46%;
}
80.5556% {
    background-position: -3.125em 0;
    left: 46.5%;
}
83.3333% {
    background-position: -6.25em 0;
    left: 47%;
}
86.1111% {
    background-position: -9.375em 0;
    left: 47.5%;
}
88.8889% {
    background-position: -12.5em 0;
    left: 48%;
}
91.6667% {
    background-position: -15.625em 0;
    left: 48.5%;
}
94.4444% {
    background-position: -18.75em 0;
    left: 49%;
}
97.2222% {
    background-position: -21.875em 0;
    left: 49.5%;
}
100% {
    background-position: -25em 0;
    left: 50%;
}
}
@keyframes bear-run {
    0% {
    background-position: 0 0;
}
100% {
    background-position: -25em 0;
}
}



.user-resource-func {  
    font-size: 36px;   
    text-align: center;  
    margin: 25px 0 0px 0 ; 
    color: #333;  
    font-weight: bold;
}  


.content-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 97%;
    height: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}
.resource-container {
    
    position: relative;
    float: left;
    width: 400px;
    height: 300px;
    background-color: white;
    margin: 20px 20px 40px 20px; 
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px;
    overflow: hidden;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.resource-id {
    position: absolute;
    left: 36px;
    top: 29px;
    color: #333435;
    letter-spacing: 0.030em;
}

.download-box {
    position: relative;
    width: 36px;
    left: 330px;
    top: 25px;
}
.download-png {
    width: 32px;
    height: 32px;
    cursor: pointer !important;
}


.name-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 90px;
    left: 70px;
    top: 85px;
    margin: 20px auto 0;
    text-align: center;
}
.resource-name {
    font-family: Misans,serif;
    font-weight: 600;
    font-size: 40px;    
    color: #fff;

}
</style>