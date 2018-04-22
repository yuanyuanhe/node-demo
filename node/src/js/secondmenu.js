function secondMenu(){
	$.ajax({
		url:"json/secondmenu.json",
		success:function(res){
//			console.log(res);
			var itemcontent = res.data;
			var $bannerl = $('.banner-l')[0];
			var $list = $('.banner-l .list')[0];
			var $secmenu = $('.secmenu');
//			var $item = $('.list a');
//			console.log(itemcontent);
			for(var i=0;i<itemcontent.length;i++){
				var $a = $('<a>');
				$a.attr('href','##');
				$a.html(itemcontent[i].t);
				var $li = $('<li></li>');
				var $span = $('<span>');
				var $p = $('<p>');
				$span.html('>');
				$li.append($a[0]);
				$li.append($span[0]);
				for(var j=0;j<itemcontent[i].o.length;j++){
					var $dl = $('<dl>');
					var $dt = $('<dt>');
					var $a = $('<a>');
					var $span = $('<span>');
					$a.attr('href','##');
					$a.html(itemcontent[i].o[j].s)
					$span.html('>');
					$dt.append($a[0]);
					$dt.append($span[0]);
					$dl.append($dt[0]);
					for(var k=0;k<itemcontent[i].o[j].c.length;k++){
						var $dd = $('<dd>');
						var $span = $('<span>');
						var $a = $('<a>');
						$a.attr('href','##');
						$a.html(itemcontent[i].o[j].c[k])
						$span.html('|');
						$dd.append($span[0]);
						$dd.append($a[0]);
						$dl.append($dd[0]);
					}
					$p.append($dl[0]);
//					console.log($p)
				}
//				console.log($p[0]);
				
				
				$li.append($p[0]);
				$list.append($li[0]);
			}
			
			
		}
	});
}
