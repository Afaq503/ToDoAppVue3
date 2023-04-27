import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import TodoView from "../views/TodoView.vue";

const routes = [
  {
    path: "/",
    component: LoginView,
    name: "LoginView",
  },
  {
    path: "/signup",
    component: SignupView,
    name: "SignupView",
  },
  {
    path: "/todo",
    component: TodoView,
    name: "TodoView",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
