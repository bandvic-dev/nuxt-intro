<template>
    <div class="container--wide">
        <h1>{{ data.title || '-' }}</h1>
        <p>{{ data.bankName || '-' }} - Покупка доллара {{ data.bankBuyUSD }}, Продажа {{ data.bankSellUSD }}</p>
    </div>
</template>

<script setup>
const page = {
    title: 'Home Page',
    description: 'The Intuitive Vue Framework.'
}

useSeoMeta({
    title: page.title,
    description: page.description
});

const { data } = await useFetch('/api/fincombank');

</script>

<style lang="scss" scoped></style>