<template>
  <div>
    <h1>Welcome {{user.username}}!!</h1>
    <add-question @AddQuestion="getter"></add-question>
    <h3 style="text-align: left;">Activities</h3>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Questions">
        <el-table :data="user.questions" border style="width: 100%">
          <el-table-column
            label="Title">
            <template scope="scope">
              <router-link :to="'/question/'+scope.row._id"><span>{{scope.row.title}}</span></router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="Content">
            <template scope="scope">
              <span>{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Actions">
            <template scope="scope">
              <edit-question :question="scope.row" @EditQuestion="getter" style="float: left;"></edit-question>
              <el-button
                size="small"
                type="danger"
                @click="deleteQuestion(scope.row._id)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Answers">
        <el-table :data="user.answers" border style="width: 100%">
          <el-table-column
            label="Content">
            <template scope="scope">
              <router-link :to="'/question/'+scope.row.question"><span>{{scope.row.content}}</span></router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="Actions">
            <template scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="deleteAnswer(scope.row._id)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
import AddQuestion from './AddQuestion'
import EditQuestion from './EditQuestion'
export default {
  data(){
    return {
      user : {}
    }
  },
  created(){
    this.getter()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getter(){
      let that = this
      Vue.axios.get('http://localhost:3000/users/' + that.$route.params.profileid)
      .then((response)=>{
        that.user=response.data
        console.log(that.user)
      }).catch((err)=>{
        console.log(err);
      })
    },
    deleteQuestion(id){
      let that = this;
      that.$confirm('This will permanently delete the question. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          Vue.axios.delete('http://localhost:3000/questions/' + id,{
            headers: {
              token: localStorage.getItem('token')
            }
          }).then((response)=>{
            console.log(response)
            that.$message({
                  type: 'warning',
                  message: 'Question has been deleted!'
                });
            that.getter()
          }).catch((err)=>{
            console.log(err);
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    },
    deleteAnswer(id){
      let that = this;
      that.$confirm('This will permanently delete the answer. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          Vue.axios.delete('http://localhost:3000/answers/' + id,{
            headers: {
              token: localStorage.getItem('token')
            }
          }).then((response)=>{
            console.log(response)
            that.$message({
                  type: 'warning',
                  message: 'Answer has been deleted!'
                });
            that.getter()
          }).catch((err)=>{
            console.log(err);
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    }
  },
  components: {
    AddQuestion, EditQuestion
  }
}
</script>

<style scoped>
</style>
