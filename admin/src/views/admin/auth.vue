<template>
    <div class="auth">
        <header>WELCOME BACK</header>
        <main>
            {{$store.state.userInfo.account}}
        </main>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.auth header {
    font-weight: bold;
    text-align: center;
    margin: 2rem;
    font-size: 2rem;
}
.auth main {
    font-size: 1.5rem;
    text-align: center;
    color: #e2aa2f;
}
</style>