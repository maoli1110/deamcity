<?php
include_once("init.php");
get_openid_appid();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, shrink-to-fit=no,viewport-fit=cover">
    <link href="./style/iSlider.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./js/swiper/css/swiper.min.css">
    <link rel="stylesheet" type="text/css" href="./style/index.css">
    <link rel="stylesheet" type="text/css" href="./style/animate.css">

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?6df9a112e9557b11e9f62f09f9dbf0f2";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>


</head>
<body>
<!-- Slider main container -->
<div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide page1">
            <div class="door animate-flicker"></div>
        </div>
        <div class="swiper-slide page2">
            <div class="box">
                <img src="./image/box.gif">
            </div>
            <div class="plant">
                <img src="./image/plant.gif">
            </div>
            <div class="text-1">
                <img class="" data-animate="fadeInUp" animate src="./image/2-text1.png">
            </div>
            <div class="text-2">
                <img class="" data-animate="fadeInUp" animate src="./image/2-text2.png">
            </div>
            <div class="text-3">
                <img class="" data-animate="fadeInUp" animate src="./image/2-text3.png">
            </div>
        </div>
        <div class="swiper-slide page3">
            <div class="finger animate-bounce-down"></div>
            <div class="text-1">
                <img class="" data-animate="fadeInUp" animate src="./image/3-text1.png" alt="" />
                <div class="line-1">
                    <img src="./image/3-line1.png" alt="" />
                </div>
            </div>
        </div>
        <div class="swiper-slide page4">
            <div class="moon">
                <img src="./image/moon.gif" alt="" />
            </div>
            <div class="rocket">
                <img src="image/rocket.gif" alt="" />
            </div>
            <a class="house4"></a>
            <div class="win absol hide"></div>
        </div>
        <div class="swiper-slide page5">
            <div class="head">
                <img src="image/head.gif">
            </div>
            <div class="absol righthand" animate data-animate="right">
                <img src="image/righthand.png">
            </div>
            <div class="absol lefthand" animate data-animate="left">
                <img src="image/lefthand.png">
            </div>
            <a class="house5"></a>
            <div class="win absol hide"></div>
        </div>
        <div class="swiper-slide page6">
            <div class="woman"><img src="image/woman.gif"></div>
        </div>
        <div class="swiper-slide page7">
            <div class="person">
                <img src="image/person.gif">
            </div>
            <div class="absol cloud" animate data-animate="cloudleft">
                <img src="image/cloud.png">
            </div>
            <div class="absol sun" animate data-animate="sunright">
                <img src="image/sun.png">
            </div>
        </div>
        <div class="swiper-slide page8">
            <div class="doorplate">
                <img id="hand" src="image/doorplate.png" alt="" />
            </div>
            <div class="trojan">
                <img src="image/trojan.gif">
            </div>
            <div>
                <div id="videobox" style="width: 100%; height: 300px;">
                    <video id="videoinfo" src="./image/11.mp4" preload="auto" poster="./image/video.jpg" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint"></video>
                </div>
            </div>
            <a><img id="videoPlay" src="image/vbutton.jpg"></a>
        </div>
        <div class="swiper-slide page9">
            <div class="cloud-move">
                <img class="" animate data-animate="animate-bounce-left" src="image/page9-cloud.png" alt="" />
            </div>
            <div class="" animate data-animate="zoom-finger">
                <img class="animated infinite pulse" src="image/page9-finger.png" alt="" />
            </div>
			<span class="selectType">
				<a title="" href="#" class="ipt" id="selectTypeText">请选择</a>
				<span id="selectTypeMenu">
					<a rel="beijin" class="select-click" title="" href="#">北京</a>
					<a rel="hangzhou" class="select-click" title="" href="#">杭州</a>
					<a rel="shenzhen" class="select-click" title="" href="#">深圳</a>
					<a rel="guangzhou" class="select-click" title="" href="#">广州</a>
					<a rel="chengdu" class="select-click" title="" href="#">成都</a>
				</span>
				<input type="hidden" name="" class="ipt" value="" id="selectTypeRel">
				<em class="searchArrow hh abs">下拉选择</em>
			</span>
            <a class="next"><img src="image/dream.png"></a>
        </div>
        <div class="swiper-slide page10">
            <div class="skillbar-wrapper">
                <div class="skillbar clearfix " data-percent="20%">
                    <div class="skillbar-bg"></div>
                    <div class="skillbar-title"><span></span></div>
                    <div class="skillbar-bar" style="background: #4c9d2a;"></div>
                    <div class="skill-bar-percent">20%</div>
                </div>
                <div class="skillbar clearfix " data-percent="40%">
                    <div class="skillbar-bg"></div>
                    <div class="skillbar-title"><span></span></div>
                    <div class="skillbar-bar" style="background: #4c9d2a;"></div>
                    <div class="skill-bar-percent">20%</div>
                </div>
                <div class="skillbar clearfix " data-percent="60%">
                    <div class="skillbar-bg"></div>
                    <div class="skillbar-title"><span></span></div>
                    <div class="skillbar-bar" style="background: #4c9d2a;"></div>
                    <div class="skill-bar-percent">20%</div>
                </div>
                <div class="skillbar clearfix " data-percent="70%">
                    <div class="skillbar-bg"></div>
                    <div class="skillbar-title"><span></span></div>
                    <div class="skillbar-bar" style="background: #4c9d2a;"></div>
                    <div class="skill-bar-percent">20%</div>
                </div>
                <div class="skillbar clearfix " data-percent="100%">
                    <div class="skillbar-bg"></div>
                    <div class="skillbar-title"><span></span></div>
                    <div class="skillbar-bar" style="background: #4c9d2a;"></div>
                    <div class="skill-bar-percent">20%</div>
                </div>
            </div>
            <div class="mask absol">
                <img src="image/shareguide.gif" animate data-animate="guide">
                <img class="" src="image/shareword.png" animate data-animate="word">
            </div>
            <div class="bottom-button">
                <div>
                    <a class="back"><img src="image/back.gif"></a>
                    <a class="share"><img src="image/share.gif"></a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript" src="./js/swiper/js/swiper.min.js"></script>
<script type="text/javascript" src="js/jquery.mobile-events.js"></script>
<script type="text/javascript" src="./js/index.js"></script>
<script>
</script>
</body>
</html>