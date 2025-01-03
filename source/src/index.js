/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
*/

import CommonUtils from './CommonUtils.js'

import DefaultTheme from '../themes/Theme1.js'

import PbVerticalNaviBar from './PbVerticalNaviBar/PbVerticalNaviBar.vue'
import PbContextMenu from './PbContextMenu/PbContextMenu.vue'
import PbTooltip from './PbTooltip/PbTooltip.vue'
import PbTooltipAnchor from './PbTooltip/PbTooltipAnchor.vue'
import PbButton from './PbButton/PbButton.vue'
import PbDialogBox from './PbDialogBox/PbDialogBox.vue'
import PbMessageBox from './PbMessageBox/PbMessageBox.vue'
import PbTable from './PbTable/PbTable.vue'
import PbPath from './PbPath/PbPath.vue'
import PbTabBar from './PbTabBar/PbTabBar.vue'
import PbForm from './PbForm/PbForm.vue'
import PbTimePicker from './PbTimePicker/PbTimePicker.vue'
import PbDropdownButton from './PbDropdownButton/PbDropdownButton.vue'
import PbStack from './PbStack/PbStack.vue'
import PbStackItem from './PbStack/PbStackItem.vue'
import PbPropertyTable from "./PbPropertyTable/PbPropertyTable.vue"
import PbPropertyTableEntry from "./PbPropertyTable/PbPropertyTableEntry.vue"
import PbPropertyTableSeparator from "./PbPropertyTable/PbPropertyTableSeparator.vue"
import PbSelect from './PbSelect/PbSelect.vue'
import PbBasicPopup from './PbBasicPopup/PbBasicPopup.vue'
import PbTreeNode from './PbTree/PbTreeNode.vue'
import PbTree from './PbTree/PbTree.vue'
import PbSwitch from './PbSwitch/PbSwitch.vue'
import PbMarkdown from './PbMarkdown/PbMarkdown.vue'
import PbList from './PbList/PbList.vue'
import PbImage from './PbImage/PbImage.vue'
import PbPagingBar from './PbPagingBar/PbPagingBar.vue'
import PbCodeBlock from './PbCodeBlock/PbCodeBlock.vue'
import PbPanel from './PbPanel/PbPanel.vue'

import MessageBox from "./MessageBox.js"

const components = [
	PbVerticalNaviBar,
	PbContextMenu,
	PbTooltip,
	PbTooltipAnchor,
	PbButton,
	PbDialogBox,
	PbMessageBox,
	PbTable,
	PbPath,
	PbTabBar,
	PbForm,
	PbTimePicker,
	PbDropdownButton,
	PbStack,
	PbStackItem,
	PbPropertyTable,
	PbPropertyTableEntry,
	PbPropertyTableSeparator,
	PbSelect,
	PbBasicPopup,
	PbTreeNode,
	PbTree,
	PbSwitch,
	PbMarkdown,
	PbList,
	PbImage,
	PbPagingBar,
	PbCodeBlock,
	PbPanel,
];

const PbComponentStyles = {
	PbTable: {
		table: {
			border: "1px solid #eee",
			borderRadius: "5px",
			background: "transparent",
		},
		headerRow: {
			virticalAlign: "center",
			background: "#f7f6f3",
    		color: "#37352f",
			lineHeight: "140%",
			borderBottom: "1px solid #eee",
		},
		dataRow: {
			virticalAlign: "center",
			background: "#fff",
			color: "#37352f",
			lineHeight: "140%",
			borderBottom: "1px solid #eee",
			hover: {
				background: "#f9f9f9",
			},
			selected: {
				background: "#eeeef9",
			}
		},
	}
};

function processStyleTree( themeObject, path )
{
	var propertyNames = Object.getOwnPropertyNames( themeObject );
	for (var i = 0; i < propertyNames.length; i ++)
	{
		var name = propertyNames[i];
		var value = themeObject[name];
		var valueType = typeof value;
		var valuePath = path + "." + name;
		var cssVarName = "-" + valuePath.replaceAll( "\.", "-" );
		console.log( `${name}: ${value}, value type: ${valueType}, cssVarName: ${cssVarName}` );

		if ((value instanceof Object) && (valueType != 'string'))
		{
			processStyleTree( value, valuePath );
		}
		else // style
		{
			document.documentElement.style.setProperty( cssVarName, value );
		}
	}
}

// function applyTheme( themeObject )
// {
// 	processStyleTree( themeObject, "" );

// 	const root = document.querySelector( ":root" );
// 	const rootStyle = getComputedStyle( root );
// 	console.log( `--PbTable-table-border: ${rootStyle.getPropertyValue( '--PbTable-table-border' )}` );
// }

function printRootStyle()
{
	const root = document.querySelector( ":root" );
	const rootStyle = getComputedStyle( root );
	var propertyNames = Object.getOwnPropertyNames( rootStyle );
	for (var i = 0; i < propertyNames.length; i ++)
	{
		var name = propertyNames[i];
		var value = rootStyle[name];
		console.log( `${name}: ${value}` );
	}
}

export default
{
	applyTheme: function( themeObject )
	{
		console.log( "Begin to apply the theme..." );

		if (!themeObject)
		{
			console.log( `Not a valid theme ${themeObject}, return without doing anything.` )
			return;
		}

		console.log( `Theme name: ${themeObject.name}, author: ${themeObject.author}` );

		processStyleTree( themeObject.themeData, "" );

		const root = document.querySelector( ":root" );
		const rootStyle = getComputedStyle( root );
		console.log( `--PbTable-headerRow-background: ${rootStyle.getPropertyValue( '--PbTable-headerRow-background' )}` );

		console.log( "Finished applying the theme." );
	},

	install: function (Vue)
	{
		console.log( "Installing the PbComponents..." )

		this.applyTheme( DefaultTheme );

		Vue.prototype.$commonUtils = CommonUtils;
		Vue.prototype.$pbComponentStyles = PbComponentStyles;
		
		components.forEach( element => {
			console.log( `Installing ${element.name}...` )
			Vue.component( element.name, element );
		});

		MessageBox.install( Vue );

		console.log( "Finished installing the PbComponents." );
	},
}
