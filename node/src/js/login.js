$(function(){
	var $tel = $('.tel input');
	var $pw = $('.password input');
	var $checkbox = $('.saveinfo input');
	var $btn = $('.detail .btn');
	
	
	
	//验证码
	var $authcode = $('.verifycode span');
	$authcode.html(authCode());
	$authcode.click(function(){
		$(this).html(authCode());
	})
	
	if(getCookie('tel')){
		$tel.val(getCookie('tel'));
		$checkbox[0].checked = 'checked'
		//console.log($tel[0].value)
	}
	if(getCookie('password')){
		$pw.val(getCookie('password'));
		$checkbox[0].checked = 'checked'
		//console.log($tel[0].value)
	}
	console.log($checkbox[0])
	$btn.click(function(){
		var $telval = $('.tel input').val();
		var $pwval = $('.password input').val();
		var $verifycode = $('.verifycode input');
		if($checkbox[0].checked){
			setCookie('tel',$telval,7);
			setCookie('password',$pwval,7);
		}
		//console.log($authcode.html())
		var url = "/user"
		var data = {
			status:"login",
			act:'login',
			userID:$telval,
			password:$pwval
		}
		$.post(url,data,function(res){
			console.log(res);
			if(res == 0){
				alert('用户名或密码错误');
				console.log(res)
			}else if(res == 1){
				alert('网络不稳定');
			}else if($verifycode.val()!=$authcode.html()){
				alert('请输入正确验证码')
			}else if(res == 2){
				location.href='index.html';
				setCookie("username",$telval,7)
			}
			

		})
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
