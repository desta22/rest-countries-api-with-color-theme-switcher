<template>
    <div class="dropdown">
        {{dropdownElements}}
        <a class="btn btn-primary" @click="openDropdown()">{{dropdownTitle}}</a>
        <ul >
            <li v-for="(item , index) in dropdownElements" :key="index">
                <a @click="selectItem(item)">{{item.name}} </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props:[
            'elements','title', 'selected'
        ],
        data(){
            return{

            dropdownElements:this.elements,
            dropdownTitle:this.title,
            dropdownSelected:this.selected,
            }
        },
        methods:{
            selectItem(item) {
                const items = this.dropdownElements;
                let filteredRegionList =[];
                const startTitle = this.dropdownTitle;
                if(item.slug !== 'all'){
                    this.dropdownTitle = item.name;
                    // remove selected
                    filteredRegionList = item.filter((e) => {
                        return  e.name !== item.name
                    });
                    // add 'all' item
                    filteredRegionList.unshift({name:'Select all', slug:'all'});


                } else {
                    this.dropdownTitle = startTitle;
                    filteredRegionList = items;
                }

                this.dropdownElements = filteredRegionList;
                // filteredRegionList.

            },
        }
    }
</script>

<style scoped>

</style>
