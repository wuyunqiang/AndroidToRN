/*
* 图片资源
* */

const List = {
    get nodata() {return require('../assets/list/nodata.png')},
    get nonetwork() {return require('../assets/list/nonetwork.png')},
};

const AppImages = {
    get List(){
        return List;
    },
};
export default AppImages;
global.AppImages = AppImages;