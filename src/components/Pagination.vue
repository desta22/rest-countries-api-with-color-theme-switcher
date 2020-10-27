<template>
    <div class="pagination__sec">
        <!--<p>last page index: {{lastPageIndex}}</p>-->
        <!--<p>prev page index: {{prevPageIndex }}</p>-->
        <!--<p>current page index: {{currentPageIndex}}</p>-->
        <!--<p>next page index: {{nextPageIndex}}</p>-->
        <p class="pagination__desc">Current page {{currentPageIndex + 1}} of {{lastPageIndex + 1}} pages</p>

        <div class="pagination">
            <!--First btn-->
            <button :disabled="firstDisabled" @click="selectPage('first')" class="pagination__btn first">
                <fa-icon class="pagination__btn-icon" :icon="['fas', 'angle-double-left']"/>
            </button>
            <!--Prev btn-->
            <button :disabled="prevDisabled" @click="selectPage('prev')" class="pagination__btn prev">
                <fa-icon class="pagination__btn-icon" :icon="['fas', 'arrow-left']"/>
            </button>
            <span v-if="showDots" class="pagination__dots">
                  <fa-icon class="pagination__dots-icon" :icon="['fas', 'ellipsis-h']"/>
            </span>
            <!--Page btn-->
            <span v-for="item in chunksNumber" :key="item">

            <button
                    v-if="visibleNumbersShow(item)"

                    :disabled="currentPageIndex == item"
                    class="pagination__btn"
                    :class="{'selected': item == currentPageIndex}"
                    @click="selectPage(item)"
            >
                {{item+1}}
            </button>
            </span>
            <span v-if="showDots" class="pagination__dots">
                  <fa-icon class="pagination__dots-icon" :icon="['fas', 'ellipsis-h']"/>
            </span>
            <!--Next btn-->
            <button :disabled="nextDisabled" @click="selectPage('next')" class="pagination__btn next">
                <fa-icon class="pagination__btn-icon" :icon="['fas', 'arrow-right']"/>
            </button>
            <!--Last btn-->
            <button :disabled="lastDisabled" @click="selectPage('last')" class="pagination__btn last">
                <fa-icon class="pagination__btn-icon" :icon="['fas', 'angle-double-right']"/>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        data() {
            return {
                isPageSelected: false,
                prevPageIndex: 0,
                nextPageIndex: 1,
                firstDisabled: true,
                prevDisabled: true,
                nextDisabled: false,
                lastDisabled: false,
                numberDisabled: false,
                pageIndex: 0,
                showDots: true,
                visibleNumbers: []
            }
        },
        computed: {
            chunksNumber() {
                return Array.from(Array(this.$store.getters.getChunksNumber).keys())
            },
            currentPageIndex() {
                return this.$store.getters.getPageIndex
            },
            lastPageIndex() {
                return this.chunksNumber.length - 1
            },
        },
        watch: {
            chunksNumber(newValue) {
                this.shortenPaginationList();
            },
            currentPageIndex() {
                this.shortenPaginationList();
                // TODO replace watching currentPageIndex with url query watching ?page=3 if no query 0
                if (this.currentPageIndex === 0) {
                    this.prevPageIndex = 0
                } else if (this.currentPageIndex >= this.chunksNumber.length - 1) {
                    this.nextPageIndex = this.chunksNumber.length - 1
                } else {
                    this.prevPageIndex = this.currentPageIndex - 1;
                    this.nextPageIndex = this.currentPageIndex + 1;
                }
                this.buttonDisable(this.currentPageIndex);

            }
        },
        mounted() {
            if (this.$route.query.pageIndex) {
                console.log('Ima pageIndex');
                this.$store.dispatch('pageNum', 0);
            }


        },
        methods: {
            visibleNumbersShow(item) {

                return this.visibleNumbers.includes(item)

            },
            shortenPaginationList() {

                const totalPages = [...this.chunksNumber];
                // const tpLength = totalPages.length;
                const pageIndex = this.currentPageIndex;

                const first5 = totalPages.slice(0, 5);
                const first3 = totalPages.slice(0, 3);
                const last5 = totalPages.slice(Math.max(totalPages.length - 5, 1));
                const last3 = totalPages.slice(Math.max(totalPages.length - 3, 1));


                if (this.chunksNumber.length > 5) {
                    this.showDots = true;

                    let shortenArr = [];

                    if (first3.includes(pageIndex)) {
                        shortenArr = first5;
                    } else if (last3.includes(pageIndex)) {
                        shortenArr = last5;
                    } else {
                        shortenArr = totalPages.slice(pageIndex - 2, pageIndex + 3);
                    }

                    this.visibleNumbers = shortenArr



                } else {
                    this.showDots = false;
                }
            },


            buttonDisable(pageIndex) {
                const totalPages = this.chunksNumber.length - 1;

                if (totalPages === pageIndex) {
                    // on last page
                    this.firstDisabled = false;
                    this.prevDisabled = false;
                    this.nextDisabled = true;
                    this.lastDisabled = true;
                }
                else if (pageIndex === 0) {
                    // on first page
                    this.firstDisabled = true;
                    this.prevDisabled = true;
                    this.nextDisabled = false;
                    this.lastDisabled = false;
                } else {
                    this.firstDisabled = false;
                    this.prevDisabled = false;
                    this.nextDisabled = false;
                    this.lastDisabled = false;
                }


            },
            changeQueryParam(newPageNum) {
                this.$router.push({path: this.$route.path, query: {pageIndex: newPageNum}})
            },
            selectPage(num) {
                switch (num) {
                    case 'first':
                        this.$store.dispatch('pageNum', 0);
                        break;
                    case 'prev':
                        this.$store.dispatch('pageNum', this.prevPageIndex);
                        break;
                    case 'next':
                        this.$store.dispatch('pageNum', this.nextPageIndex);
                        break;
                    case 'last':
                        this.$store.dispatch('pageNum', this.lastPageIndex);
                        break;
                    default:
                        this.$store.dispatch('pageNum', num)
                }
                this.changeQueryParam(this.currentPageIndex);

            }
        }
    }
</script>

<style lang="scss">
    .pagination__sec {
        padding: 50px 0px;
    }

    .pagination__desc {
        margin-bottom: 10px;
        font-size: 14px;
    }

    .pagination {

        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
    }

    .pagination__btn {
        border-radius: 4px;
        display: block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: var(--color-text);
        border: 1px solid var(--color-text);
        background-color: var(--color-bg);
        margin-bottom: 10px;
        margin-right: 10px;
        &.selected {
            background-color: var(--color-text);
            color: var(--color-bg);
            border-color: var(--color-text);
            &:disabled,
            &[disabled] {
                opacity: 1;
                cursor: initial;

            }
        }

        /*background-color:var(--rgb-color-text);*/
        &:hover:not([disabled]),
        &:focus:not([disabled]) {
            cursor: pointer;
            color: var(--color-bg);
            border-color: var(--color-text);
            background-color: rgba(var(--rgb-color-text), .8);
        }
        &:disabled,
        &[disabled] {
            opacity: .5;
            cursor: initial;

        }

    }

    .pagination__dots {
        padding: 0 20px;
        line-height: 40px;
    }
</style>
