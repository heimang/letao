/*
* @Author: 姊佽吘
* @Date:   2017-12-30 11:00:40
* @Last Modified by:   姊佽吘
* @Last Modified time: 2017-12-31 23:26:13
*/
/*
1.接收信息ID
2.处理鞋码数据
3.渲染页面
4.轮播图模板生成
5.鞋码模板生成
6.数量加减
7.加入购物车
8.下拉刷新



 */

$(function(){
	getDetailData();
	refreshData();
	slide();
	goCart()
})
function getDetailData(callback){
	$.ajax({
		url: '/product/queryProductDetail',
		data: {
			id: getProductsData('id')
		},
		success: function(data){
			console.log(data);
			var arr = data.size.split("-");
			var start = +arr[0],end = +arr[1],arrNew = []; //转成数字
			for(var i = start; i <= end; i++){
				arrNew.push(i);
			}
			data.size = arrNew;
			console.log(data);

			var size = template('sizeTmp',data);
			var img = template('slideTmp',data);
			var scroll = template('scrollTmp',data);

			
			// 自动轮播没加类名 找了一晚上就这么低级的‘’‘’‘

			$('.mui-slider-group').html(img);
			var firstImg = $('.mui-slider-group .mui-slider-item').first().clone().addClass('mui-slider-item-duplicate');
			var lastImg = $('.mui-slider-group .mui-slider-item').last().clone().addClass('mui-slider-item-duplicate');
			$('.mui-slider-group').append(firstImg);
			$('.mui-slider-group').prepend(lastImg);

			$('.mui-slider-indicator').html(scroll);
			$('.mui-slider-indicator .mui-indicator').first().addClass('mui-active');

			slide();
			$('.size').html(size);
			$('.name').html(data.proName);
			$('.newPrice').html('￥'+ data.price);
			$('.oldPrice').html('￥'+ data.oldPrice);
			callback && callback(data);
		}
	})
}
function getProductsData(key){
	var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
	var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}
function refreshData(){
	mui.init({
  		pullRefresh : {
    		container:"#refreshContainer",
    		down : {
    		  	contentdown : "下拉可以刷新",
    		  	contentover : "释放立即刷新",
    		  	contentrefresh : "正在刷新...",
    		  	callback : function(){
    		  		getDetailData(function(){
    		  			setTimeout(function(){
    		  				mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
    		  			}, 1000)		  			
    		  		});
    		  	}
    		}
  		}
	})
}
function slide(){
	var gallery = mui('.mui-slider');
	gallery.slider({
  		interval:1000
	});
}
function goCart(){
	var num = 0,size = 0;
	var maxNum = parseInt($('.maxCount').text());
	$('.reduce').on('tap',function(){
		num--;
		if(num <= 0) num = 0;
		$('.num').text(num);
	})
	$('.add').on('tap',function(){
		num++;
		if(num >= maxNum) num = maxNum;
		$('.num').text(num);
	})
	$('.size').on('tap','span',function(){
		$(this).addClass('active').siblings().removeClass('active');
		size = $(this).text();

	})
	$('.left').on('tap',function(){
		if(size == 0) {
			mui.toast('请选择码数',{ duration:'long', type:'div' });
			return;
		}
		if(num == 0) {
			mui.toast('请选择商品件数',{ duration:'long', type:'div' });
			return;
		}
 		mui.confirm('现在就去看看吧','宝贝已上车',['是','否'],function(e){
 			if(e.index == 0) {
 				window.location.href = 'cart.html';
 			}
 			
 		});

	})
}
