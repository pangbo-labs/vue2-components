<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
    <div>
        <div v-for="(item, itemIndex) in pathComponents" :key="itemIndex" style="display: inline-block;">
            <span v-if="itemIndex > 0" class="path-seperator">/</span>
            <span class="path-component" @click="onComponentClicked( item.path )">{{ item.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PbPath",
    props: {
        path: { type: String, default: "" },
    },
    data: function() {
        return {
        }
    },
    computed: {
        pathComponents: function()
        {
            var result = new Array();

            var componentData = new Object();
            componentData.name = "ROOT";
            componentData.path = "/";
            result.push( componentData );

            var components = this.path.split( "/" );
            var path = "";
            for (var i = 1; i < components.length; i ++)
            {
                var componentName = components[i];
                path += "/" + componentName;
                componentData = new Object();
                componentData.name = decodeURI( componentName );
                componentData.path = path;
                result.push( componentData );
            }
            return result;
        }
    },
    methods: {

        onComponentClicked: function( component )
        {
            this.$emit( "component-clicked", component );
        }
    },
}
</script>

<style scoped>
.path-seperator {
    padding: 1px 3px;
    cursor: default;
    user-select: none;
}
.path-component {
    border-radius: 3px;
    padding: 1px 3px;
    font-weight: 600;
    color: #69c;
    cursor: default;
    user-select: none;
}

.path-component:hover {
    background: #eee;
}
</style>