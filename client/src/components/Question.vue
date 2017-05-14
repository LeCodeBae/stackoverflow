<template lang="html">
  <div class="question">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float: left;">
          <i class="el-icon-arrow-up" @click="addVoteQuestion(true, question._id)"></i>
          <br>{{voteCount(question.votes)}}<br>
          <i class="el-icon-arrow-down" @click="addVoteQuestion(false, question._id)"></i>
        </span>
        <span style="margin-left: 20px; line-height: 36px; float: left;"><h1>{{question.title}}</h1></span>
        
      </div>
      <div class="text">
        <p style="float: left;">{{question.content}}</p><br>
        <p style="float: right;">Created by: {{question.creator.username}}</p>
      </div>
    </el-card>
    <h3 style="text-align: left;">{{question.answers.length}} answers</h3><br>
    <el-card class="box-card" v-for="answer in question.answers">
      <div class="text">
        <span style="float: left;">
          <i class="el-icon-arrow-up" @click="addVoteAnswer(true, answer._id)"></i>
          <br>{{voteCount(answer.votes)}}<br>
          <i class="el-icon-arrow-down" @click="addVoteAnswer(false, answer._id)"></i>
        </span>
        <p style="margin-left: 20px; float: left;">{{answer.content}}</p><br>
        <p style="text-align: right;">by: {{answer.creator.username}}</p>
      </div>
    </el-card>
    <h3 style="text-align: left;">Your answer:</h3>
    <div style="margin: 10px 500px 20px 0;">
      <el-input type="textarea" :rows="3" :cols="12" placeholder="Please input" v-model="answer"></el-input>
    </div>
    <el-button type="primary" style="float: left; margin-bottom: 50px;" @click="addAnswer(question._id)">Post Your Answer</el-button>
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
      question : {},
      answer: ''
    }
  },
  created(){
    let that = this
    Vue.axios.get('http://localhost:3000/questions/'+that.$route.params.id)
    .then((response)=>{
      console.log(that.$route.params.id)
      console.log(response.data)
      that.question = response.data
    }).catch((err)=>{
      console.log(err)
    })
  },
  methods: {
    addAnswer(questionid){
      let that = this
      if(localStorage.getItem('token')){
        Vue.axios.post('http://localhost:3000/answers',{
          content: that.answer,
          questionId: questionid
        },{
          headers: {
            token: localStorage.getItem('token')
          }
        }).then((response)=>{
          that.getter()
          that.answer=''
        }).catch((err)=>{
          console.log(err);
        })
      } else {
        that.$message({
              type: 'warning',
              message: 'Please sign in to post your answer!'
            });
      }
    },
    getter(){
      let that = this
      Vue.axios.get('http://localhost:3000/questions/'+that.$route.params.id)
      .then((response)=>{
        console.log(that.$route.params.id)
        console.log(response.data)
        that.question = response.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    voteCount(votes){
      let n = 0
      for(let i=0; i<votes.length; i++){
        if(votes[i].up){
          n++
        } else {
          n--
        }
      }
      return n
    },
    addVoteQuestion(up, questionid){
      let that = this;
      if(localStorage.getItem('token')){
        Vue.axios.post('http://localhost:3000/votes', {
          up: up,
          questionId: questionid
        },{
          headers: {
            token: localStorage.getItem('token')
          }
        }).then((response)=>{
          if(response.data.msg){
            this.$alert(response.data.msg, 'Alert', {
              confirmButtonText: 'OK',
            });
          } else {
            that.getter()
          }
        }).catch((err)=>{
          console.log(err);
        })
      } else {
        that.$message({
              type: 'warning',
              message: 'Please sign in to vote!'
            });
      }
      
    },
    addVoteAnswer(up, answerid){
      let that = this;
      if(localStorage.getItem('token')){
        Vue.axios.post('http://localhost:3000/votes', {
          up: up,
          answerId: answerid
        },{
          headers: {
            token: localStorage.getItem('token')
          }
        }).then((response)=>{
          if(response.data.msg){
            this.$alert(response.data.msg, 'Alert', {
              confirmButtonText: 'OK',
            });
          } else {
            that.getter()
          }
        }).catch((err)=>{
          console.log(err);
        })
      } else {
        that.$message({
              type: 'warning',
              message: 'Please sign in to vote!'
            });
      }
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
  .question{
    margin: 50px 0 50px 50px;
  }
</style>
