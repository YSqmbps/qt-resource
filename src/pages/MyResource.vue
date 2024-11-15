<template>
  <div>  
  <h2>管理端资源功能</h2>
    <el-card class="box-card" style="width: 1100px;">
    
    <el-table :data="resources" style="width: 100%;">
      <el-table-column prop="id" label="资源ID"></el-table-column>
      <el-table-column prop="name" label="资源名称"></el-table-column>
      <el-table-column label="操作" style="padding-left: 20px;">
        <template slot-scope="scope">
              <el-button @click="openResource(scope.row.id)"  style="color: green; cursor: pointer;">打开</el-button>
              <el-button @click="editResources(scope.row.id)"  style="color: blue; cursor: pointer;">编辑</el-button>
              <el-button @click="publishResource(scope.row.id)" style="color: #FF9000; cursor: pointer;">发布</el-button>
              <el-button @click="deleteResource(scope.row.id)" style="color: red; cursor: pointer;">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog title="编辑资源" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="资源名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="资源文件">
          <el-upload  
            class="upload-demo"  
            drag  
            action="#"  
            :on-change="handleFileChange"  
            :file-list="fileList"  
          >  
            <i class="el-icon-upload"></i>  
            <div class="el-upload__text">将文件拖到这里，或<em>点击上传</em></div>  
            <div class="el-upload__tip" slot="tip">只支持docx格式文件</div>  
          </el-upload>        
          
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateResource">确 定</el-button>
    </span>
  </el-dialog>


   
  </div>  
</template>  

<script>  
import axios from 'axios'
export default {  
  data() {  
    return {  
      resources:[
      { name: 'Java', id: '01' },  
      { name: 'C++', id: '02' },  
      { name: 'Vue', id: '03' },  
      { name: 'Html', id: '04' },
      ],
      dialogVisible:false,
      form:{
        id:'',
        name:'',
        file:null
      },
      filelist:[]
    }
  },
  methods:{
    // 展示资源
    async fetchResources() {
      try {
        const response = await axios.post('https://qingteng-recruitment/root/display_resource',{code:1})
        this.resources = response.data.data //获取资源数据
      } catch(error) {
        console.log('获取资源失败',error)
      }
    },

    // 打开资源  
    openResource(id) {  
      const resource = this.resources.find(item => item.id === id);  
      if (resource && resource.fileUrl) {  
        window.open(resource.fileUrl, '_blank');  
      } else {  
        console.error('文件未找到或没有可用的文件链接');  
      }  
    },  

    // 编辑资源
    async editResources(id) {
      const resource = this.resources.find(item => item.id === id)
      this.form.id = id
      this.form.name = resource.name
      this.dialogVisible = true
    },

    // 文件拖拽
    handleFileChange(file) {
      this.filelist.push(file.file)
      this.form.file = file.file.raw // 确保文件格式正确
    },

    // 更新资源
    async updateResource() {
      const formData = new FormData()
      formData.append('name',this.form.name)
      if(this.form.file) {
        formData.append('file',this.form.file)
      }
      
      try {
        const response = await axios.post(`https://qingteng-recruitment/root/resource_edit?id=${this.form.id}`,formData)
        if(response===200) {
          this.dialogVisible = false
          this.fetchResources() // 刷新资源列表
        }
      } catch(error) {
        console.error('编辑资源失败',error)
      }
    },

    // 发布资源
    async publishResource(id) {
      if (!this.form.file || !this.form.name) {  
        console.error('请先选择文件及填写资源名');  
        return;  
      }  
      const payload = {
        name:this.form.name,
        file:this.form.file
      }

      try {
        const response = await axios.post(`https://qingteng-recruitment/root/resource_put?id=${id}`,payload)
        if(response.data.code===200) {
          console.log('资源发布成功');
          this.fetchResources() // 刷新资源列表
        }
      } catch(error) {
        console.error('发布资源失败',error)
        
      }
    },

    // 删除资源
    async deleteResource(id) {
      try {
          const response = await axios.post(`https://qingteng-recruitment/root/resource_delete?id=${id}`)
          if(response.data.code===200) {
            console.log('资源删除成功')
            this.fetchResources() // 刷新资源列表 
          }
        } catch(error) {
          console.error('删除资源失败',error);
          
      }
    },
    mounted() {  
    this.fetchResources(); // 页面加载时获取资源  
    }  
  }
}
</script>  

<style scoped>  
.upload-demo .el-upload__text {  
  font-size: 14px;  
}  

</style>