$(function(){
	//console.log(location.search)
	if(getCookie('username')){
		
		getinfo();
	}
	
	detaildata("importselectlist");
	detaildata("importsnacklist");
	
	function detaildata(json){
		//获取及截取产品ID
		var urlid = location.search.slice(1);
		//将id字符转转换成数组
		var urlidArr = urlid.split('=');
		//ajax请求
		$.getJSON("json/"+json+".json",function(res){
			//console.log(res.data);
			var index;
			//遍历产品json数据
			res.data.forEach(function(v,k){
				//console.log(v.id)
	//			console.log(val,key);
				//匹配json中id与当前产品id符合是获取当前产品json数据下标
				if(v.id == urlidArr[1]){
	//				console.log(k);
					index = k;
					
				}
			})
			//获取当前产品json数据
			var puddata = res.data[index];
			//将数据填入html
			var $span = $('.top span');
			console.log(puddata);
			$span.html(puddata.detail);
			$('#main .top').append($span[0])
			
			
			var botHTML = `
						<div class="imageshow">
							<div class="middlebox">
								<img src=${puddata.imgUrl}>
								<div class="filter"></div>
							</div>
							<ul>
								<li><img src=${puddata.imgUrl} img-url=${puddata.imgUrl}></li>
								<li><img src="http://www.qmbei.com/images/201711/source_img/304_P_1510110400713.jpg" img-url=${puddata.imgUrl}/></li>
							</ul>
							<div class="bigimg">
								<img src=${puddata.imgUrl}>
							</div>
						</div>
						<div class="buy">
							<h3>${puddata.detail}</h3>
							<div class="price">
								<div class="ourprice">
									<span>售价</span>
									<span>￥${puddata.memberprice}</span>
								</div>
								<div class="marketprice">
									<span>市场价</span>
									<span>￥${puddata.marketprice}</span>
								</div>
								<dl>
									<dt>
										<span>会员等级价格</span>
										<i>></i>
									</dt>
									<dd>普通会员：¥${puddata.memberprice}</dd>
									<dd>金牌会员：¥${puddata.goldmember}</dd>
								</dl>
							</div>
							<ul>
								<li>
									<span>累计评价</span>
									<a href="##">${puddata.comment}人评价</a>
								</li>
								<li>
									<span>累计销量</span>
									<span>${puddata.salenum}</span>
								</li>
								<li>
									<span>赠送积分</span>
									<span>${puddata.givescore}</span>
								</li>
							</ul>
							<p class="store"> （库存${puddata.store}）</p>	
							<div class="buytype">
								<a href="##">立即购买</a>
								<a href="##">加入购物车</a>
							</div>
						</div>
						<div class="shoperinfo">
					<h3>平台自营</h3>
					<ul class="info">
						<li>
							<span>商家名称 ：</span>
							<span>趣买呗</span>
						</li>
						<li>
							<span>客服邮件 ：</span>
							<span>124861234@qq.com</span>
						</li>
						<li>
							<span>客服电话 ：</span>
							<span>4000707188</span>
						</li>
						<li>
							<span>所在地区 ：</span>
							<span>马家堡东路</span>
						</li>
					</ul>
					<div class="contect">
						<a href="http://wpa.qq.com/msgrd?V=1&uin=124861234&Site=%E8%B6%A3%E4%B9%B0%E5%91%97&Menu=yes">
							<img src="http://wpa.qq.com/pa?p=1:124861234:4"/>
							<span>联系QQ</span>
						</a>
						<a href="http://amos1.taobao.com/msg.ww?v=2&uid=qwmark&s=2">
							<img src="http://amos1.taobao.com/online.ww?v=2&uid=qwmark&s=2"/>
							<span>联系旺旺</span>
						</a>
					</div>
					<div class="barcode">
						<p>扫一扫，手机访问微商城</p>
						<img src="http://www.qmbei.com/erweima_supplier.php?sid=0"/>
					</div>
				
					`
			$('#main .bottom').html(botHTML);
			
			imgshow();
			joincart();
			
			function joincart(){
				var $btn = $('.buytype a:nth-child(2)');
//				var obj = {};
//				var str = JSON.parse(obj)
//				setCookie('init',str,7)
				$btn.click(function(){
					var str = getCookie('init');
					var pid = urlidArr[1];
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
			
			function imgshow(){
				var $middle = $('.middlebox');
				var $middleImg = $('.middlebox img');
				var $big = $('.bigimg')
				var $bigImg = $('.bigimg img');
				var $img = $('.imageshow ul li img');
				$img.hover(function(){
					$middleImg.attr("src",$(this).attr('src'));
					$bigImg.attr("src",$(this).attr('src'));
					console.log($(this).attr('src'))
				})
				var $filter = $('.middlebox .filter');
				$middle.mousemove(function(e){
					var e = e||event;
					var $filterL = e.pageX-$middle.offset().left-100;
					var $filterT = e.pageY-$middle.offset().top-100;
					if($filterL<0){
						$filterL=0;
					}
					if($filterL>200){
						$filterL=200;
					}
					if($filterT<0){
						$filterT=0;
					}
					if($filterT>200){
						$filterT=200;
					}
					$filter.css({
						"left":$filterL,
						"top":$filterT,
						"display":'block'
					})
					$big.css({
						"display":'block'
					})
					$bigImg.css({
						"left":-2*$filterL,
						"top":-2*$filterT,
						"display":'block'
					})
					console.log($filter[0])
				})
				$middle.mouseleave(function(){
					$filter.css({
						"display":'none'
					})
					$big.css({
						"display":'none'
					})
				})
			}
			
		})
	}
	function getinfo(){
		var uid = getCookie('username');
		if(uid){
			
			var $reg = $('.top-l a:nth-child(2)');
			$reg.html('欢迎'+uid+'!');
			//console.log($reg[0]);
		}

	}
	
//	console.log(urlidArr);
})
