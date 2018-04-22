$(function(){
	search();
	secondMenu();
	mousehover();
	carousel();
	proclamation();
	hotproduct();
	shoper();
	importul();
	searchkeyword();
	getinfo();
	toTop();
	
})

function mousehover(){
	var $dt = $('.clear dt');
	var $dd = $('.clear dd');
	$dt.css({
		'width':$dd.outerWidth(),
		'height':$dd.outerHeight(),
		'border-bottom':'2px solid #e31939',
		'position':'absolute',
		'left':0
	})
	$dd.hover(function(){
		$dt.stop().animate({
			'left':$(this).position().left,
			'width':$(this).outerWidth(),
		})
		$(this).children().css({'color':'#e31939'})
	},function(){
		$dt.stop().animate({
			'left':0,
			'width':$dd.outerWidth()
		})
		$(this).children().css({'color':'#666'})
	})
}

function carousel(){
	$.ajax({
		url:'/carousel',
		success:function(res){
			//console.log(res.data);
			var $ul = $('.carousel ul');
			var arr = res.map(function(val){
//				console.log(val.href)
				return `
						<li>
							<a href=${val.href}>
								<img src=${val.imgUrl}>
							</a>
						</li>
				`
			})
			var ulHTML = arr.join('');
			$ul.html(ulHTML);
			var $li = $('.carousel ul li');
			var $p = $('.carousel p');
			var $leftBtn = $('.carousel p i:first-child');
			var $rightBtn = $('.carousel p i:last-child');
			var x=1;
			$rightBtn.click(function(){
				if($ul.position().left<=-$li.length-2*$li.width()){
					$ul.css({'left':$li.length-3*$li.width()});
				}else{
					$ul.animate({left:$ul.position().left-$li.width()},true);
					console.log($ul.position().left);
				}
				
			})
			$leftBtn.click(function(){
				
				console.log($ul.position().left,'dsfsf');
				if($ul.position().left>=0){
					$ul.css({'left':"0px"});
				}else{
					$ul.animate({left:$ul.position().left+$li.width()},true);
				}
			})
		}
	})
}

function proclamation(){
	var $h4left = $('.proclamation li:first-child h4');
	var $h4right = $('.proclamation li:last-child h4');
	var $detail1 = $('.proclamation .detail1');
	var $detail2 = $('.proclamation .detail2');
	//console.log($detail1[0])
	$h4left.hover(function(){
		$h4left.removeClass('zhaoshang');
		$h4right.addClass('zhaoshang');
		$detail2.addClass('detail');
		$detail1.removeClass('detail')
	})
	$h4right.hover(function(){
		$h4left.addClass('zhaoshang');
		$h4right.removeClass('zhaoshang');
		$detail1.addClass('detail');
		$detail2.removeClass('detail')
	})
}

function hotproduct(){
	$.ajax({
		url:'json/hotproduct.json',
		success:function(res){
			//console.log(res.data)
			var arr = res.data.map(function(val){
				return `
						<li>
							<a href=${val.href} target="_blank">
								<img src=${val.imgUrl}>
							</a>
						</li>
				`
			})
			var $ul = $('#hotproduct .list');
			var ulHTML = arr.join('');
			$ul.html(ulHTML);
			//console.log($ul[0]);
			
		}
	})
}

function shoper(){
	$.ajax({
		url:"/shoper",
		success:function(res){
			//console.log(res)
			var arr = res.map(function(val){
				return `
						<li>
							<a href=${val.href} title=${val.title} class="valign">
								<img src=${val.imgUrl}>
							</a>
						</li>
				`
			})
			var $ul = $('#shoper .list');
			var ulHTML = arr.join('');
			$ul.html(ulHTML);
		}
	});
}

function importlist(ul){
	$.ajax({
		url:"/import"+ul,
		success:function(res){
			// console.log(res)
			var arr = res.map(function(val){
				return `
						<li>
							<a href=goodsdetails.html?id=${val.id} id=${val.id} class="img valign" title=${val.detail}>
								<img src=${val.imgUrl}>
							</a>
							<a href=${val.href} class="txt" title=${val.detail}>
								${val.detail}
							</a>
							<span>¥${val.price}</span>
							<img src="images/shopcar.gif" class="shopcar"/>
						</li>
				`
			})
			var ulHTML = arr.join('');
			var $ul = $('.detail .'+ul);
			$ul.html(ulHTML);
			joincart(ul);
		}
	});
}

