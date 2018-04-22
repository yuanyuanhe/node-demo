function search(){
	$.ajax({
		url:"/searchExp",
		success:function(res){
			console.log(res);
			var $searchb = $('.search-b');
			for(var i=0;i<res.length;i++){
				var $a = $('<a>');
				var $span = $('<span>');
				$a.html(res[i].name);
				$a.attr('herf',res[i].href);
				$span.html('|');
				$searchb.append($a[0]);
				$searchb.append($span[0]);
			}
		}
	});
}