function addAminate(obj) {
	obj.find('[animate]:visible').addClass('animated');
	obj.find('[animate]:visible').each(function () {
		$(this).addClass($(this).data('animate'));
	});
}
function removeAminate() {
    $('[animate]').removeClass('animated');
    $('[animate]').each(function () {
        $(this).removeClass($(this).data('animate'));
    })
}

$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'vertical',
      // loop: true
      speed: 1500
    });
    var timer;
    function openDoor(mySwiper) {
        var timer = null;  
        var num = 1;  
        doortimer = setInterval(function(){  
            num++;  
            $("#book-door").removeClass().addClass('door'+num); 
            if (num==4) { 
            clearInterval(doortimer) 
                mySwiper.allowSlideNext = true;
                // mySwiper.slideNext();
            }  
        },1000)  
    }
    function init() {
        addAminate($('.page1'));
        mySwiper.allowSlideNext = false;
        openDoor(mySwiper);
    }
    
    if (mySwiper.activeIndex === 0) {
    	init();
    }
    function vote(city, slider) {
        // 参数对应名字：beijing,shenzhen,guangzhou,hangzhou,chengdu
        $.post('a.php', { act : 'vote' , cityname:city}, function(a){
            if(!a.success) {
                var fakeData = [
                    {area: '北京', amount: 50, percent: '20%'},
                    {area: '杭州', amount: 10, percent: '2%'},
                    {area: '深圳', amount: 40, percent: '10%'},
                    {area: '广州', amount: 90, percent: '50%'},
                    {area: '成都', amount: 30, percent: '5%'}
                ];

                var maxinfo = a.info[0];
                var maxticket = maxinfo['total_ticket'];

                var arr = new Array();
                for (var i = 0 ; i< a.info.length ; i ++) {
                    var item = new Array();
                    item['area'] = a.info[i]['area'];
                    item['amount'] = a.info[i]['total_ticket'];
                    if (maxticket <= 0) {
                        item['percent'] = "0%";
                    } else {
                        item['percent'] = a.info[i]['total_ticket'] * 100 / maxticket + "%";
                    }
                    arr[arr.length] = item;
                }
                var data = arr;
                $('.skillbar').each(function(i){
                    $(this).attr('data-percent', data[i].percent);
                    $('.skillbar-title span').eq(i).html(data[i].area + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].amount + '票');
                    $(this).find('.skillbar-bar').animate({
                        width:$(this).attr('data-percent')
                    }, 800);
                });

                mySwiper.slideNext();
            } else {
                alert(a.msg);
            }
        }, "json");
    }

    mySwiper.on('slideChange', function () {
    	var num = mySwiper.activeIndex;
    	console.log(num);
    	timer && clearTimeout(timer);
        removeAminate();
    	addAminate($('.page' + (num + 1)));
    	if (num === 0) {
            init();
        } else if (num === 1) {
            // mySwiper.allowSlideNext = false;
    		timer = setTimeout(function () {
    			mySwiper.slideNext();
    		}, 4000);
    	} else if (num === 3) {
    		$('.house4').on('tap', function () {
    			$('.win4').fadeIn(600);
    		});
    		$('.win4').on('tap', function () {
    			$(this).fadeOut();
    		});
    	}else if (num === 4) {
            $('.house5').on('tap', function () {
                $('.win5').fadeIn(600);
            });
            $('.win5').on('tap', function () {
                $(this).fadeOut();
            });
        }else if (num === 5) {
            $('.house6').on('tap', function () {
                $('.win6').fadeIn(600);
            });
            $('.win6').on('tap', function () {
                $(this).fadeOut();
            });
        }else if (num === 6) {
            $('.house7').on('tap', function () {
                $('.win7').fadeIn(600);
            });
            $('.win7').on('tap', function () {
                $(this).fadeOut();
            });
        } else if (num === 7) { // 视频相关
    		$('#videoPlay').on('tap', function () {
				console.log('sdss')
                videoinfo.play(); 
                document.addEventListener("WeixinJSBridgeReady", function () {
                    videoinfo.play(); 
                }, false);
    		});
    		var videobox=document.getElementById('videoinfo');
            
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
    	} else if (num === 8) {
    		// mySwiper.allowSlideNext = false;
    		$('.next').on('tap', function () {
    			var cityname = $("#selectTypeRel").val();
                if(!cityname){
                    alert("请选择城市");
                    return;
                }
                console.log(cityname,'cityname');
                // 投票
                vote(cityname, mySwiper);
    		});
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
            $('.mask').removeClass('hide');
    		function setSkillbar(data) {
                $('.skillbar').each(function(i){
                    $(this).attr('data-percent', data[i].percent);
                    $('.skillbar-title span').eq(i).html(data[i].area + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].amount + '票');
                    $(this).find('.skillbar-bar').animate({
                        width:$(this).attr('data-percent')
                    }, 800);
                });
            }
            // 生成计票器
            var voteObj = [
                {area: '北京', amount: 50, percent: '20%'},
                {area: '杭州', amount: 10, percent: '2%'},
                {area: '深圳', amount: 40, percent: '10%'},
                {area: '广州', amount: 90, percent: '50%'},
                {area: '成都', amount: 30, percent: '5%'}
            ]
            //setSkillbar(voteObj);
            $('.share').on('tap', function () {
            	$('.mask').addClass('animated open');
            });
            $('.mask').on('tap', function () {
            	$(this).removeClass('open animated')
            });
            $('.back').on('tap', function () {
            	mySwiper.slideTo(8, 1, false);
            });
    	}
    })
});