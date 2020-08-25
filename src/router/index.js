import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";


import AdsEdit from "../views/AdsEdit.vue";
import AdsList from "../views/AdsList.vue";
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

      {
        path: "/item/create",
        name: "ItemCreate",
        component: ItemEdit,
      },
      {
        path: "/item/edit/:id",
        name: "ItemEdit",
        component: ItemEdit,
        props: true,
      },
      {
        path: "/item/list",
        name: "ItemList",
        component: ItemList,
      },

      {
        path: "/hero/create",
        name: "HeroCreate",
        component: HeroEdit,
      },
      {
        path: "/hero/edit/:id",
        name: "HeroEdit",
        component: HeroEdit,
        props: true,
      },
      {
        path: "/hero/list",
        name: "HeroList",
        component: HeroList,
      },

      {
        path: "/article/create",
        name: "ArticleCreate",
        component: ArticleEdit,
      },
      {
        path: "/article/edit/:id",
        name:  "ArticleEdit",
        component: ArticleEdit,
        props: true,
      },
      {
        path: "/article/list",
        name: "ArticleList",
        component: ArticleList,
      },


      {
        path: "/ads/create",
        name: "AdsCreate",
        component: AdsEdit,
      },
      {
        path: "/ads/edit/:id",
        name:  "AdsEdit",
        component: AdsEdit,
        props: true,
      },
      {
        path: "/ads/list",
        name: "AdsList",
        component: AdsList,
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
