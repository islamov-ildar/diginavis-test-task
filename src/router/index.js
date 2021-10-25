import { createRouter, createWebHistory } from "vue-router";
import EditQuestionary from "@/components/EditQuestionary.vue";
import CreateQuestionary from "@/components/СreateQuestionary";
import QuestionaryList from "@/components/QuestionaryList";
import Login from "@/components/Login";
import firebase from "firebase/compat";
import 'firebase/auth';

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/questionaryList",
    name: "questionaryList",
    component: QuestionaryList,
    // meta: {requiresAuth: true}
  },
  {
    path: "/createQuestionary",
    name: "createQuestionary",
    component: CreateQuestionary,
    // meta: {requiresAuth: true}
  },
  {
    path: "/editQuestionary/:id",
    name: "editQuestionary",
    component: EditQuestionary,
    // meta: {requiresAuth: true}
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser

  if(requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router;
