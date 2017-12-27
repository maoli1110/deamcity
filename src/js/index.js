function addAminate(obj) {
	obj.find('[animate]').addClass('animated');
	obj.find('[animate]').each(function () {
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
    function openDoor(mySwiper, resolve) {
        var timer = null;
        var num = 1;  
        doortimer = setInterval(function(){  
            num++;  
            $("#book-door").removeClass().addClass('door'+num); 
            if (num==4) { 
                clearInterval(doortimer) 
                mySwiper.allowSlideNext = false;
                resolve();
                // mySwiper.slideNext();
            }  
        },1000);
    }
    function init() {
        mySwiper.allowSlideNext = false;
        var promise = new Promise(function (resolve) {
            openDoor(mySwiper, resolve);
        });
        promise.then(function () {
            // $('.page1').fadeOut(800);
            $('.swiper-slide.page1').addClass('animated');
            $('.swiper-slide.page1').addClass($('.swiper-slide.page1').data('animate'));
            setTimeout(function () {
                mySwiper.allowSlideNext = true;
                mySwiper.slideTo(1, 1, false);
                removeAminate();
                addAminate($('.page2'));
            }, 2500);
        });
		audioAutoPlay('Jaudio');

        $("#music").on("click",function(){
            var audio = document.getElementById("Jaudio");
            if($(this).hasClass('music-stop')){
                $(this).removeClass('music-stop');
                $(this).addClass('music-play');
                audio.play();
            }else{
                $(this).removeClass('music-play');
                $(this).addClass('music-stop');
                audio.pause();
            }
        });
    }


    if (mySwiper.activeIndex === 0) {
        addAminate($('.page1'));
    	init();
    }
	function audioAutoPlay(id){  
		var audio = document.getElementById(id);  
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {  
				audio.play();  
		}, false);  
		document.addEventListener('YixinJSBridgeReady', function() {  
			audio.play();  
		}, false);
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
                    (this).find('.skillbar-bar').animate({
                        width:$(this).attr('data-percent')
                    }, 800);
                });
                $('.swiper-slide.page9').addClass('animated');
                $('.swiper-slide.page9').addClass($('.swiper-slide.page9').data('animate'));
                setTimeout(function () {
                    mySwiper.allowSlideNext = true;
                    mySwiper.slideTo(9, 1, false);
                }, 800);
             } else {
                 alert(a.msg);
             }
        }, "json");
    }
    $('[class*="house"]').on('tap', function () {
        var index = $(this).data('index');
        $('.win' + index).fadeIn(600);
        $('.win' + index).on('tap', function () {
            $(this).fadeOut();
        })
    });
    mySwiper.on('slideChange', function () {
    	var num = mySwiper.activeIndex;
    	console.log(num);
    	timer && clearTimeout(timer);
        removeAminate();
    	addAminate($('.page' + (num + 1)));
    	if (num === 0) {
            init();
        } else if (num === 1) {
            mySwiper.allowSlidePrev = false;
      //       mySwiper.allowSlideNext = false;
    		// timer = setTimeout(function () {
      //           mySwiper.allowSlideNext = true;
    		// 	mySwiper.slideNext();
    		// }, 4000);
        }  else if (num === 2) {
            mySwiper.allowSlidePrev = true;
      //       mySwiper.allowSlideNext = false;
            // timer = setTimeout(function () {
      //           mySwiper.allowSlideNext = true;
            //  mySwiper.slideNext();
            // }, 4000);
        } else if (num === 6) {
            mySwiper.allowSlideNext = true;
      //       mySwiper.allowSlideNext = false;
            // timer = setTimeout(function () {
      //           mySwiper.allowSlideNext = true;
            //  mySwiper.slideNext();
            // }, 4000);
        } else if (num === 7) {
            mySwiper.allowSlideNext = false;
            $('#go-vote').on('tap', function () {
                mySwiper.allowSlideNext = true;
                mySwiper.slideNext();
            });

            // 视频相关
            //      $('#videoPlay').on('tap', function () {
                        // console.log('sdss')
            //             videoinfo.play(); 
            //             document.addEventListener("WeixinJSBridgeReady", function () {
            //                 videoinfo.play(); 
            //             }, false);
            //      });  
            //      
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
            mySwiper.allowSlidePrev = false;
    		mySwiper.allowSlideNext = false;
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
                mySwiper.allowSlidePrev = false;
                mySwiper.allowSlideNext = false;
                $('.swiper-slide.page10').addClass('animated');
                $('.swiper-slide.page10').addClass($('.swiper-slide.page10').data('animate'));
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
    });
});