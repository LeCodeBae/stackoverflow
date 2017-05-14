<template>
  <el-table :data="questions" border style="width: 100%">
      <el-table-column  label="Title">
        <template scope="scope">
          <router-link :to="'/question/'+scope.row._id"><span>{{ scope.row.title }}</span></router-link>
        </template>
      </el-table-column>
      <el-table-column label="Content">
        <template scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Answers">
        <template scope="scope">
          <span>{{ scope.row.answers.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Votes">
        <template scope="scope">
          <span>{{ voteCount(scope.row.votes) }}</span>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

export default {
  data() {
    return {
      questions : []
    }
  },
  created() {
    let that = this
    Vue.axios.get('http://localhost:3000/questions')
    .then((response)=>{
      console.log(response.data)
      that.questions=response.data
    }).catch((err)=>{
      console.log(err)
    })
  },
  methods: {
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
    }
  }
}
</script>

<style>
</style>