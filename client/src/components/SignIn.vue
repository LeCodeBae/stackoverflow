<template>
  <div>
    <el-menu-item index="2" @click="dialogFormVisible = true">Sign In</el-menu-item>
    <el-dialog title="Sign In" :visible.sync="dialogFormVisible">
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
        <el-button type="primary" @click.native="signIn">Submit</el-button>
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
    signIn() {
      let that = this
      Vue.axios.post('http://localhost:3000/users/signin', {
        username: that.form.username,
        password: that.form.password
      }).then((response)=>{
        localStorage.setItem('token', response.data)
        that.dialogFormVisible = false
        that.$message({
              type: 'success',
              message: 'You have successfully signed in!'
            });
        that.$emit('signIn')
        console.log(response.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
