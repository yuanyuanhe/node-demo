$(function(){
	var $input = $('input');
	//console.log($input);
	var $placeholder = $input.attr('placeholder');
	
	$input.focus(function(){
		$(this).attr('placeholder','')
	})
	var $tel = $('.tel input');
	var $password = $('.password input');
	var $confirmpw = $('.confirmpw input');
	$tel.blur(function(){
		var reg = /0?(13|14|15|18|17)[0-9]{9}/;
		var $val = $(this).val();
		if(!reg.test($val)){
			$('.detail .telhint').html('-请正确输入手机号').addClass('color');
		}else{
			$('.detail .telhint').html('可以使用').removeClass('color');
		}
		$(this).attr('placeholder','手机');
		//console.log(reg.test($val))
	})
	$password.blur(function(){
		var reg = /^([a-zA-Z]\w{5,15})/;
		var $val = $(this).val();
		if(!reg.test($val)){
			$('.detail .passwordhint').html('-请正确输入密码').addClass('color');
		}else{
			$('.detail .passwordhint').html('可以使用').removeClass('color');
		}
		//console.log(reg.test($val));
		$(this).attr('placeholder','密码');
	})
	$confirmpw.blur(function(){
		var $passwordval = $password.val();
		var $val = $(this).val();
		if($val!=$passwordval){
			$('.detail .confirmpwhint').html('-两次输入密码不一致').addClass('color');
		}else{
			$('.detail .confirmpwhint').html('')
		}
		$(this).attr('placeholder','确认密码')
	})
	var $authCode = $('.verifycode span');
	$authCode.html(authCode());
	$authCode.click(function(){
		$(this).html(authCode());
	})
	var $authCodehtml = $authCode.html();
	console.log($authCodehtml)
	var $fillincode = $('.fillincode input');
	$fillincode.blur(function(){
		console.log(1)
		if($fillincode.val() != $authCodehtml){
			$('.detail .verifycodehint').html('-请输入正确验证码').addClass('color');
			console.log($fillincode.val())
		}else{
			$('.detail .verifycodehint').html('验证码正确').removeClass('color');
		}
		$(this).attr('placeholder','验证码')
	})
	var $btn = $('.detail .btn');
	$btn.click(function(){
		var $checkbox = $('.agree input');
		if(!$checkbox[0].checked){
			$('.detail .agreehint').html('请确认已阅读用户协议').addClass('color');
		}else{
			$('.detail .agreehint').html('')
		}
	})
	
	$btn.click(function(){
		var $telVal = $tel.val();
		var $pwVal = $password.val();
		var url = "/user";
		var data = {
			status:"register",
			act:'reg',
			userID:$telVal,
			password:$pwVal
		}
		$.post(url,data,function(res){
			alert(res);
			
		})
		console.log($pwVal)
	})
	
})

function authCode(){
	var str = '';
	while(str.length<4){
		var num = randomNum(48,122)
	
		if((num>57&&num<65)||(num>90&&num<97)){
			num = randomNum(48,122)
		}else{
			str+=''+String.fromCharCode(num)
		}
		
	}
	return str
}
function randomNum(n,m){
	return parseInt(n+Math.random()*(m-n+1));
}