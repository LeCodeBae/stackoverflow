<template>
  <div>
    <el-button type="success" @click="dialogFormVisible=true">Add Question</el-button>
    <el-dialog title="Add Question" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="AddQuestion">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
export default {
  data(){
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        content: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    AddQuestion(){
      let that = this
      Vue.axios.post('http://localhost:3000/questions',{
        title: that.form.title,
        content: that.form.content
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      }).then((response)=>{
        that.dialogFormVisible = false
        that.$emit('AddQuestion')
        that.$message({
              type: 'success',
              message: 'Question has been successfully added!'
            });
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
