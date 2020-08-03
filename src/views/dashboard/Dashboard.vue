<template>
    <div>
        <h2>這裡是管理頁面</h2>
        <div id="nav">
        <router-link to="/admin">後台首頁</router-link> |
        <router-link to="/admin/products">產品管理列表</router-link> |
        <router-link to="/admin/coupons">優惠券列表</router-link> |
        <router-link to="/admin/orders">訂單列表</router-link> |
        <router-link to="/admin/images">圖片儲存列表</router-link> |
        <router-link to="/">回前台首頁</router-link> |
        </div>
        <router-view/>
    </div>
</template>
