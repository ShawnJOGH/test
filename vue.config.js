const { defineConfig } = require('@vue/cli-service')
const mockData = require("./mockData.js");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        setupMiddlewares(middlewares, devServer) {
            const body_parser = require("body-parser");
            devServer.app.get("/api/cataList", (req, res) => {
                res.jsonp(
                    [
                        {
                            name: '小型手办',
                            pic: ("4.jpg")
                        },
                        {
                            name: '24cm手办',
                            pic: ("3.png")
                        },
                        {
                            name: '35cm手办',
                            pic: ("5.png")
                        },
                        {
                            name: '大型手办',
                            pic: ("7.png")
                        },
                        {
                            name: '典藏手办',
                            pic: ("摆件6.jpg")
                        },
                        {
                            name: '鬼灭手办',
                            pic: ("摆件1.jpg")
                        },
                        {
                            name: '海贼手办',
                            pic: ("摆件4.jpg")
                        },
                        {
                            name: '积木',
                            pic: ("摆件3.jpg")
                        },
                        {
                            name: '毛绒',
                            pic: ("摆件2.jpg")
                        },
                        {
                            name: '玩偶',
                            pic: ("摆件5.jpg")
                        }
                    ],
                )
            })
            devServer.app.get("/api/imgList", (req, res) => {
                res.jsonp(
                    [
                        ("1.png"),
                        ("2.png"),
                        ("3.png"),
                        ("4.jpg")
                    ]
                )
            })
            devServer.app.get("/api/productList", (req, res) => {
                res.jsonp(
                    [
                        {
                            id: 1,
                            name: '我妻善逸 24cm',
                            desc: '鬼灭之刃',
                            price: 120,
                            unit: '个',
                            time: '2023/06/20 21:00:00',
                            pic_list: [{
                                pic: ("1.png"),
                                lll: "233"
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 2,
                            name: '黑死牟 24cm',
                            desc: '鬼灭之刃',
                            price: 130,
                            unit: '个',
                            time: '2023/06/28 20:00:00',
                            // pic_list: ("2.png")
                            pic_list: [{
                                pic: ("2.png")
                            }, {
                                pic: ("2_2.png")
                            }, {
                                pic: ("2_3.png")
                            }, {
                                pic: ("2_4.png")
                            }],
                        },
                        {
                            id: 3,
                            name: '继国缘一 24cm',
                            desc: '鬼灭之刃',
                            price: 240,
                            unit: '个 ',
                            time: '2023/06/17 22:00:00',
                            // pic: ("3.png")
                            pic_list: [{
                                pic: ("3.png")
                            }, {
                                pic: ("3_2.png")
                            }, {
                                pic: ("3_3.png")
                            }, {
                                pic: ("3_4.png")
                            }],
                        },
                        {
                            id: 4,
                            name: '伊之助',
                            desc: '鬼灭之刃',
                            price: 160,
                            unit: '个',
                            time: '2023/06/21 22:00:00',
                            // pic: ("4.jpg")
                            pic_list: [{
                                pic: ("4.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 5,
                            name: '上铉6',
                            desc: '鬼灭之刃',
                            price: 160,
                            unit: '个',
                            time: '2023/06/04 21:00:00',
                            // pic: ("5.png")
                            pic_list: [{
                                pic: ("5.png")
                            }, {
                                pic: ("5_2.png")
                            }, {
                                pic: ("5_3.png")
                            }, {
                                pic: ("5_4.png")
                            }],
                        },
                        {
                            id: 6,
                            name: '蝴蝶忍',
                            desc: '鬼灭之刃',
                            price: 160,
                            unit: '个',
                            time: '2023/06/05 21:00:00',
                            //     pic: ("6.png")
                            pic_list: [{
                                pic: ("6.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 7,
                            name: '霞柱',
                            desc: '鬼灭之刃',
                            price: 170,
                            unit: '个',
                            time: '2023/06/06 21:00:00',
                            // pic: ("7.png")
                            pic_list: [{
                                pic: ("7.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 8,
                            name: '弥豆子',
                            desc: '鬼灭之刃',
                            price: 210,
                            unit: '个',
                            time: '2023/06/07 21:00:00',
                            // pic: ("8.png")
                            pic_list: [{
                                pic: ("8.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 9,
                            name: '自在悟空',
                            desc: '龙珠',
                            price: 210,
                            unit: '个',
                            time: '2023/06/08 21:00:00',
                            // pic: ("9.png")
                            pic_list: [{
                                pic: ("9.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 10,
                            name: '暗黑悟空',
                            desc: '龙珠',
                            price: 210,
                            unit: '个',
                            time: '2023/06/09 21:00:00',
                            // pic: ("10.png")
                            pic_list: [{
                                pic: ("10.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 11,
                            name: '布罗利',
                            desc: '龙珠',
                            price: 210,
                            unit: '个',
                            time: '2023/06/10 21:00:00',
                            // pic: ("11.jpg")
                            pic_list: [{
                                pic: ("11.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 12,
                            name: '索隆',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("海贼王 (2).png")
                            pic_list: [{
                                pic: ("海贼王_1.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 13,
                            name: '四档路飞',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("海贼王 (3).png")
                            pic_list: [{
                                pic: ("海贼王_2.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 14,
                            name: '罗',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("海贼王(7).png")
                            pic_list: [{
                                pic: ("海贼王_3.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 15,
                            name: '修罗索隆',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("海贼王 (8).png")
                            pic_list: [{
                                pic: ("海贼王_4.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 16,
                            name: '三千世界索隆',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("海贼王 (9).png")
                            pic_list: [{
                                pic: ("海贼王_5.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 17,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("摆件1.jpg")
                            pic_list: [{
                                pic: ("摆件1.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 16,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("摆件2.jpg")
                            pic_list: [{
                                pic: ("摆件2.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 18,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/05/28 21:00:00',
                            // pic: ("摆件3.jpg")
                            pic_list: [{
                                pic: ("摆件3.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 19,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("摆件4.jpg")
                            pic_list: [{
                                pic: ("摆件4.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 19,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("摆件5.jpg")
                            pic_list: [{
                                pic: ("摆件5.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 19,
                            name: '小丑布鲁斯',
                            desc: '摆件',
                            price: 210,
                            unit: '个',
                            time: '2023/06/01 21:00:00',
                            // pic: ("摆件6.jpg")
                            pic_list: [{
                                pic: ("摆件6.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 20,
                            name: '超蓝悟空',
                            desc: '龙珠',
                            price: 210,
                            unit: '个',
                            // pic: ("12.jpg")
                            time: '2023/06/01 21:00:00',
                            pic_list: [{
                                pic: ("12.jpg")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                        {
                            id: 21,
                            name: '大和',
                            desc: '海贼王',
                            price: 210,
                            unit: '个',
                            local: '浙江',
                            time: '2023/06/1 21:00:00',
                            pic_list: [{
                                pic: ("海贼王_6.png")
                            }, {
                                pic: ("1_2.png")
                            }, {
                                pic: ("1_3.png")
                            }, {
                                pic: ("1_4.png")
                            }],
                        },
                    ]
                )
            })

            // devServer.app.get("/api/AddressList",(req,res)=>{
                
            // })
            devServer.app.get("/api/mockData", (req, res) => {
                res.json(mockData());
            })
            return middlewares
        }
    }
})
