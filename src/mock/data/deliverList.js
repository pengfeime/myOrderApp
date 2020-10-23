//生成模拟数据
let Mock = require("mockjs")

// Mock.Random是一个工具类，用于生成各种随机数据
//const Random = Mock.Random;

// Mock.setup(settings)用于指定被拦截的ajax请求的响应时间
//Mock.setup({timeout: 400 - 2400})
const mockData = Mock.mock({
    // restaurantInfo是通过ajax获取数据时候的地址，可以随意填写，但是要和ajax请求时路径一致
    'eatery|10': [{  // 生成10个如下格式的数据
        'id|+1': 0,  //id从1开始，后面依次加1
        'shop_info': [
            {
                "shop_name": "绝味烧烤", "shopinfo": 'assets/shop_thumbpic/barbecue.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ],
            },
            {
                "shop_name": "张飞牛肉", "shopinfo": 'assets/shop_thumbpic/beef.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "无二炸鸡", "shopinfo": 'assets/shop_thumbpic/chicken.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "中式餐厅", "shopinfo": 'assets/shop_thumbpic/chinese_food.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "扬州炒饭", "shopinfo": 'assets/shop_thumbpic/fried_rice.jpeg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "真香海底捞", "shopinfo": 'assets/shop_thumbpic/hot_pot.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "奇葩酸辣粉", "shopinfo": 'assets/shop_thumbpic/sour_noodles.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "日式料理", "shopinfo": 'assets/shop_thumbpic/Japanese_food.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "口口香龙虾", "shopinfo": 'assets/shop_thumbpic/lobster.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "麦当劳", "shopinfo": 'assets/shop_thumbpic/McDonald.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "避风港", "shopinfo": 'assets/shop_thumbpic/milk_tea.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            },
            {
                "shop_name": "一碗拉面", "shopinfo": 'assets/shop_thumbpic/noodles.jpg', 'rel_foods': [
                    {
                        'category': '热销',
                        'type':'A',
                        'the_rel': [
                            {
                                'name': '烤面筋',
                                '_id':1,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/gluten.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '热狗',
                                '_id':2,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/hot_dog.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '金针菇',
                                '_id':3,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/mushroom.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            },
                            {
                                'name': '烤土豆片',
                                '_id':4,
                                'url': 'assets/shop_thumbpic/barbecue_rel/hot_sale/potato.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':1
                            }
                        ]
                    },
                    {
                        'category': '饮料',
                        'type':'B',
                        'the_rel': [
                            {
                                'name': '椰汁',
                                '_id':5,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/coconut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            },
                            {
                                'name': '芬达',
                                '_id':6,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/fenta.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '王老吉',
                                '_id':7,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/WangLoKAT.png',
                                'sale_num': /\d{1,3}/,
                                'price':4
                            },
                            {
                                'name': '矿泉水',
                                '_id':8,
                                'url': 'assets/shop_thumbpic/barbecue_rel/beverages/water.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            }
                        ]
                    },
                    {
                        'category': '酒水',
                        'type':'C',
                        'the_rel': [
                            {
                                'name': '百威',
                                '_id':9,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/Budweiser.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '雪花啤酒',
                                '_id':10,
                                'url': 'assets/shop_thumbpic/barbecue_rel/drinks/beer.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':6
                            }

                        ]
                    },
                    {
                        'category': '本店特色',
                        'type':'D',
                        'the_rel': [
                            {
                                'name': '烤鱼',
                                '_id':11,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/roast_fish.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':120
                            },
                            {
                                'name': '烤羊腿',
                                '_id':12,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/lamb_leg.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':188
                            },
                            {
                                'name': '花甲',
                                '_id':13,
                                'url': 'assets/shop_thumbpic/barbecue_rel/special/clam.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':28
                            }
                        ]
                    },
                    {
                        'category': '荤菜',
                        'type':'E',
                        'the_rel': [
                            {
                                'name': '羊肉串',
                                '_id':14,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/mutton.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':5
                            },
                            {
                                'name': '脆骨',
                                '_id':15,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/gristle.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '鸡翅',
                                '_id':16,
                                'url': 'assets/shop_thumbpic/barbecue_rel/meat/chicken.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            }
                        ]
                    },
                    {
                        'category': '素菜',
                        'type':'F',
                        'the_rel': [
                            {
                                'name': '南瓜片',
                                '_id':17,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/pumpkin.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':2
                            },
                            {
                                'name': '炒花生',
                                '_id':18,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/peanut.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':8
                            },
                            {
                                'name': '烤面筋',
                                '_id':19,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/gluten.png',
                                'sale_num': /\d{1,3}/,
                                'price':2
                            },
                            {
                                'name': '炸豆腐',
                                '_id':20,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/doufu.jpg',
                                'sale_num': /\d{1,2}/,
                                'price':3
                            },
                            {
                                'name': '烤馒头',
                                '_id':21,
                                'url': 'assets/shop_thumbpic/barbecue_rel/vegitables/bun.jpg',
                                'sale_num': /\d{1,3}/,
                                'price':3
                            }
                        ]
                    }
                ]
            }

        ],  // 店家相关信息
        'telphone': /^1[0-9]{10}$/,  //生成电话号码
        // 'email':Random.email(),
        'email': '@email()',
        'score_star|1': [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],  //评分
        'delivery_time': /[5-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]/, //配送时间
        'distance': /\d{1,2}/,  //配送距离
        'least_cost': /1[0-9]|5[0-5]/, // 最低消费起送
        'delivery_cost|1': [2, 3, 4, 5, 6, 7, 8, 9, 10], // 配送费
        'sales_volume': /\d{1,3}/, //月销售份数
        'discount|1': [5, 5.5, 6, 7, 8, 9, 9.5],  // 折扣
        'url': '@url()',  // 网址
        'intro': '@cparagraph(3,5)',  // 简介

    }]
})
module.exports = mockData
