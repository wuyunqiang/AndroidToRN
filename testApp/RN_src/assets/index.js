/*
* 图片资源
* */

const List = {
    get nodata() {return require('../assets/list/nodata.png')},
    get nonetwork() {return require('../assets/list/nonetwork.png')},
};


const tab = {
    get xindaiicon_unactive() {return require('./tab/xindaiicon_unactive.png');},
    get xindaiicon_active() {return require('./tab/xindaiicon_active.png');},
    get home_active() {return require('./tab/home_active.png');},
    get home_unactive() {return require('./tab/home_unactive.png');},
    get project_active() {return require('./tab/project_active.png');},
    get project_unactive() {return require('./tab/project_unactive.png');},
    get profile_active() {return require('./tab/profile_active.png');},
    get profile_unactive() {return require('./tab/profile_unactive.png');},
};

const AppImages = {
    get List(){
        return List;
    },
    get tab(){
        return tab;
    },
};
export default AppImages;
global.AppImages = AppImages;