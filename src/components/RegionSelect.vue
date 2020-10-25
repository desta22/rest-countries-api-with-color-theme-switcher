<template>
    <div class="region-select-sec">
        RegionSelect
        {{regions}}
    </div>
</template>

<script>
    export default {
        name: "RegionSelect",
        computed: {
            regions() {
                return this.$store.getters.getRegions
            }

        },
    }
</script>

<style scoped>

</style>
