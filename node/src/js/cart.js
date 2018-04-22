$(function(){
	if(getCookie('username')){
		getdata("import");
		getinfo();
		
	}else{
		$('.summoney span:nth-child(2)').html(0)
		alert('请登录')
		//console.log(1)
	}
	
	function getdata(json){
		$.getJSON("json/"+json+".json",function(res){
			//console.log(res)
			var cookieStr = getCookie('init');
			var cookieObj = cookieStr?JSON.parse(cookieStr):{};
			//console.log(cookieObj);
			var $ul = $("#main ul");
			for(var i=0;i<res.data.length;i++){
				for(var key in cookieObj){
					if(res.data[i].id==key){
						//console.log(cookieObj[key]);
						var $li = $('<li>');
						var liHTML = `
						
								<input type="checkbox" class="checkboxsigle check" checked="checked"/>
								<div class="product">
									<a href="##">
										<img src=${res.data[i].imgUrl}>
										<span>${res.data[i].detail}</span>
									</a>
								</div>
								<div class="count">
									<button>-</button>
									<input type="text" value="${cookieObj[key]}"/>
									<button>+</button>
								</div>
								<p class="price">¥${res.data[i].memberprice}</p>
								<p class="totalprice" pid="${res.data[i].id}">$19.62</p>
								<span class="delete">删除</span>
							
							
						`
						$li.html(liHTML).attr('data-id',res.data[i].id);
						$ul.append($li);
					}
				}
			}
			
			totalprice();
			var $addbtn = $('li .count button:nth-child(3)');
			$addbtn.click(function(){
				var num = Number($(this).prev().val());
				num++;
				$(this).prev().val(num)
				//console.log(num)
				totalprice();
				var $id = $(this).parent().parent().attr('data-id');
				cookieObj[$id] = num;
				var cookieStr = JSON.stringify(cookieObj);
				setCookie('init',cookieStr,7);
				//console.log(cookieObj)
				summoney();
			})
			
			var $minbtn = $('li .count button:nth-child(1)');
			$minbtn.click(function(){
				var num = Number($(this).next().val());
				if(num==1){
					num==1;
				}else{
					num--;
				}
				
				$(this).next().val(num)
				//console.log(num)
				totalprice();
				var $id = $(this).parent().parent().attr('data-id');
				cookieObj[$id] = num;
				var cookieStr = JSON.stringify(cookieObj);
				setCookie('init',cookieStr,7);
				console.log(cookieObj)
				summoney();
			})
			
			var $del = $('li .delete');
			$del.click(function(){
				$(this).parent().remove();
				var $id = $(this).parent().attr('data-id');
				delete cookieObj[$id]
				var cookieStr = JSON.stringify(cookieObj);
				setCookie('init',cookieStr,7);
				summoney();
			})
			
			var $checkall = $('.checkboxall');
			var $checkBox = $('.checkboxsigle');
			$checkall.click(function(){
				
				if($(this).prop("checked")){
					
					$checkBox.prop("checked","true");
					console.log($checkBox)
				}else{
					$checkBox.removeAttr("checked")
				}
				summoney();
			})
			
			checkclick()
			function checkclick(){
				var $checkBox = $('.checkboxsigle');
				$checkBox.click(function(){
					summoney();
				})
			}
			showcheckbox();
			summoney();
			function summoney(){
				var $totalprice = $(".totalprice");
				var num = 0;
				var arr = [];
				//console.log(1)
				$totalprice.each(function(key,val){
					if($(this).parent().children('.checkboxsigle')[0].checked){
						//num+=Number($(this).html());
						var $pid = $(this).attr('pid');
						arr.push($pid);
						
						
					}
					
				})
				//console.log(cookieObj);
				//console.log(arr);
				var count = [];
				for(var i=0;i<arr.length;i++){
					for(var key in cookieObj){
						if(arr[i]==key){
							//console.log(cookieObj[key])
							count.push(cookieObj[key]);
						}
					}
				}
				console.log(count);
				//console.log(res.data);
				var price = [];
				for(var i=0;i<res.data.length;i++){
					for(var j=0;j<arr.length;j++){
						if(res.data[i].id==arr[j]){
							console.log(res.data[i].memberprice);
							price.push(res.data[i].memberprice)
						}
					}
				}
				//console.log(num)
				//console.log(price);
				var sum = 0;
				for(var i=0;i<count.length;i++){
					
				
					sum = count[i]*price[i];
					num+=sum;
				}
				
				//console.log(count[1]*price[1])
				$('.summoney span:nth-child(2)').html("¥"+num.toFixed(2));
				
			}
			
			var $clearcart = $('.clearcart');
			$clearcart.click(function(){
				$('#main ul').html('购物车为空');
				setCookie('init','xx',-1);
			})
			
			savecheckbox();
			function savecheckbox(){
				var $check = $('.check');
				$check.click(function(){
					var str = '';
					$check.each(function(key,val){
						
						if(!$check[key].checked){
							//console.log(key)
							str+=key;
							
						}
						
					})
					//console.log(str)
					setCookie('checkBox',str,7);
				})
			}
			
			
			function showcheckbox(){
				if(getCookie('checkBox')){
					var str = getCookie('checkBox');
					var arr = str.split('');
					var $check = $('.check');
					$check.each(function(key,val){
						for(var i=0;i<arr.length;i++){
							if(arr[i]==key){
								val.removeAttribute('checked')
							}
						}
					})
//					for(var i=0;i<arr.length;i++){
//						$check[i]
//					}
					//console.log(arr)
				}
			}
			
			inputValue();
			function inputValue(){
				var $input = $('li .count input');
				$input.change(function(){
					console.log($(this).val());
					var num = $(this).val();
					console.log(num)
					if(Number(num)<=0){
						num = 1;
					}else{
						num = Number(num);
					}
					$(this).val(num);
					var $id = $(this).parent().parent().attr('data-id');
					cookieObj[$id] = num;
					var cookieStr = JSON.stringify(cookieObj);
					setCookie('init',cookieStr,7);
					totalprice();
					summoney();
				})
				
			}
			
			function saveCookie(){
				var $id = $(this).parent().parent().attr('data-id');
				cookieObj[$id] = num;
				var cookieStr = JSON.stringify(cookieObj);
				setCookie('init',cookieStr,7);
			}
			
			
			function totalprice(){
				var $price = $('li .price');
				$price.each(function(key,val){
					var $priceHTML = parseFloat($(this).html().slice(1));
					var $count = Number($(this).prev().children('input').val());
					$(this).next().html(($priceHTML*$count).toFixed(2))
					
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
})


