export default {

    name: "Theme1",
    description: "",
    author: "Bo Pang",
	releaseTime: "202/02/21 01:00",
	copyright: "",

    themeData:  {
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
	},

};