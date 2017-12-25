var vote = '<div class="skillbar-wrapper"><div class="skillbar clearfix " data-percent="20%"><div class="skillbar-bg"></div>'+
    '<div class="skillbar-title"><span></span></div>'+
    '<div class="skillbar-bar" style="background: #4c9d2a;"></div>'+
    '<div class="skill-bar-percent">20%</div></div>'+
    '<div class="skillbar clearfix " data-percent="40%"><div class="skillbar-bg"></div>'+
    '<div class="skillbar-title"><span></span></div>'+
    '<div class="skillbar-bar" style="background: #4c9d2a;"></div>'+
    '<div class="skill-bar-percent">20%</div></div>'+
    '<div class="skillbar clearfix " data-percent="60%"><div class="skillbar-bg"></div>'+
    '<div class="skillbar-title"><span></span></div>'+
    '<div class="skillbar-bar" style="background: #4c9d2a;"></div>'+
    '<div class="skill-bar-percent">20%</div></div>'+
    '<div class="skillbar clearfix " data-percent="70%"><div class="skillbar-bg"></div>'+
    '<div class="skillbar-title"><span></span></div>'+
    '<div class="skillbar-bar" style="background: #4c9d2a;"></div>'+
    '<div class="skill-bar-percent">20%</div></div>'+
    '<div class="skillbar clearfix " data-percent="100%"><div class="skillbar-bg"></div>'+
    '<div class="skillbar-title"><span></span></div>'+
    '<div class="skillbar-bar" style="background: #4c9d2a;"></div>'+
    '<div class="skill-bar-percent">20%</div></div></div>';

var page1 = '<div class="content page1"><div class="door animate-flicker"></div><div>',
page2 = '<div class="content page2"><div class="box"><img src="./image/box.gif"></div><div class="plant"><img src="./image/plant.gif"></div><div class="text-1"><img class="animated fadeInUp" src="./image/2-text1.png"></div><div class="text-2"><img class="animated fadeInUp" src="./image/2-text2.png"></div><div class="text-3"><img class="animated fadeInUp" src="./image/2-text3.png"></div><div>';
page3 = '<div class="content page3"><div class="finger animate-bounce-down"></div><div class="text-1"><img class=" animated fadeInUp" src="./image/3-text1.png" alt="" /><div class="line-1"><img src="./image/3-line1.png" alt="" /></div></div>',
page4 = '<div class="content page4 rela"><div class="moon"></div><div class="rocket"></div><a class="house" onclick="openWin()"></a><div class="win absol" onclick="closeWin()"></div><div>',
page5 = '<div class="content page5 rela"><div class="head"><img src="image/head.gif"></div><div class="absol righthand"><img src="image/righthand.png"></div><div class="absol lefthand"><img src="image/lefthand.png"></div><div>',
page6 = '<div class="content page6"><div class="woman"><img src="image/woman.gif"></div><div>',
page7 = '<div class="content page7 rela"><div class="person"><img src="image/person.gif"></div><div class="absol cloud"><img src="image/cloud.png"></div><div class="absol sun"><img src="image/sun.png"></div><div>',
page8 = '<div class="content page8"><div> <div id="videobox" style="width: 100%; height: 300px;"><video id="videoinfo" src="./image/11.mp4" preload="auto" poster="./image/1.jpg" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint"></video></div></div><a><img src="image/vbutton.jpg"></a><div>',
page9 = '<div class="content page9">'+
'<span class="selectType"><a title="" href="#" class="ipt" id="selectTypeText">请选择</a><span id="selectTypeMenu"><a rel="1" class="select-click" title="" href="#">北京</a><a rel="2" class="select-click" title="" href="#">杭州</a><a rel="3" class="select-click" title="" href="#">深圳</a><a rel="4" class="select-click" title="" href="#">广州</a><a rel="2" class="select-click" title="" href="#">成都</a></span><input type="hidden" name="" class="ipt" value="" id="selectTypeRel"><em class="searchArrow hh abs">下拉选择</em></span>'
+'<a class="next"><img src="image/dream.png"></a><div>',
page10 = '<div class="content page10 rela">'+vote+'<div class="mask absol"><img src="image/shareguide.gif"><img class="word" src="image/shareword.png"></div><div class="bottom-button"><div><a class="back"><img src="image/back.gif"></a><a class="share"><img src="image/share.gif"></a></div></div><div>';
var list = [
    {'content': page1},
    {'content': page2},
    {'content': page3},
    {'content': page4},
    {'content': page5},
    {'content': page6},
    {'content': page7},
    {'content': page8},
    {'content': page9},
    {'content': page10}];
