import Vue from 'vue';
import VueRouter from "vue-router";
import Examine from '@/pages/Examine.vue';
import Introduction from '@/pages/Introduction.vue';
import User from '@/pages/User.vue';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Introduction,
        },
        {
            path: '/Introduction',
            component: Introduction,
            name: 'Introduction'
        },
        {
            path: '/Examine',
            component: Examine,
            name: 'Examine'
        },
        {
            path:'/Resources',
            name:'Resources',
            component: () => import('../pages/Resources.vue')
        },
        {
            path:'/MyResource',
            name:'MyResource',
            component: () => import('../pages/MyResource.vue')
        },
        {
            path:'/UserResource',
            name:'UserResource',
            component: () => import('../pages/UserResource.vue')
        },
        {
            path: '/User',
            component: User,
            name: 'User'
        },


    ]
})




export default router;