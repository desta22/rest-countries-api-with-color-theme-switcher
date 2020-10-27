<template>
    <div class="site-header">
        <div class="container">

            <div class="main-nav">
                <router-link @click="resetPage" class="logo-link" to="/">Where in the world</router-link>
                <a @click="toggleMode" class="mode-link">
                    <fa-icon class="mode-link__icon" :icon="['far', 'moon']"/>
                    Dark mode
                </a>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderComp",
        data() {
            return {
                isDark: false,
            }
        },
        methods: {
            resetPage() {


                this.$store.dispatch('pageNum', 0);
            },
            toggleMode() {
                console.log('from toggleMode');
                this.isDark = !this.isDark;
                // this.$emit('isDark', this.isDark)
                if (this.isDark) {

                    document.body.classList.add('dark')
                } else {
                    document.body.classList.remove('dark')
                }
            }
        }
    }
</script>

<style lang="scss">
    .site-header {
        padding: 30px 0;
        background-color: var(--color-bg);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);
        margin-bottom: 50px;
    }

    .main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo-link {
        font-size: 24px;
        font-weight: 800;
        color: var(--color-text);
    }

    .mode-link {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text);
    }

    .mode-link__icon {
        margin-right: 10px;
    }
</style>
