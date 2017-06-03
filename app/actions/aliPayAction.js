/**
 * Created by 1 on 2017/4/13.
 */

import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'
import AliPay from 'react-native-smart-alipay'

export function alipay(opt) {
    return (dispatch) => {
        var xhr =  new XMLHttpRequest();
        let appScheme = 'reactnativecomponentdemo'
        //tets
        //let server_api_url = '获取支付宝参数信息的服务器接口url地址'
        //let params = '提交的参数, 例如订单号信息'
        //let appScheme = 'ios对应URL Types中的URL Schemes的值, 会影响支付成功后是否能正确的返回app'
        /*let server_api_url = 'http://f154876m19.imwork.net:16374/nAdvanceOrder/payAli'  //服务器地址需要根据情况自行配置, 这个测试地址无法在公网访问
        let params = 'oid=3428a92f55bff7920155c2e4cc790060' //参数需要根据情况自行配置
        let appScheme = 'reactnativecomponentdemo'

        xhr.open('POST', server_api_url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = () => {
            if (xhr.status !== 200) {
                /!*this._button_alipay.setState({
                    loading: false,
                })*!/
                console.log("请求失败")
                /!*Alert.alert(
                    '请求失败',
                    `HTTP状态码: ${xhr.status}`
                )*!/
                return
            }
            if (!xhr.responseText) {
                /!*this._button_alipay.setState({
                    loading: false,
                })*!/
                console.log("请求失败  无反悔内容")
                /!*Alert.alert(
                    '请求失败',
                    '没有返回信息'
                )*!/
                return
            }*/
            let responseJSON = JSON.parse(opt)
            let orderText = decodeURIComponent(responseJSON.singStr)
            console.log(`响应信息: ${responseJSON}`)
            /*
             * 服务端获取支付宝SDK快捷支付功能所需参数字串示例(对应下面的orderText)
             * partner="2088021133166364"&seller_id="ko@sh-defan.net"&out_trade_no="160707414842102"&subject="到途订单-160707414842102"&body="营养快线水果酸奶饮品（椰子味）,500ml,4;正宗凉茶,310ML,4;原味味奶茶,80g,6;"&total_fee="0.01"&notify_url="http://f154876m19.imwork.net:16374/pay/paymentCompletion"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="-644885m"&return_url="m.alipay.com"&sign="iW5aK2dEsIj8nGg%2BEOOlMcyL081oX%2F2zHNcoJRrlO3qWmoVkXJM%2B2cHH9rSDyGYAeKxRD%2BYwrZK3H3QYb%2Fxi6Jl%2BxJVcvguluXbKvmpKjuuBv2gcOyqtydUMHwpQAVN%2BTwbQ6Zt8LU9xLweua7n%2FLuTFdjyePwf5Zb72r21v5dw%3D"&sign_type="RSA"
             */
            console.log(`获取支付宝参数成功, decodeURIComponent -> orderText = ${orderText}`);
            console.log(`AliPay ->`)
            console.log(AliPay)
            AliPay.payOrder({
                orderText,
                appScheme,
            });
    }

}