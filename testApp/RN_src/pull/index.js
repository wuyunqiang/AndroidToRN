import React,{Component}from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Linking,
    View,
    Dimensions,
    Animated,
    Easing,
    ScrollView,
    PanResponder,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Platform,
    NativeModules,
    ImageBackground,
    InteractionManager,
    TouchableHighlight,
    FlatList,
    DeviceEventEmitter
} from 'react-native';
import PullLayout from './PullLayout'
import PullListView from './PullList'
import PullView from './PullView'

import LoadingSpinner from './LoadingSpinner';
const LoadingState      = 1;    //初始loading页面
const EmptyState        = 2;    //空页面
const ErrorState        = 3;    //加载数据错误
const ListState         = 4;    //正常加载
const MoreState         = 5;    //正在加载更多
const NoMoreState       = 6;    //没有更多了
const NoMoreErrorState  = 7;    //加载更多出错


/**
 * 使用方式
 * PullList =>flatlist
 * **/
{/*<PullList*/}
    {/*Android_Native={false}*/}
    {/*Key={'list'} //每一个实例不能重复  */}
    {/*ref={(list) => this.pullList = list}*/}
    {/*topIndicatorRender={this.renderTopIndicator}*/}
    {/*topIndicatorHeight={header}*/}
    {/*onEndReachedThreshold={20}*/}
    {/*onPullRelease={this.onPullRelease}*/}
    {/*onEndReached={this.loadMore}*/}
    {/*renderItem={this.renderRowView}*/}
    {/*getItemLayout={(data, index) => ({length: SCALE(390), offset: SCALE(390) * index, index})}*/}
    {/*numColumns={1}*/}
    {/*ItemSeparatorComponent={() => {*/}
        {/*return null;*/}
    {/*}}*/}
    {/*initialNumToRender={5}*/}
    {/*renderLoading = {()=>{return null;}}*/}
{/*/>*/}

/**
 * PullScroll =>scrollview
 * **/
{/*<PullScroll*/}
    {/*Key={'PullScroll'}*/}
    {/*Android_Native={true}*/}
    {/*onPullRelease={this.onPullRelease}*/}
    {/*style={styles.container}>*/}
    {/*<HomeBanner*/}
        {/*userinfo={this.state.userinfo}*/}
        {/*unReadAmount={this.state.unReadAmount}*/}
        {/*navigation={this.props.navigation}*/}
        {/*navigate={(...params) => super.navigate(...params)}/>*/}
    {/*<NewsList navigate={(...params) => super.navigate(...params)}/>*/}
    {/*<List navigate={(...params) => super.navigate(...params)}/>*/}
{/*</PullScroll>*/}

/**
 * PullScroll => scrollview
 * PullList =>flatlist
 * Key 每一个实例唯一不能重复
 * Android_Native 是否使用android原生下拉刷新组件 true开启
 * ****/
class Pull extends Component {

    constructor(){
        super();
        this.state = {
            data:[],

        };
        this.currentState=LoadingState;
        this.page = 0;
        this.type='List';
    }

    componentWillMount() {
    }
    componentDidMount() {
        if(Platform.OS=='android'&&this.props.Android_Native){
            this.subscription = DeviceEventEmitter.addListener(this.props.Key+"onRefreshReleased",this.refreshReleased);
            InteractionManager.runAfterInteractions(()=>{
                this.loadMore()
            })
        }
        // this.mounted = true;
        // this.setPage(1);

    }

    refreshReleased = ()=>{
        this.refresh();
    }

    componentWillUnmount() {
        if(Platform.OS=='android'&&this.props.Android_Native){
            this.pullLayout&&this.pullLayout.finishRefresh(this.props.Key);
            this.subscription&&this.subscription.remove();
        }

    }


