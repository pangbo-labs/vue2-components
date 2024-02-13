<template>
	<div id="app">
		<div class="main-frame">
			<div style="border-right: 1px solid #ccc;">
				<div style="padding: 10px 10px; border-bottom: 1px solid #ccc;">
					<div class="navi-item">
						<i class="material-symbols material-symbols-rounded" style="font-size: 28px; font-variation-settings: 'wght' 300;">account_circle</i>
					</div>
				</div>
				<PbVerticalNaviBar :navi-items="naviItems" :display-caption="false" style="position: sticky; top: 0px;" />
			</div>
			<router-view style="flex: 1; width: 0;" />
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			naviItems: [
				{ caption: "Home", icon: "home", routePath: "/" },
				{ caption: "Users", icon: "group", routePath: "/users" },
				{ caption: "Configuration", icon: "settings", routePath: "/configuration" },
				{ caption: "Logs", icon: "description", routePath: "/logs" },
			],
		}
	}
}
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;

	margin: 0 0 0 0;
	font-family: var(--font-family);
	font-size: var(--text-size);
	line-height: var(--line-height);
	color: var(--text-color);
}

.main-frame {
	display: flex;
	flex-direction: row;
	height: 100%;
}

.navi-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 3px;
	padding: 6px 8px;
	color: #444;
	text-align: left;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.navi-item:hover {
	background: #fa3;
	color: #fff;
	transition: all .3s;
}
</style>
