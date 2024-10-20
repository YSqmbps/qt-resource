<template>
  <div>
    <h2>用户端资源功能</h2>
    <el-card style="width: 600px;">
        <el-button type="primary" @click="fetchResources">展示资源</el-button>

        <el-table :data="resources" style="width: 100%;">
            <el-table-column prop="id" label="资源ID"></el-table-column>
            <el-table-column prop="name" label="资源名"></el-table-column>
            <el-table-column label="操作"> 
                <template slot-scope="scope">
                    <el-button @click="downloadResource(scope.row)" type="text" size="small">下载</el-button>    
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"UserResource",
    data() {
        return {
            resources: [
                {id:'01',name:'html'},
                {id:'02',name:'css'},
                {id:'03',name:'javascript'},
                {id:'04',name:'vue'},
            ]
        }
    },
    methods: {
        async fetchResources() {
            try {
                const response = await axios.post('https://qingteng-recruitment/resource?code=0')
                this.resources = response.data 
            } catch (error) {
                console.log('获取资源失败',error);
            }
        },
        // async downloadResource(id) {
        //     try {
        //         const response = await axios.post(`https://qingteng-recruitment/resource_download?id=${id}`)
        //         this.resources = response.data
        //     } catch(error) {
        //         console.error("获取资源失败",error)
        //     }
        // },
        async downloadResource (resource) {
            try {
                const response = await axios.post(`https://qingteng-recruitment/resource_download?id=${resource.id}`,{
                    name: resource.name
                },{
                    responseType:'blob' // 处理二进制文件下载
                })

                if (response.status===200) {
                    // 创建一个下载链接并触发点击
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const link = document.createElement('a')
                    link.herf = url
                    link.setAttribute('download',resource.name + '.docx')
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link) // 清理临时链接
                }
            } catch (error) {
                console.error('下载资源失败',error)
                // 处理下载错误
                if (error.response && error.response.status === 401) {
                    this.$message.error('未授权，无法下载资源')
                } else {  
                    this.$message.error('下载失败，请重试')
                }  
            }
        }
    }
}
</script>

<style>

</style>