<template>
    <div>
        This page is protected
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})
</script>

<style lang="scss" scoped></style>