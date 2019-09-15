<template>
    <div>
        <ul class="tags-list">
            <li class="tag-item" v-for="(tagName, index) in value">
                <span>{{ tagName }}</span>

                <button type="button" @click="removeTag(index)">
                    <i class="fa fa-times"/>
                </button>
            </li>
        </ul>

        <div class="input-group">
            <input class="form-control" id="tag-name" name="tag" ref="tagNameField" type="text" placeholder="TAG NAME"
                   v-model.trim="tag.name"/>
            <div class="input-group-append">
                <button class="input-group-text btn btn-info" id="tag-name-btn" type="button"
                        @click="addTag">
                    Add tag
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tag: {
                    name,
                },
            };
        },
        props: {
            value: {
                type: Array,
                default: () => {
                    return [];
                },
            },
        },
        methods: {
            addTag() {
                if (this.tag.name !== '') {
                    this.value.push(this.tag.name);
                    this.tag.name = '';

                    this.$emit('input', this.value);
                } else {
                    this.$refs.tagNameField.focus();
                }
            },
            removeTag(index) {
                this.value.splice(index, 1);
                this.$emit('input', this.value);
            },
        },
    }
</script>

<style scoped>

</style>