    setPage = (page) => {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.setPage(page)
            return;
        }
        this.page = page;
    };

    getPage = () => {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.getPage();

        }
        return this.page;
    };

    renderSeparatorView = ()=>{

        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderSeparatorView();

        }
        if(this.props.ItemSeparatorComponent){
            return this.props.ItemSeparatorComponent();
        }
        return (<View style={{width:WIDTH,height:SCALE(20),backgroundColor:Color.f5f5f5}}/>)
    };

    /**
     * 刷新
     */
    refresh = () => {
        if(Platform.OS=='ios'||!this.props.Android_Native){
             this.PullListView&&this.PullListView.refresh();
             return;
        }
        Log('zhixngzheli');
        this.setPage(1);
        this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
    };

    resolveHandler = ()=>{
        this.pullLayout&&this.pullLayout.finishRefresh(this.props.Key);
    }

    getMetrics = (args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.getMetrics();
            return;
        }
        this.scroll&&this.scroll.getMetrics(args);
    };

    scrollToOffset = (...args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.scrollToOffset(...args);
            return;
        }
        this.scroll&&this.scroll.scrollToOffset(...args);
    };

    scrollToEnd = (args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.scrollToEnd(args);
            return;
        }
        this.scroll&&this.scroll.scrollToEnd(args);
    };

    /**
     * 对外提供API,设置列表数据
     */
    setData = (_data)=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.setData(_data)
            return;
        }
        this.setPage(1);
        Log('setData');
        if (_data.length == 0){
            this.currentState=EmptyState,
            this.setState({
                data: ['EmptyState'],//只有下拉刷新才会出现此状态
            });
        }else{
            this.currentState=ListState;
            this.setState({
                data: _data,
            });
        }
    };

    /**
     * 对外提供API, loadMore 调用
     */
    addData = (_data)=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.addData(_data)
            return;
        }

        let data = this.state.data;
        if(this.state.data[this.state.data.length-1]=='EmptyState'){
            data.pop();
        }
        if (_data.length == 0){
            this.currentState=NoMoreState;
            this.setState({
                data: data.concat(_data),
            })
        }else{
            this.currentState = MoreState;
            this.setState({

                data: data.concat(_data),
            });
        }

    };



    /**
     * 对外提供API, 出错重新加载数据
     */
    reloadData = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.reloadData()
            return;
        }
        this.currentState=LoadingState;
        this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
        // this.forceUpdate();
    };


    //加载更多
    loadMore = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.loadMore()
            return;
        }
        if(this.currentState==NoMoreState){
            return;
        }
        this.page++;
        this.props.onEndReached&&this.props.onEndReached(this.getPage());

    }

    /**
     * 对外提供API, 加载更多
     */
    resumeMoreDataFromError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.resumeMoreDataFromError()
            return;
        }
        this.currentState=MoreState;
        this.page++;
        Log('this.page',this.page)
        this.props.onEndReached&&this.props.onEndReached(this.getPage());
    };

    /**
     * 加载loading页面
     * @returns {XML}
     * @private
     */
    _renderLoading = ()=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderLoading()
        }
        return (<View style={styles.contain}>
            <LoadingSpinner type="normal"/></View>)
        // return (
        //     <View
        //         style={styles.contain}>
        //         <ActivityIndicator animating size="large"/>
        //     </View>
        // );
    };

    /**
     * 加载 空页面
     */
    _renderEmpty = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderEmpty()
        }
        Log('没有数据');
        return (
            <ScrollView style={{flex:1}}>
            <View style={[styles.contain,{justifyContent:'center'}]}>
                <TouchableOpacity onPress={this.reloadData}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image style={{width:SCALE(365),height:SCALE(238)}} source={AppImages.Common.nodata}/>
                        <Text style={{fontSize:FONT(15),color:Color.C666666}}>暂无数据</Text>
                    </View>
                </TouchableOpacity>

            </View>
            </ScrollView>)
    };

    /**
     * 加载 出错页
     */
    _renderError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderError()
        }
        return (
            <View style={[styles.contain,{justifyContent:'flex-start',marginTop:SCALE(242)}]}>
                <TouchableOpacity onPress={this.reloadData}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image style={{width:SCALE(323),height:SCALE(271)}} source={AppImages.List.nonetwork}/>
                        <Text style={{fontSize:FONT(15),color:Color.C666666}}>网络无法连接，点击屏幕重试</Text>
                    </View>
                </TouchableOpacity>

            </View>)
    };

    renderNoMore = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderNoMore()
        }
        return (<View style={{height:SCALE(120),justifyContent:'center', alignItems:'center'}}>
            <Text>没有更多数据</Text>
        </View>)
    };

    renderMoreError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderMoreError()
        }
        return (
            <TouchableHighlight
                style={styles.footer}
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> {this.resumeMoreDataFromError()}}>
                <Text>网络错误, 点击重新加载</Text>
            </TouchableHighlight>
        );
    };

    renderRowView = ({item, index, separators})=>{
        if (item === 'LoadingState'){
            return this._renderLoading();
        }else if(item === 'EmptyState'){
            if(this.props.renderEmpty){
                return this.props.renderEmpty(this.reloadData)
            }else{
                return this._renderEmpty();
            }
        }else{
            return this.props.renderItem&&this.props.renderItem({item, index, separators})
        }
    }

    renderMore = ()=>{

        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderMore()
        }
        return (<View
            style={{
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
            <ActivityIndicator animating size="large"/>
        </View>);
    };


    /**
     * 类似 render() 方法,具体在父类里面
     * @returns {*}
     */
    // getScrollable = ()=> {
    //     if (this.currentState === LoadingState){
    //         return this.props.renderLoading || this._renderLoading();
    //     }else if(this.currentState === EmptyState){
    //         if(this.props.renderEmpty){
    //             return this.props.renderEmpty(this.reloadData)
    //         }else{
    //             return this._renderEmpty();
    //         }
    //         // return this.props.renderEmpty || this._renderEmpty;
    //     }else{
    //         this.type='List';
    //         return this._renderList()
    //     }
    // }

    /**
     * 加载更多 UI渲染
     * @returns {XML}
     * @private
     */
    _renderFoot = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderFoot()
        }
        Log('执行了这里ListFooterComponent')
        if (this.currentState === NoMoreState){
            return this.props.renderNoMore?this.props.renderNoMore():this.renderNoMore();
        }else if(this.currentState === NoMoreErrorState){
            return this.props.renderMoreError?this.props.renderMoreError():this.renderMoreError();
        }else if(this.currentState >= ListState){
            return this.props.renderMore?this.props.renderMore():this.renderMore();
        }else{
            return null;
        }
    };

    render(){
        if (Platform.OS == 'android' && this.props.Android_Native) {
            return (<PullLayout
                Key={this.props.Key}
                ref={(pull) => {
                    this.pullLayout = pull
                }}
                style={{flex: 1, backgroundColor: 'white',}}>
                <FlatList
                    style={{flex: 1}}
                    ref={(c) => {
                        this.scroll = c;
                    }}
                    refreshing={false}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    onEndReachedThreshold={20}
                    data={this.state.data}
                    windowSize={10}
                    initialNumToRender={5}
                    updateCellsBatchingPeriod={10}
                    maxToRenderPerBatch={10}
                    {...this.props}
                    renderItem={this.renderRowView}
                    onEndReached={this.loadMore}
                    ListFooterComponent={this._renderFoot}
                />
            </PullLayout>)
        }
        return (<PullListView
                {...this.props}
                ref={(pull) => {
                    this.PullListView = pull
                }}
        />)
    }
}

