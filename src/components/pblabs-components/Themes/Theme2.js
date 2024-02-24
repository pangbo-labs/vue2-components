export default {

    name: "Theme2",
    description: "",
    author: "Bo Pang",
	releaseTime: "202/02/21 01:00",
	copyright: "",

    themeData:  {
		PbTable: {
			table: {
				border: "0px solid #eee",
				borderRadius: "0px",
				background: "transparent",
			},
			headerRow: {
				virticalAlign: "center",
				background: "#f3f3f3",
				color: "#37352f",
				lineHeight: "150%",
				borderBottom: "0px solid #999",
			},
			dataRow: {
				virticalAlign: "center",
				background: "#fff",
				color: "#37352f",
				lineHeight: "150%",
				borderBottom: "1px solid #ddd",
				hover: {
					background: "#f9f9f9",
				},
				selected: {
					background: "#e9e9e9",
					color: "",
				}
			},
		}
	},

};