<template lang="html">
  <div>
    <el-menu-item index="3" @click="dialogFormVisible = true">Register</el-menu-item>
    <el-dialog title="Register" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="register">Submit</el-button>
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
        username: '',
        password: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    register(){
      let that = this
      Vue.axios.post('http://localhost:3000/users/signup',{
        username: that.form.username,
        password: that.form.password
      }).then((response)=>{
        that.dialogFormVisible = false
        that.$message({
              type: 'info',
              message: 'Your account is ready! Please sign in to continue!'
            });
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