class PullScroll extends Component{

    componentDidMount() {
        if(Platform.OS=='android'){
            this.subscription = DeviceEventEmitter.addListener(this.props.Key+"onRefreshReleased",this.refreshReleased);
        }
    }

    refreshReleased = ()=>{
        this.refresh();
    }

    /**
     * 刷新
     */
    refresh = () => {
        this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
    };

    resolveHandler = ()=>{
        this.pullLayout&&this.pullLayout.finishRefresh(this.props.Key);
    }

    componentWillUnmount() {
        if(Platform.OS=='android'){
            this.pullLayout&&this.pullLayout.finishRefresh(this.props.Key);
        }
        this.subscription&&this.subscription.remove();
    }

    render(){
        if (Platform.OS == 'android' && this.props.Android_Native) {
            return (<PullLayout
                Key={this.props.Key}
                ref={(pull) => {
                    this.pullLayout = pull
                }}
                style={{flex: 1, backgroundColor: 'white',}}>
                <ScrollView style = {{flex:1}}>
                    {this.props.children}
                </ScrollView>

            </PullLayout>)
        }
        return (<PullView
            {...this.props}>
            {this.props.children}
        </PullView>)
    }

}



const styles = StyleSheet.create({
    contain:{
        flex:1,
        width:WIDTH,
        height:HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.f3f3f3
    },
    footer:{
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    }
});

export {
    Pull as PullList,
    PullScroll
};



