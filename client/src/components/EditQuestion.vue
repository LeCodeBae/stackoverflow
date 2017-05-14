<template lang="html">
  <div>
    <el-button size="small" @click="dialogFormVisible=true">Edit</el-button>
    <el-dialog title="Add Question" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="question.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="question.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="EditQuestion(question)">Submit</el-button>
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
  props: ['question'],
  data(){
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    EditQuestion(question){
      let that = this;
      Vue.axios.put('http://localhost:3000/questions/' + question._id,{
        title: question.title,
        content: question.content
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      }).then((response)=>{
        that.dialogFormVisible = false
        that.$message({
              type: 'success',
              message: 'Question has been successfully updated!'
            });
        that.$emit('EditQuestion')
      }).catch((err)=>{
        console.log(err);
      })
      
    }
  }
}
</script>

<style lang="css">
</style>