function importul(){
	importlist("selectlist");
	importlist("snacklist");
	var $select = $('.detail .select');
	var $snack= $('.detail .snack');
	var $selectlist = $('.detail .select .selectlist');
	var $snacklist = $('.detail .snack .snacklist');
	$select.hover(function(){
		$(this).addClass('active');
		$snack.removeClass('active');
		$snacklist.addClass('hidden');
	})
	$snack.hover(function(){
		$(this).addClass('active');
		$select.removeClass('active');
		$snacklist.removeClass('hidden');
	})
	//console.log($snacklist[0])
}

function searchkeyword(){
	var $input = $('.search-t input');
	var $searcht = $('.search .search-t');
	var $ul = $('<ul>');
	$input.bind("input propertychange",function(){
		console.log(1)
		
		var keyword = $(this).val();
		console.log(keyword)
		var url = `https://suggest.taobao.com/sug?code=utf-8&q=${keyword}&_ksTS=1510923756867_3066&callback=jsonp3067&k=1&area=c2c&bucketid=20`
		$.ajax({
			url:url,
			dataType:"jsonp",
			jsonp:"callback",
			success:function(res){
				//console.log(res)
				var arr = res.result.map(function(val){
					return `
							<li><a href="##">${val[0]}</a></li>
					`
				})
				var ulHTML  = arr.join('');
				$ul.html(ulHTML);
				console.log($ul[0])
			}
		})
	})
	$searcht.append($ul[0]);
	var $header = $('header')
	$input.focus(function(){
		$(this).attr('placeholder','')
	})
	$input.blur(function(){
		$(this).attr('placeholder','请输入关键字')
	})
	$searcht.hover(function(){
		$ul.css({
			"display":"block"
		})
	},function(){
		$ul.css({
			"display":"none"
		})
	})
	
}

function getinfo(){
	var uid = getCookie('username');
	if(uid){
		
		var $reg = $('.top-l a:nth-child(2)');
		$reg.html('欢迎'+uid+'!');
		//console.log($reg[0]);
	}
	
	var url = 'http://datainfo.duapp.com/shopdata/getuser.php?callback=?';
		$.getJSON(url,{userID:uid},function(res){
			//console.log(res)
		})
}

function toTop(){
	window.onscroll = function(){
//		var scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
		var scrollTop = $(document).scrollTop(); 
//		var clientheight = document.documentElement.clientHeight;
		var clientheight = $(window).height();
		$('#toTop').css({
			'top':scrollTop+clientheight-2*$('#toTop').height()
		})
		//console.log(scrollTop);
		if(scrollTop>clientheight){
			$('#toTop').css({
				"display":"block"
			})
		}else{
			$('#toTop').css({
				"display":"none"
			})
		}
		if(scrollTop>1700){
			$('#toTop').css({
				'top':scrollTop+clientheight-5*$('#toTop').height()
			})
		}
	}
	$('#toTop').click(function(){
			$(document).scrollTop(0)
		})
		
	
}

function joincart(ul){
	var $btn = $('.'+ul+' .shopcar');
	// console.log($btn[0]);
	$btn.click(function(){
		var str = getCookie('init');
		var pid = $(this).parent().children('.img').attr('id');
		console.log(1);
		var num = 1;
		if(!str){
			var obj = {};
			obj[pid]=num;
			str = JSON.stringify(obj);
			setCookie('init',str,7)
		}else{
			var obj1 = JSON.parse(str);
			if(!obj1[pid]){
				obj1[pid] = num;
			}else{
				var n = obj1[pid];
				n++;
				obj1[pid] = n;
			}
			str = JSON.stringify(obj1);
			setCookie('init',str,7);
		}
		//console.log(obj)
		alert('已添加至购物车');
	})
	
	
}