/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
*/

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