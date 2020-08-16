import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/category/create",
        name: "CategoryEdit",
        component: CategoryEdit,
      },
      {
        path: "/category/edit/:id",
        name: "CategoryEdit",
        component: CategoryEdit,
        props: true,
      },
      {
        path: "/category/list",
        name: "CategoryList",
        component: CategoryList,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
