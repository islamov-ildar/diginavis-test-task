import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Edit from "@/views/Edit.vue";
import UserCreate from "@/components/UserCreate";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/user_create",
    name: "UserCreate",
    component: UserCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
