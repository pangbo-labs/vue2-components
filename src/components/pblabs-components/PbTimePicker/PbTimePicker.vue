<template>
    <div ref="root" class="component-root">
		<div ref="editor" style="flex: 1; width: 0;">
			<div style="display: inline-block;">
				<div class="time-component" :class="{ 'time-component-editing': isHourPickerVisible }" @click="toggleHourPicker">
					{{ padZero( hour, 2 ) }}
				</div>
				<div v-if="isHourPickerVisible" class="picker-panel" style="margin-left: -30px;">
					<div>
						<div v-for="(item, itemIndex) in 12" class="picker-item" :class="{ 'picker-item-selected': item - 1 == hour }"
							@click="setHour( item - 1 ); isHourPickerVisible = false;">
							{{ padZero( item - 1 ) }}
						</div>
					</div>
					<div v-if="is24HourMode()" style="margin-top: 4px;">
						<div v-for="(item, itemIndex) in 12" class="picker-item" :class="{ 'picker-item-selected': item + 12 - 1 == hour }"
							@click="setHour( item + 12 - 1 ); isHourPickerVisible = false;">
							{{ padZero( item + 12 - 1 ) }}
						</div>
					</div>
				</div>
			</div>
			<div class="time-component-separator">:</div>
			<div style="display: inline-block;">
				<div class="time-component" :class="{ 'time-component-editing': isMinutePickerVisible }" @click="toggleMinutePicker">
					{{ padZero( minute, 2 ) }}
				</div>
				<div v-if="isMinutePickerVisible" class="picker-panel" style="display: flex; flex-direction: row; margin-left: -30px;">
					<div style="display: inline-block;">
						<div v-for="(item, itemIndex) in 6" class="picker-item" :class="{ 'picker-item-selected': item - 1 == Math.floor( minute / 10 ) }"
							@click="setMinute( (item - 1) * 10 + minute % 10 )">
							{{ item - 1 }}
						</div>
					</div>
					<div style="display: inline-block; margin-left: 10px; margin-right: 10px; background: #ddd; width: 1px;"></div>
					<div style="display: inline-block;">
						<div v-for="(item, itemIndex) in 10" class="picker-item" :class="{ 'picker-item-selected': item - 1 == minute % 10 }"
							@click="setMinute( minute - minute % 10 + (item - 1) ); isMinutePickerVisible = false;">
							{{ item - 1 }}
						</div>
					</div>
				</div>
			</div>
			<div v-if="isSecondMode()" style="display: inline-block;">
				<div class="time-component-separator">:</div>
				<div style="display: inline-block;">
					<div class="time-component" :class="{ 'time-component-editing': isSecondPickerVisible }" @click="toggleSecondPicker">
						{{ padZero( second, 2 ) }}
					</div>
					<div v-if="isSecondPickerVisible" class="picker-panel" style="display: flex; flex-direction: row; margin-left: -30px;">
						<div style="display: inline-block;">
							<div v-for="(item, itemIndex) in 6" class="picker-item" :class="{ 'picker-item-selected': item - 1 == Math.floor( second / 10 ) }"
								@click="setSecond( (item - 1) * 10 + second % 10 )">
								{{ item - 1 }}
							</div>
						</div>
						<div style="display: inline-block; margin-left: 10px; margin-right: 10px; background: #ddd; width: 1px;"></div>
						<div style="display: inline-block;">
							<div v-for="(item, itemIndex) in 10" class="picker-item" :class="{ 'picker-item-selected': item - 1 == second % 10 }"
								@click="setSecond( second - second % 10 + (item - 1) ); isSecondPickerVisible = false;">
								{{ item - 1 }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="isMillisecondMode()" style="display: inline-block;">
				<div class="time-component-separator">.</div>
				<div class="time-component time-component-readonly">{{ padZero( millisec, 3 ) }}</div>
			</div>
			<div v-if="!is24HourMode()" style="display: inline-block;">
				<div class="am-pm-separator"></div>
				<div style="display: inline-block;">
					<div ref="amPm" class="time-component" :class="{ 'time-component-editing': isAmPmPickerVisible }" @click="toggleAmPmPicker">
						{{ amOrPm.toUpperCase() }}
					</div>
					<div ref="amPmPicker" v-if="isAmPmPickerVisible" :style="{ 'visibility': isAmPmPickerVisible ? 'visible' : 'hidden' }" class="picker-panel" style="margin-left: -20px;">
						<div>
							<div class="picker-item" :class="{ 'picker-item-selected': amOrPm == 'am' }"
								@click="setAmPm( 'am' ); isAmPmPickerVisible = false;">
								AM
							</div>
							<div class="picker-item" :class="{ 'picker-item-selected': amOrPm == 'pm' }"
								@click="setAmPm( 'pm' ); isAmPmPickerVisible = false;">
								PM
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div ref="actions" style="line-height: 100%;">
			<!-- <i class="material-symbols material-symbols-rounded time-component" style="display: inline-block; font-size: 18px; font-variation-settings: 'wght' 300;">content_copy</i>
			<i class="material-symbols material-symbols-rounded time-component" style="display: inline-block; font-size: 18px; font-variation-settings: 'wght' 300;">content_paste</i> -->
		</div>
    </div>
</template>

<script>
export default {
    name: "PbTimePicker",
    props:
    {
        value:		{ type: String, default: "00:00:00" },
        mode:		{ type: String, default: "hh:mm:ss.SSS" }, // hh:mm, hh24:mm, hh:mm:ss, hh24:mm:ss, hh:mm:ss.SSS, hh24:mm:ss.SSS
		resultMode:	{ type: String, default: "hh:mm:ss.SSS" }, // hh:mm, hh24:mm, hh:mm:ss, hh24:mm:ss, hh:mm:ss.SSS, hh24:mm:ss.SSS
    },
	model:
	{
		prop: 'value',
		event: 'changed',
	},
    data: function()
    {
        return {
			hour: 0,
			minute: 0,
			second: 0,
			millisec: 0,
			amOrPm: "am",
			isHourPickerVisible: false,
			isMinutePickerVisible: false,
			isSecondPickerVisible: false,
			isAmPmPickerVisible: false,
		}
    },
	mounted: function()
	{
		if (this.value)
		{
			var parts = this.value.split( " " );
			if ((parts.length > 1) && ((parts[1] == "am") || (parts[1] == "pm")))
				this.amOrPm = parts[1];

			var temp = parts[0].split( "." );
			if (temp.length > 1)
				this.millisec = temp[1];

			var timeComponents = temp[0].split( ":" );
			this.hour = timeComponents[0];
			if (timeComponents.length > 1)
				this.minute = timeComponents[1];
			if (timeComponents.length > 2)
				this.second = timeComponents[2];
		}
	},
	methods:
	{
		padZero: function( num, digits )
		{
			if (!digits)
				digits = 2;
			return num.toString().padStart( digits, "0" );
		},

		toggleHourPicker: function()
		{
			this.isHourPickerVisible = !this.isHourPickerVisible;
			this.isMinutePickerVisible = false;
			this.isSecondPickerVisible = false;
			this.isAmPmPickerVisible = false;
		},

		toggleMinutePicker: function()
		{
			this.isHourPickerVisible = false;
			this.isMinutePickerVisible = !this.isMinutePickerVisible;
			this.isSecondPickerVisible = false;
			this.isAmPmPickerVisible = false;
		},

		toggleSecondPicker: function()
		{
			this.isHourPickerVisible = false;
			this.isMinutePickerVisible = false;
			this.isSecondPickerVisible = !this.isSecondPickerVisible;
			this.isAmPmPickerVisible = false;
		},

		toggleAmPmPicker: function()
		{
			this.isHourPickerVisible = false;
			this.isMinutePickerVisible = false;
			this.isSecondPickerVisible = false;
			this.isAmPmPickerVisible = !this.isAmPmPickerVisible;
		},

		setHour: function( value )
		{
			this.hour = value;
			this.$emit( "changed", this.makeValue() );
		},

		setMinute: function( value )
		{
			this.minute = value;
			this.$emit( "changed", this.makeValue() );
		},

		setSecond: function( value )
		{
			this.second = value;
			this.$emit( "changed", this.makeValue() );
		},

		setAmPm: function( value )
		{
			this.amOrPm = value;
			this.$emit( "changed", this.makeValue() );
		},

		makeValue: function()
		{
			var value = `${this.padZero( this.hour, 2 )}:${this.padZero( this.minute, 2 )}`;
			if (this.isSecondMode( this.resultMode ))
				value += `:${this.padZero( this.second, 2 )}`;
			if (this.isMillisecondMode( this.resultMode ))
				value += `.${this.padZero( this.millisec, 3 )}`;
			if (!this.is24HourMode( this.resultMode ))
				value += ` ${this.amOrPm}`;
			return value;
		},

		is24HourMode: function( mode )
		{
			if (!mode)
				mode = this.mode;

			return (mode == 'hh24:mm') ||
				(mode == 'hh24:mm:ss') ||
				(mode == 'hh24:mm:ss.SSS');
		},

		isSecondMode: function( mode )
		{
			if (!mode)
				mode = this.mode;

			return (this.mode == 'hh:mm:ss') ||
				(this.mode == 'hh24:mm:ss') ||
				(this.mode == 'hh:mm:ss.SSS') ||
				(this.mode == 'hh24:mm:ss.SSS');
		},

		isMillisecondMode: function( mode )
		{
			if (!mode)
				mode = this.mode;

			return (this.mode == 'hh:mm:ss.SSS') || (this.mode == 'hh24:mm:ss.SSS');
		},
	}
}
</script>

<style scoped>
.component-root {
	display: flex;
	flex-direction: row;
}

.time-component {
	display: inline-block;
	border-radius: 3px;
	padding-left: 3px;
	padding-right: 3px;
	user-select: none;
}

.time-component:hover {
	background: #eee;
}

.time-component-readonly, .time-component-readonly:hover {
	background: transparent;
	opacity: 0.5;
}

.time-component-editing, .time-component-editing:hover {
	background: #eee;
}

.time-component-separator {
	display: inline-block;
	padding-left: 2px;
	padding-right: 2px;
	user-select: none;
}

.am-pm-separator {
	display: inline-block;
	min-width: 5px;
	user-select: none;
}

.picker-panel {
	position: absolute;
	margin-top: 4px;
	border: 1px solid #ccc;
	padding: 8px 12px;
	background: #fff;
	box-shadow: 0 2px 12px 0 rgba( 0, 0, 0, .1 );
	z-index: 999;
}

.picker-title {
	font-size: 16px;
	font-weight: 600;
	color: #69f;
	margin-bottom: 5px;
}

.picker-item {
	display: inline-block;
	border-radius: 3px;
	padding: 2px 6px;
	cursor: default;
	user-select: none;
}

.picker-item:hover {
	background: #eee;
}

.picker-item + .picker-item {
	margin-left: 4px;
}

.picker-item-selected, .picker-item-selected:hover {
	background: #69f;
	color: #fff;
}
</style>