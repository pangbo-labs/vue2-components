<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
    <div class="pb-doc-block" style="display: flex; flex-direction: row;">
        <table cellspacing="4" style="flex: 1; width: 0;">
            <tr v-for="(item, itemIndex) in data" :key="itemIndex">
				<td v-if="item.type == 'Separator'" colspan="3">
					<div style="height: 8px;"></div>
				</td>
                <td v-if="item.type != 'Separator'" class="field-label">{{ item.labelId ? $t( item.labelId ) : item.label }}</td>
                <td v-if="item.type != 'Separator'" style="width: 20px;"></td>
                <td v-if="item.type != 'Separator'" class="field-value-container">
                    <div v-if="item.type == 'StaticText'" :ref="getRefName( itemIndex )"
						class="field field-static-text">{{ item.value }}</div>
                    <pb-time-picker v-else-if="item.type == 'TimePicker'" :ref="getRefName( itemIndex )"
						v-model="item.value" :mode="item.mode" :result-mode="item.resultMode" class="field"
						@change="if (item.onChange) item.onChange( $event );" />
					<input v-else-if="item.type == 'Password'" :ref="getRefName( itemIndex )"
						type="password" v-model="item.value" class="field field-input" :readonly="item.readOnly" :disabled="item.disabled"
						:placeholder="item.placeholderId ? $t( item.placeholderId ) : item.placeholder" :required="item.required"
						@change="if (item.onChange) item.onChange( $event );">
					<select v-else-if="item.type == 'Select'" v-model="item.value"
						:placeholder="item.placeholderId ? $t( item.placeholderId ) : item.placeholder"
						class="field field-select"
						@change="if (item.onChange) item.onChange( $event );">
						<option v-for="(option, optionIndex) in item.options" :key="optionIndex"
							:value="option.value" :label="option.labelId ? $t( option.labelId ) : option.label" class="field field-option">
						</option>
					</select>
					<textarea v-else-if="item.type == 'TextArea'" :ref="getRefName( itemIndex )"
						v-model="item.value" class="field field-input" :readonly="item.readOnly" :disabled="item.disabled"
						:placeholder="item.placeholderId ? $t( item.placeholderId ) : item.placeholder" :required="item.required" :style="{ 'height': item.height ? item.height : 'auto' }"
						@change="if (item.onChange) item.onChange( $event );">
					</textarea>
					<input v-else type="text" :ref="getRefName( itemIndex )"
						v-model="item.value" class="field field-input" :readonly="item.readOnly" :disabled="item.disabled"
						:placeholder="item.placeholderId ? $t( item.placeholderId ) : item.placeholder" :required="item.required"
						@change="if (item.onChange) item.onChange( $event );">
				</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "PbForm",
    props:
    {
        data: { type: Object, default: new Object() },
    },
    data: function()
    {
        return {}
    },
	methods:
	{
		getRefName: function( fieldName )
		{
			return "field_" + fieldName;
		}
	}
}
</script>

<style scoped>
.field-label {
    font-weight: normal;
    width: 0px;
    white-space: nowrap;
    vertical-align: baseline;
    padding: 6px 0px;
    line-height: 140%;
    box-sizing: border-box;
}

.field-value-container * {
    width: 100%;
    vertical-align: baseline;
}

.field {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 8px;
    box-sizing: border-box;
    line-height: 140%;
    color: #333;
}

.field:focus {
	outline: none;
}

.field-static-text {
    background: #f6f6f6;
}

.field-input {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 6px 8px;
    box-sizing: border-box;
	color: #333;
}

.field-input:focus {
    outline: 0;
}

.field-input::placeholder {
    opacity: 0.5;
}

.field-select {
	color: #333;
}

.field-option {
	background: #fff;
}
</style>

<style>
select option {
	background: #fff;
	padding: 0 0;
	color: red;
}
</style>