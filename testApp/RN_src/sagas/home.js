/**
 * Created by wuyunqiang on 2017/10/10.
 */
import { put, take, call, fork } from 'redux-saga/effects';
import * as home from '../actions/home';

export function* RequestData(url, params) {
    console.log('sagas url',params);
    let query = url + params.offset +
        "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
        "&client_version_id=" + "16.2" +
        "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
        "&lat=" + params.lat +
        "&limit=" + params.limit +
        "&lng=" + params.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";

    try {
        console.log('网络请求前');
        //调用函数返回promise会阻塞
        const data = yield call(HttpUtil.GET, query);
        console.log('网路请求后 获得数据');
        //触发一个action
        yield put(home.ReceiveData(data));
    } catch (error) {
        console.log('网络请求 出现错误');
        yield put(home.ReceiveData({}));
    }
}

export function* watchHomeRequestData() {
    while (true) {
        const action = yield take([ActionTypes.REQUEST]);
        yield fork(
            ...action
        );

    }
}