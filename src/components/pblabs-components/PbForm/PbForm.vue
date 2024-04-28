<template>
    <div style="display: flex; flex-direction: row;">
        <table cellspacing="4" style="flex: 1; width: 0;">
            <tr v-for="(item, itemIndex) in data" :key="itemIndex">
                <td class="field-label">{{ item.labelId ? $t( item.labelId ) : item.label }}</td>
                <td style="width: 20px;"></td>
                <td class="field-value-container">
                    <div v-if="item.type == 'StaticText'" :ref="getRefName( itemIndex )"
						class="field field-static-text">{{ item.value }}</div>
                    <pb-time-picker v-else-if="item.type == 'TimePicker'" :ref="getRefName( itemIndex )"
						v-model="item.value" :mode="item.mode" :result-mode="item.resultMode" class="field" />
					<input v-else-if="item.type == 'Password'" :ref="getRefName( itemIndex )"
						type="password" v-model="item.value" class="field field-input" :readonly="item.readOnly" :disabled="item.disabled"
						:placeholder="item.placeholder" :required="item.required">
					<input v-else type="text" :ref="getRefName( itemIndex )"
						v-model="item.value" class="field field-input" :readonly="item.readOnly" :disabled="item.disabled"
						:placeholder="item.placeholder" :required="item.required">
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
    border-radius: 3px;
    padding: 6px 8px;
    box-sizing: border-box;
    line-height: 140%;
    color: #333;
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
</style>