<template>
    <header class="header">
        <div class="container--wide header-row">
            <div class="logo">
                <NuxtLink class="logo__link" to="/">NUXT-INTRO</NuxtLink>
            </div>
            <nav class="nav-menu">
                <ul class="menu">
                    <li class="menu__item">
                        <NuxtLink class="menu__link" to="/">Home</NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__link" to="/about">About</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script setup></script>
<style lang="scss" scoped>
.header {
    background: #dbdbdb;

    &-row {
        display: flex;
        align-items: center;
    }
}

.logo {
    background: #56efff;
    padding: 20px;
}

.menu {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
        background: #eee;
        padding: 20px;
    }

    &__item:not(:last-child) {
        border-right: 1px solid #ddd;
    }

    &__link {}
}
</style>