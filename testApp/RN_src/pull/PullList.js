/**
 * Created by guzhenfu on 17/5/9.
 */

import React, { Component } from 'react';
import {
    InteractionManager,
    FlatList,
    Text,
    ActivityIndicator,
    View,
    Dimensions,
    TouchableHighlight,
    StyleSheet,
    Image,
    TouchableOpacity,
    NetInfo
} from 'react-native';
import Pullable from './Pullable';
import LoadingSpinner from './LoadingSpinner';
const LoadingState      = 1;    //初始loading页面
const EmptyState        = 2;    //空页面
const ErrorState        = 3;    //加载数据错误
const ListState         = 4;    //正常加载
const MoreState         = 5;    //正在加载更多
const NoMoreState       = 6;    //没有更多了
const NoMoreErrorState  = 7;    //加载更多出错

export default class PullList extends Pullable {

    constructor(props) {
        super(props);
        this.currentState = LoadingState;
        this.page = 1;
        this.type='List';
    }

    componentDidMount() {
        this.mounted = true;
        this.setPage(1);
        InteractionManager.runAfterInteractions(()=>{
            this.props.onPullRelease(this.resolveHandler);
        })
    }

    componentWillMount() {
        this.mounted = false;
    }

    setPage = (page) => {
        this.page = page;
    };

    getPage = () => {
        return this.page;
    };

    renderSeparatorView = ()=>{
        return (<View style={{width:WIDTH,height:SCALE(20),backgroundColor:Color.f5f5f5}}/>)
    };

    /**
     * 刷新
     */
    refresh = () => {
        console.log('zhixngzheli');
        if (this.mounted) {
            this.setPage(1);
            this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
        }
    };

    getMetrics = (args)=> {
        this.scroll&&this.scroll.getMetrics(args);
    };

    scrollToOffset = (...args)=> {
        this.scroll&&this.scroll.scrollToOffset(...args);
    };

    scrollToEnd = (args)=> {
        this.scroll&&this.scroll.scrollToEnd(args);
    };

    /**
     * 对外提供API,设置列表数据
     */
    setData = (_data)=>{
        this.setPage(1);
        console.log('setData');
        if (_data.length == 0){
            this.currentState = EmptyState;
        }else{
            this.currentState = ListState;
        }
        this.setState({
            data: _data,
        })
    };

    /**
     * 对外提供API, loadMore 调用
     */
    addData = (_data)=>{
        if (_data.length == 0){
            this.currentState = NoMoreState;

        }else{
            this.currentState = MoreState;
        }
        this.setState({
            data: this.state.data.concat(_data),
        })
    };



    /**
     * 对外提供API, 出错重新加载数据
     */
    reloadData = ()=>{
        this.currentState = LoadingState;
        this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
        // this.forceUpdate();
    };

    /**
     * 对外提供API, 加载更多
     */
    resumeMoreDataFromError = ()=>{
        this.currentState = MoreState;
        this.page++;
        console.log('this.page',this.page)
        this.props.onEndReached&&this.props.onEndReached(this.getPage());
    };

    /**
     * 加载loading页面
     * @returns {XML}
     * @private
     */
    _renderLoading = ()=> {
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
        console.log('没有数据');
        return (
            <View style={[styles.contain,{justifyContent:'center'}]}>
                <TouchableOpacity onPress={this.reloadData}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image style={{width:SCALE(323),height:SCALE(267)}} source={AppImages.List.nodata}/>
                    <Text style={{fontSize:FONT(15),color:Color.C666666}}>暂无数据</Text>
                    </View>
                </TouchableOpacity>

        </View>)
    };

    /**
     * 加载 出错页
     */
    _renderError = ()=>{
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

    //加载更过
    loadMore = ()=>{
        if(this.currentState==NoMoreState){
            return;
        }
        this.page++;
        this.props.onEndReached&&this.props.onEndReached(this.getPage())
    };

    /**
     * 加载列表数据
     * @returns {XML}
     * @private
     */
    _renderList = ()=>{
        return (
            <FlatList
                style={{flex:1}}
                ref={(c) => {this.scroll = c;}}
                      onScroll={this.onScroll}
                      scrollEnabled={this.state.scrollEnabled}
                      refreshing={false}
                      keyExtractor={(item, index) => {return index}}
                      onEndReachedThreshold={1}
                      data={this.state.data}
                      ListFooterComponent={this._renderFoot}
                      windowSize={10}
                      updateCellsBatchingPeriod={1}
                      maxToRenderPerBatch={10}
                      disableVirtualization={false}

                      {...this.props}
                ItemSeparatorComponent={this.renderSeparatorView}
                onEndReached = {this.loadMore}/>
        );
    };

    renderNoMore = ()=>{
        return (<View style={{height:SCALE(120),justifyContent:'center', alignItems:'center'}}>
        </View>)
    };

    renderMoreError = ()=>{
        return (
            <TouchableHighlight
                style={styles.footer}
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> {this.resumeMoreDataFromError()}}>
                <Text>网络错误, 点击重新加载</Text>
            </TouchableHighlight>
        );
    };

    renderMore = ()=>{
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
     * 加载更多 UI渲染
     * @returns {XML}
     * @private
     */
    _renderFoot = ()=>{
        if (this.currentState === NoMoreState){
            return this.props.renderNoMore || this.renderNoMore();
        }else if(this.currentState === NoMoreErrorState){
            return this.props.renderMoreError || this.renderMoreError();
        }else if(this.currentState >= ListState){
            return this.props.renderMore || this.renderMore();
        }else{
            return null;
        }
    };

    /**
     * 类似 render() 方法,具体在父类里面
     * @returns {*}
     */
    getScrollable = ()=> {
        if (this.currentState === LoadingState){
            return this.props.renderLoading || this._renderLoading();
        }else if(this.currentState === EmptyState){
            if(this.props.renderEmpty){
               return this.props.renderEmpty(this.reloadData)
            }else{
                return this._renderEmpty();
            }
            // return this.props.renderEmpty || this._renderEmpty;
        }else{
            this.type='List';
            return this._renderList()
        }
    }
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
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