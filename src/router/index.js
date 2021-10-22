import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import About from "../noRelevantFiles/views/About.vue";
import EditQuestionary from "@/components/EditQuestionary.vue";
import CreateQuestionary from "@/components/СreateQuestionary";
import QuestionaryList from "@/components/QuestionaryList";
const routes = [
  {
    path: "/",
    name: "questionaryList",
    component: QuestionaryList,
  },
  {
    path: "/createQuestionary",
    name: "createQuestionary",
    component: CreateQuestionary,
  },
  {
    path: "/editQuestionary/:id",
    name: "editQuestionary",
    component: EditQuestionary,
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   component: About,
  // },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
