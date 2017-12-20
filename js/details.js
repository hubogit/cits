$(function() {
	var checkImgLoaded = function() {
		var t_img; // 定时器
		var isLoad = true; // 控制变量

		// 判断图片加载状况，加载完成后回调
		isImgLoad(function() {
			pageDoJS();
			// 加载完成
		});

		// 判断图片加载的函数
		function isImgLoad(callback) {
			// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
			// 查找所有封面图，迭代处理
			$('.cover').each(function() {
				// 找到为0就将isLoad设为false，并退出each
				if(this.height === 0) {
					isLoad = false;
					return false;
				}
			});
			// 为true，没有发现为0的。加载完毕
			if(isLoad) {
				clearTimeout(t_img); // 清除定时器
				// 回调函数
				callback();
				// 为false，因为找到了没有加载完成的图，将调用定时器递归
			} else {
				isLoad = true;
				t_img = setTimeout(function() {
					isImgLoad(callback); // 递归扫描
				}, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
			}
		}
	}
	var pageDoJS = function() {
		//定义基础数据
		var initArr = [], //楼层绝对位置信息存储数组，默认为空
			leftBarArr = [], //天数绝对位置信息存储数组，默认为空
			floorLength = $("#item_con .item_show").size(), //楼层数量
			navFixedTop = $(".item_nav").offset().top, //导航绝对位置信息
			leftBarLength = $("#left_bar_show .day_item").size(), //天数数量
			leftBarFixedTop = $("#left_bar_show").offset().top - 268; //天数导航显示绝对位置信息
		leftBarFixedMaxTop = $("#left_bar_show").next().offset().top - 268; //天数导航显示绝对位置信息
		//循环生成左侧导航栏内容，得出最新的天数绝对位置信息存储数组
		var leftBarContent = '';
		for(l = 0; l < leftBarLength; l++) {
			leftBarContent += '<li>第' + (l + 1) + '天</li>';
			var offsetTop = $("#left_bar_show .day_item").eq(l).offset().top;
			leftBarArr.push(offsetTop);
		}
		$(".left_bar ul").html(leftBarContent);
		//循环得出最新的楼层绝对位置信息存储数组
		for(i = 0; i < floorLength; i++) {
			var offsetTop = $("#item_con .item_show").eq(i).offset().top;
			initArr.push(offsetTop);
		}
		//切换导航方法
		var changeNav = function() {
			//根据窗口当前位置切换导航定位
			var scrollTop = $(window).scrollTop();
			if(scrollTop >= navFixedTop) {
				$("#navFixed").addClass("nav_fixed");
			} else {
				$("#navFixed").removeClass("nav_fixed");
			};
			//根据窗口当前位置切换导航高亮元素
			for(j = floorLength - 1; j >= 0; j--) {
				if(scrollTop > initArr[j] - 268) { //200是预留空间可以任意修改为大于68的数字
					$("#navFixed li").eq(j).addClass("check").siblings("li").removeClass("check");
					return false;
				};
			};
		};
		var changeLeftBar = function() {
				var scrollTop = $(window).scrollTop();
				if(scrollTop >= leftBarFixedTop && scrollTop < leftBarFixedMaxTop) {
					$(".left_bar").show();
				} else {
					$(".left_bar").hide();
				};
				//根据窗口当前位置切换导航高亮元素
				for(a = leftBarLength - 1; a >= 0; a--) {
					if(scrollTop > leftBarArr[a] - 268) { //200是预留空间可以任意修改为大于68的数字
						$(".left_bar li").eq(a).addClass("check").siblings("li").removeClass("check");
						return false;
					};
				};
			}
			//页面加载完执行导航切换
		changeNav();
		changeLeftBar();
		//窗口滚动时执行导航切换
		$(window).scroll(function() {
			changeNav();
			changeLeftBar();
		});
		//主导航点击时激活窗口滚动
		$("#navFixed li").on("click", function(e) {
			var _index = $(this).index();
			$(this).addClass("check").siblings("li").removeClass("check");
			$("body,html").animate({
				"scrollTop": initArr[_index] - 68 //68是导航的高度
			}, 200);
		});
		//天数导航点击时激活窗口滚动
		$(".left_bar li").on("click", function(e) {
			var _index = $(this).index();
			$(this).addClass("check").siblings("li").removeClass("check");
			$("body,html").animate({
				"scrollTop": leftBarArr[_index] - 68 //68是导航的高度
			}, 200);
		});
	};
	checkImgLoaded();
			function IsPC() {
			    var userAgentInfo = navigator.userAgent;
			    var Agents = ["Android", "iPhone",
			                "SymbianOS", "Windows Phone",
			                "iPad", "iPod"];
			    var flag = true;
			    for (var v = 0; v < Agents.length; v++) {
			        if (userAgentInfo.indexOf(Agents[v]) > 0) {
			            flag = false;
			            break;
			        }
			    }
			    return flag;
			}
			if(!IsPC()){
				$("html").css({"width":"1200px"});
				$(".hj_banner >img").css({"width":"100%","margin-left":"0","left":"0"})
				$(".position_text ").css({"margin-left":"190px"});
				$(".nav_fixed").css({"left":"0","margin-left":"5px"})
				$("..left_bar").css({"left":"0","margin-left":"50px"})
			}	
})