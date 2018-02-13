# AndroidToRN
1:原生android中嵌入React Native<br>
2:封装原生view,viewgroup,原生module<br>
3:使用codepush热更新<br>
4:下拉刷新+无限列表+大量图片<br>
5:statusbar颜色+图片

# 环境：
Android studio3.0<br>
react native 0.52<br>
Mac 10.12.6 <br>
# 如有问题或者需要我添加什么请提issue，我会去实现的 
# plan 
  1:dialog全屏显示 <br>

 
CSDN：[http://blog.csdn.net/u014041033?viewmode=contents](http://blog.csdn.net/u014041033?viewmode=contents)<br>
简书：[简书](http://www.jianshu.com/u/1386d6b454e5) <br>

项目下载后<br>
1: cd testApp<br>
2: yarn install<br>
3: npm start<br>
4: android studio打开项目testApp 报错<br>
![buildbug.png](http://upload-images.jianshu.io/upload_images/3353755-9b998a898ab7e1c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)<br>
5：按照[codepush3之Android原生引用集成codepush](http://blog.csdn.net/u014041033/article/details/79004351)所示修改路径<br>
或者如下修改<br>
change react.gradle的14行reactRoot路径<br>
![reactbuild.png](http://upload-images.jianshu.io/upload_images/3353755-3ff148637def7335.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)<br>
6：andorid studio 运行项目即可<br>

# ChangeLog:<br>
1.0.5<br>
原生下拉刷新+大列表(Flatlist||SGListView)+大量图片 不会卡顿<br>
![largerlist.gif](http://upload-images.jianshu.io/upload_images/3353755-e8a7c8549d7b068b.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.0.4<br>
1:新增pullLayout->此组件是原生下拉刷新组件的封装（因为android下拉刷新组件一直存在性能问题所以自己封装了一个）<br>
组件基于[SmartRefreshLayout](https://github.com/wuyunqiang/react-native-pullview)仅限Android使用<br>
效果如下：<br>
![nativepull.gif](http://upload-images.jianshu.io/upload_images/3353755-0fc729d83bd19655.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.0.3<br>
1：添加下拉刷新[react-native-pullview](https://github.com/wuyunqiang/react-native-pullview)<br>
2：添加自定义Tab<br>
效果：<br>
![pullview.gif](http://upload-images.jianshu.io/upload_images/3353755-2d90319bf4a5e3a8.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![custometab.gif](http://upload-images.jianshu.io/upload_images/3353755-b52dce1ac265ae4b.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1.0.2<br>
纯原生->一半rn一半原生->纯rn<br>
效果：<br>
![nativetiRN.gif](http://upload-images.jianshu.io/upload_images/3353755-2db0558b7af4f3d1.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1.0.1<br>
1:添加react navigation可以跳转页面<br>
2:添加code push(bug fixed) 有关codepush问题https://github.com/wuyunqiang/ReactNativeUtil/issues/26<br>
3:优化添加预加载reactnative页面 (参考：https://github.com/songxiaoliang/ReactNativeApp)<br>


运行效果：<br>
![androidtoRN.gif](http://upload-images.jianshu.io/upload_images/3353755-e91c00dcdaec7956.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<br>
代码仅供参考：
如要运行，需要下载node_modules。
另外本人在学习的过程中遇到很多坑，深知找解决问题的路途艰难险阻
所以我正在做一个收集react native的bug解决+工具的库，
希望可以帮助大家在学习中更有效率的写代码。<br>
详情[ReactNativeUtil](https://github.com/wuyunqiang/ReactNativeUtil)<br>
通过label搜索关键字,也欢迎大家丰富内容。

