<?php
session_start();
define('D_BUG',false);
define('PC_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR);
define('in_hogaweb',1);
$mtime = explode(' ', microtime());//时间
define('timestamp', $mtime[1]);
defined('NOWTIME') or define('NOWTIME', date('Y-m-d H:i:s', time()));
define('CHECKMEMBER', true);
require_once(PC_PATH.'./cls/common.php');

$magic_quote = get_magic_quotes_gpc();//GPC过滤
if (empty($magic_quote))
{
    $_GET = saddslashes($_GET);
    $_POST = saddslashes($_POST);
}

global $_A;
$_A = [];
require_once(PC_PATH.'./cls/mysql.cls.php');
require_once(PC_PATH.'./cls/hogaSession.php');
require_once(PC_PATH.'./cls/wechat_fun.php');

$_A['session'] = new hogaSession();
$_A['jsticket'] = [
    'timestamp'=> '',
    'nonceStr' => '',
    'signature' => ''
];


switch($_SERVER['HTTP_HOST'])
{
    case 'city.com'://本地
        $sqlpwd = '111111';
        break;
    default://正式
        $sqlpwd = 'gamesoul@2014';
        break;
}

$dbconfig = [
    'hostname' => 'localhost',
    'username' => 'root',
    'password' => $sqlpwd,
    'database' => 'dream_city',
    'dbport' => '3306',
    'autoconnect' => '0',
    'debug' => D_BUG,
    'charset' => 'utf8mb4'
];
$_A['db'] = new dbmysql();
$_A['db']->connect($dbconfig['hostname'],$dbconfig['username'],$dbconfig['password'],$dbconfig['database']);

function get_curl_contents($url, $method ='GET', $data = array()) {
    if ($method == 'POST') {
        //使用crul模拟
        $ch = curl_init();
        //禁用https
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        //允许请求以文件流的形式返回
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_DNS_CACHE_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch); //执行发送
        curl_close($ch);
    }else {
        if (ini_get('allow_fopen_url') == '1') {
            $result = file_get_contents($url);
        }else {
            //使用crul模拟
            $ch = curl_init();
            //允许请求以文件流的形式返回
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            //禁用https
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_URL, $url);
            $result = curl_exec($ch); //执行发送
            curl_close($ch);
        }
    }
    return $result;
}

//获取微信公从号access_token
function wx_get_token() {

    //获取文件缓存信息
    $timestamp = time();
    $filename = "token.txt";
    $handle = fopen($filename, "r");
    file_put_contents('log.txt' , "11111111111111");
    if ($handle != null)
    {
        $contents = fread($handle, filesize ($filename));
        fclose($handle);

        $token_data = json_decode($contents);

        if ($timestamp - $token_data->timestamp < 7000)
        {
            return $token_data->access_token;
        }
    }

    file_put_contents('log.txt' , "2222222222222222");

    $AppID = 'wx721b58c6eff56eb2';//AppID(应用ID)
    $AppSecret = 'c658e9928755ed2d66bfdf46929b6db5';//AppSecret(应用密钥)
    $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$AppID.'&secret='.$AppSecret;
    $res = get_curl_contents($url);
    file_put_contents('log.txt' , $res);
    $res = json_decode($res, true);
    //这里应该把access_token缓存起来，至于要怎么缓存就看各位了，有效期是7200s

    $data_tmp['access_token'] = $res['access_token'];
    $data_tmp['timestamp'] = $timestamp;
    $data = json_encode($data_tmp);
    file_put_contents("token.txt", $data);
    return $res['access_token'];

}

function get_openid_appid()
{
    global $_A;
    $code = get_args('code');

    $test = get_argg('test');
    if ($test == '1')
    {
        $_A['session']->set('openid', "laijingyao");
        return;
    }
    else
    {
        $openid = $_A['session']->get('openid', '');

        if (empty($openid))
        {
            if (!$code)
            {
                header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx721b58c6eff56eb2&redirect_uri=".urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])."&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect" , true);
            }
            else
            {
                $AppID = 'wx721b58c6eff56eb2';//AppID(应用ID)
                $AppSecret = 'c658e9928755ed2d66bfdf46929b6db5';//AppSecret(应用密钥)
                $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$AppID.'&secret='.$AppSecret.'&code='.$code.'&grant_type=authorization_code';
                $res = get_curl_contents($url);
                $res = json_decode($res, true);

                $access_token = $res['access_token'];
                $openid = $res['openid'];
                file_put_contents("openid.txt", $openid);

                $_A['session']->set('openid', $openid);
            }
        }
        else
        {
            file_put_contents("openid11.txt", $openid);
        }
        return;
    }
}



function get_openid()
{

}

//获取微信公从号ticket
function wx_get_jsapi_ticket() {

    $url = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi", wx_get_token());
    $res = get_curl_contents($url);
    $res = json_decode($res, true);
    //这里应该把access_token缓存起来，至于要怎么缓存就看各位了，有效期是7200s

    if (isset($res['ticket']))
    {
        return $res['ticket'];
    }
    else
    {
        return '';
    }

}

?>