$(function () {
    var timer;
    var islider = new iSlider({
        data: list,
        dom: document.getElementById("iSlider-wrapper"),
        // duration: 1000,
        isVertical: true,
        oninitialized: function () {
            timer = setTimeout(function () {
                islider.lock();
            }, 100);
            timer = setTimeout(function () {
                islider.unlock();
                islider.slideNext();
            }, 3000);
        }
    });
    islider.on('slideChanged', function (num) {
        console.log(num);
        timer && clearTimeout(timer);
        if (num === 1){
            timer = setTimeout(function () {
                islider.slideNext();
            }, 3000);
        } else if (num === 4) {
            var righthand = document.querySelector('.righthand'),
            lefthand = document.querySelector('.lefthand');
            righthand.setAttribute('class', righthand.getAttribute('class') + ' right');
            lefthand.setAttribute('class', lefthand.getAttribute('class') + ' left');
        } else if (num === 6) {
            var cloud = document.querySelector('.cloud'),
            suncloud = document.querySelector('.sun');
            cloud.setAttribute('class', cloud.getAttribute('class') + ' cloudleft');
            suncloud.setAttribute('class', suncloud.getAttribute('class') + ' sunright');
        } else if (num === 7) {
            // document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
            document.getElementById('videobox').addEventListener('touchstart',function(){
                console.log('sdss')
                videoinfo.play(); 
                document.addEventListener("WeixinJSBridgeReady", function () {
                    videoinfo.play(); 
                }, false); 
            })
            var videobox=document.getElementById('videoinfo');

            window.onresize=function(){
                videobox.style.width=window.innerWidth+'px';
                videobox.style.height=window.innerHeight+'px';
            }
            
            videobox.addEventListener('timeupdate',function(){
                var currenttime=videobox.currentTime;            
                console.log('当前播放时间：'+videobox.currentTime);
            })        
            
            //视频播放状态
            videobox.addEventListener('canplaythrough',function(){
                console.log('canplaythrough');
                //alert('canplaythrough');
                var alltime=videobox.duration;
                console.log(alltime)
            })
            videobox.addEventListener('ended',function(){
                console.log('播放事件：ended');
            })
        }else if (num === 8) {
            var next = document.querySelector('.next');
            // console.log(next)
            next.addEventListener('touchstart', function (e) {
                e.preventDefault();
                islider.slideNext();
            })

            $("#selectTypeText").on('touchstart', function(e){
                e.preventDefault();
                $("#selectTypeMenu").slideDown(200);
                $(".searchArrow").addClass("searchArrowRote");
            })
            $("#selectTypeText").on('blur', function(e){
                e.preventDefault();
                $(this).next("span").slideUp(200);
                $(".searchArrow").removeClass("searchArrowRote");
            })
            $("#selectTypeMenu>a").on('touchstart',function (e) {
                e.preventDefault();
                $("#selectTypeText").text($(this).text());
                $("#selectTypeRel").attr("value", $(this).attr("rel"));
                $(this).parent().slideUp(200);
                $(".searchArrow").removeClass("searchArrowRote");
                return false;
            });
     
            
        } else if (num === 9) {
            var share = document.querySelector('.share');
            var mask = document.querySelector('.mask');
            share.addEventListener('touchstart', function () {
                mask.setAttribute('class', mask.getAttribute('class') + ' open');
            });
            mask.addEventListener('touchstart', function () {
                mask.setAttribute('class', mask.getAttribute('class').replace(' open', ''));
            });
            var back = document.querySelector('.back');
            back.addEventListener('touchstart', function () {
                islider.slideTo(0);
            });
            function setSkillbar(data) {
                $('.skillbar').each(function(i){
                    $(this).attr('data-percent', data[i].percent);
                    $('.skillbar-title span').eq(i).html(data[i].area + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].amount + '票');
                    $(this).find('.skillbar-bar').animate({
                        width:$(this).attr('data-percent')
                    }, 800);
                });
            }
            // ajax调用投票数据
            // $.ajax({
            //     url: '......',
            //     method: 'GET',
            // }).done(function(data) {
            //     setSkillbar(data)
            // })

            // fakeData为出参结构（暂定）
            var fakeData = [
                {area: '北京', amount: 50, percent: '20%'},
                {area: '杭州', amount: 10, percent: '2%'},
                {area: '深圳', amount: 40, percent: '10%'},
                {area: '广州', amount: 90, percent: '50%'},
                {area: '成都', amount: 30, percent: '5%'}
            ];
            // 暂时生成计票器
            setSkillbar(fakeData);
        }
    });
});
    
function openWin() {
    var win = document.querySelector('.win');
    win.setAttribute('class', win.getAttribute('class') + ' open');
}
function closeWin() {
    var win = document.querySelector('.win');
    win.setAttribute('class', win.getAttribute('class').replace(' open', ''));
}

