<?php
include_once('./init.php' );
$act = get_args('act');

$pageNum = 10;

switch($act) {
    case 'jsticket':

        $url = get_argg('strURL');

        if(!$url) return false;

        $wx = array();
        //生成签名的时间戳
        $wx['timestamp'] = time();
        //生成签名的随机串
        $wx['nonceStr'] = 'gamesoul';
        //jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。
        $wx['jsapi_ticket'] = wx_get_jsapi_ticket();
        //分享的地址，注意：这里是指当前网页的URL，不包含#及其后面部分，曾经的我就在这里被坑了，所以小伙伴们要小心了
        $wx['url'] = $url;
        $string = sprintf("jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s", $wx['jsapi_ticket'], $wx['nonceStr'], $wx['timestamp'], $wx['url']);
        //生成签名
        $wx['signature'] = sha1($string);
        $wx['appid'] = 'wx721b58c6eff56eb2';

        ajax_result(0, 'success', $wx);
        break;

    case 'save_info':
    {

    }
    break;

    //投票
    case 'vote':
    {
        global $_A;
        $openid = $_A['session']->get('openid', '');

        $cityname = get_args('cityname');


        if (!empty($openid))
        {
            //更改之前
            $beforesql = "UPDATE city_info SET total_ticket = total_ticket - 1 WHERE city_name = (SELECT city FROM userinfo WHERE openid='".$openid."')";
            //更改之后
            $aftersql = "UPDATE city_info SET total_ticket = total_ticket + 1 WHERE city_name ='".$cityname."'";


            $usersql = "select city from userinfo WHERE openid='".$openid."'";
            $resultArr = $_A['db']->getRs($usersql);

            //如果有数据
            if (count($resultArr) > 0)
            {
                $_A['db']->query($beforesql);

                updatetable('userinfo' , ['city'=>$cityname , 'create_at'=>timestamp , 'ip'=>ip()] , ['openid'=>$openid]);

                $_A['db']->query($aftersql);
            }
            else
            {
                //$_A['db']->query($beforesql);

                inserttable('userinfo' , ['openid'=>$openid , 'city'=>$cityname , 'create_at'=>timestamp , 'ip'=>ip()]);

                $_A['db']->query($aftersql);
            }

            $result = $_A['db']->getRs("select * from city_info ORDER BY total_ticket DESC" , 1);

            ajax_result(0, '投票成功' , ['info'=>$result]);

        }
        else
        {
            ajax_result(1, '投票失败');
        }
    }
    break;


}


?>