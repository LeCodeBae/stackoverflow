<template lang="html">
  <el-menu theme="dark" :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/"><el-menu-item index="1">Questions</el-menu-item></router-link>
    <sign-in v-if="!authorised" @signIn="authorise"></sign-in>
    <register v-if="!authorised"></register>
    <router-link :to="'/profile/'+profileId"><el-menu-item index="4" v-if="authorised">Profile</el-menu-item></router-link>
    <router-link to="/"><el-menu-item index="5" v-if="authorised" @click="signOut">Sign Out</el-menu-item></router-link>
  </el-menu>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
import SignIn from './SignIn'
import Register from './Register'
export default {
    data() {
      return {
        authorised : false,
        profileId : ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      authorise(){
        this.authorised=!this.authorised
        let that = this
        if(localStorage.getItem('token')){
          Vue.axios.post('http://localhost:3000/users/getId',{},{
            headers: {
              token: localStorage.getItem('token')
            }
          }).then((response)=>{
            console.log(response.data);
            that.profileId=response.data._id
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      signOut(){
        this.$message({
              type: 'warning',
              message: 'You have successfully signed out!'
            });
        this.authorise()
        localStorage.removeItem('token')
      }
    },
    components: {
      SignIn, Register
    },
    created(){
      if (localStorage.getItem('token')){
        this.authorise()
      }
    }
  }
</script>

<style lang="css">
</style>

