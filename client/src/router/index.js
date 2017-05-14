import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/Questions'
import Question from '@/components/Question'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Questions
    },
    {
      path: '/question/:id',
      component: Question
    },
    {
      path: '/profile/:profileid',
      component: Profile
    }
  ]
})
