import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing";
import AddUsers from "./components/AddUsers";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Landing,
    },
    {
      path: "/add-users",
      name: "addUsers",
      component: AddUsers,
    },
  ],
});
