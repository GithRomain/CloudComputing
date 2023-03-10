import { createWebHistory, createRouter } from "vue-router";
import ProductsList from "./components/ProductsList";
import BasketList from "./components/BasketList";
import LoginForm from "./components/LoginForm";
import UserAll from "./components/UserAll";
import FormProduct from "./components/FormProduct";

const routes =  [
    {
        path: "/ProductList",
        name: "ProductList",
        component: ProductsList
    },
    {
        path: "/BasketList",
        name: "BasketList",
        component: BasketList
    },
    {
        path: "/LoginForm",
        name: "LoginForm",
        component: LoginForm
    },
    {
        path: "/UserAll",
        name: "UserAll",
        component: UserAll
    },
    {
        path: "/FormProduct",
        name: "FormProduct",
        component: FormProduct
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

