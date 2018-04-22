$(function(){
	$.ajax({
		url:"/lunbo",
		success:function(res){
			// console.log(res);
			var $ul = $('.jdlb-imglist')[0];
			var $jdlb= $('.jdlb-page')[0];
			var x = -1;
			for(var i=0;i<res.length;i++){
				var src = res[i].imgUrl;
				var href = res[i].href;
				var $img = $('<img>');
				$img.attr('src',src);
				var $a = $('<a>');
				$a.append($img[0]);
				$a.attr('href',href);
				var $li = $('<li>');
				$li.append($a[0]);
				$ul.append($li[0]);
				x++;
				var $aCircle = $('<a>');
				$aCircle.attr('href','##');
				$aCircle.attr('count',x);
				$jdlb.append($aCircle[0]);
//				console.log($aCircle[0]);
//				console.log(src)
			}
			
			new jdlb();
		}
		
	})

function jdlb(){
	this.init();
	this.move();
	this.autoPlay();
	this.hoverControl();
	this.btnControl();
	this.aHover();
}

 jdlb.prototype.init = function(){
 	this.$li = $('.jdlb-imglist li');
	this.timer = null;
	this.index = 0;
	this.$btnL = $('.jdlb-direction .left-btn');
	this.$btnR = $('.jdlb-direction .right-btn');
 }

 jdlb.prototype.move = function(){
	if(this.index<0){
		this.index = this.$li.length-1;
	}
	if(this.index>this.$li.length-1){
		this.index = 0;
	}
	this.$li.siblings().stop().animate({'opacity':0}).eq(this.index).stop().animate({'opacity':1});
	$('.jdlb-page a').removeClass('active').eq(this.index).addClass('active');
	
}

jdlb.prototype.aHover = function(){
	var that = this;
	$('.jdlb-page a').hover(function(){
		$('.jdlb-page a').removeClass('active');
		$(this).addClass('active');
		var ind = $(this).attr('count');
		that.$li.siblings().stop().animate({'opacity':0}).eq(ind).stop().animate({'opacity':1});
//	console.log($(this).attr('count'))
	})
}


jdlb.prototype.autoPlay = function(){
	this.timer = setInterval(function(){
		this.index++;
		this.move();
//			console.log($('.jdlb-page a'))
	}.bind(this),1000)
}

jdlb.prototype.hoverControl = function(){
 	$('.banner').hover(function(){
		clearInterval(this.timer);
		$('.jdlb-direction a').css({
			'display':'block'
		})
	}.bind(this),function(){
		this.autoPlay();
		$('.jdlb-direction a').css({
			'display':'none'
		})
	 }.bind(this))	
	}


jdlb.prototype.btnControl = function(){
	this.$btnL.click(function(){
		this.index--;
		this.move();
	}.bind(this))
	this.$btnR.click(function(){
		this.index++;
		this.move();
	}.bind(this))
}











})
