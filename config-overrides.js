// babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

// const {override, fixBabelImports} = require('customize-cra')
//
// module.exports = override(
//     fixBabelImports('import', {
//         libraryName: 'antd',
//         libraryDirectory: 'es',
//         style: 'css',
//     }),
//
// )

// 如何同时引入antd和antd-mobile？
const {override, fixBabelImports} = require('customize-cra')
module.exports = override(
    fixBabelImports('import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        },

    ),
)


//那么对多个框架做按需加载应该怎么做呢？
// 对多个框架做按需加载的方法
// 这里拿antd和antd-mobile两个框架来举例子
// 首先还是要按照上面的步骤安装babel-plugin-import和react-app-rewired，并修改默认配置，区别只是在最后一步上。在调用babel-plugin-import的injectBabelPlugin方法时，需要调用两次，并注明相对应的框架名
// const {override, fixBabelImports} = require('customize-cra')
// //const {injectBabelPlugin} = require('react-app-rewired')
// module.exports = override(
//     fixBabelImports(
//         ['import',
//             {
//                 libraryName: 'antd',
//                 libraryDirectory: 'es',
//                 style: "css"  // `style: true` 会加载 less 文件
//             }, 'ant'
//         ],
//     ),
//
//     fixBabelImports(
//         ['import',
//             {
//                 libraryName: "antd-mobile",
//                 libraryDirectory: 'lib',
//                 style: "css"
//             }, 'ant-mobile'
//         ],
//     )
// )

