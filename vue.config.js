module.exports = {
    // 配置webpack。【按这逻辑，我是否可以推测这个还可以配置webpack之外的东西嘞？】
    configureWebpack:{
        resolve:{
            // 配置路径别名，这样后面使用到路径时不需要写一堆'../../'等这样的繁琐代码。一般'@'代表src目录。如果是dom中使用，需要在前面加上一个'~'
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'network':'@/network',
                'components':'@/components',
                'views':'@/views',
            },
            // 配置扩展别名，这样祈祷的效果就是导入模块后不再需要写明文件后缀名。默认配置好的已经有'.vue','.json','.js'。如果需要添加就在这里写。
            // extentions这个属性不能用，4.x版本报错！下面的注释不要放开了。
            // extentions:[]
        }
    }
}