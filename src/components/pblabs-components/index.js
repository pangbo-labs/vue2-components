
import CommonUtils from './CommonUtils.js'

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
import PbHGrids from './PbHGrids/PbHGrids.vue'

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
	PbHGrids,
];

export default
{
	install: function (Vue)
	{
		Vue.prototype.$commonUtils = CommonUtils;
		
		components.forEach( element => {
			Vue.component( element.name, element );
		});
	}
}
