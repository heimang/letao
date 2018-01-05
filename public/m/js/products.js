/*
* @Author: 姊佽吘
* @Date:   2017-12-29 18:35:31
* @Last Modified by:   姊佽吘
* @Last Modified time: 2017-12-30 12:38:27
*/
var page = 1;
var product = getProductsData('products'); //字符串
$(function(){
	pullFresh();
	searchProducts();
	getSort();
	getDetail()
})
function getProductsData(key){
	var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
	var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}
function requesterProducts(options,callback){	
	$.ajax({
		url: '/product/queryProduct',
		data: options,
		success: function(data){
			/*console.log(data);
			var html = template('productsTmp',data);
			$('.products .mui-row').html(html);*/
			callback && callback(data);
		}		
	})
}
function pullFresh(){ //下拉完 有问题
	mui.init({
  		pullRefresh: {
    		container:"#refreshContainer",
    		down: {	
    		    contentdown : "下拉可以刷新",
    		    contentover : "释放立即刷新",
    		    contentrefresh : "正在刷新...",
    		    // auto:true,
    		    callback :  function() {
    		    	// page = 1; // 下拉完 在上啦page值回归 不行在下啦有问题 放回调函数里 ajax请求完执行，所以放内函数里
                    setTimeout(function() {
                        requesterProducts({
                            proName: product, 
                            price: 1, 
                            num: 1, 
                            page: 1, 
                            pageSize: 2, 
                        }, function(data) {
                            var html = template('productsTmp', data);
                            $('.products .mui-row').html(html);
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                      		page = 1;
                            mui('#refreshContainer').pullRefresh().refresh(true);
                        })
                        // mui('#refreshContainer').pullRefresh().refresh(true); // 下拉重置 
                        // 放到回调函数里啊 上拉也是这个放外面造成问题啊。。。
                    }, 1000);
                } 
    		},
    		up: {
    		  contentrefresh : "正在刷新...",
    		  contentnomore: '已刷没啦',
    		  callback :   function() {
                    setTimeout(function() {
                    	page++;
                        requesterProducts({
                            proName: product,
                            price: 1, 
                            num: 1, 
                            page: page, 
                            pageSize: 2, 
                        }, function(data) {
                            var html = template('productsTmp', data);
                            $('.products .mui-row').append(html);
                            if(data.data.length <= 0){
                            	mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            	// page = 1;
                            	return;
                            }   
                             mui('#refreshContainer').pullRefresh().endPullupToRefresh();                       
                        })                     
                    }, 1000);
                } 
    		}
  		}
	})
	// mui('#refreshContainer').pullRefresh().refresh(true);
}

function searchProducts(){
	$('.search button').on('click',function(){
		product = $(this).prev().val().trim();
		if(!product) return;
		requesterProducts({
			proName: product,
			price: 1,
			num: 1,
			page: 1,
			pageSize: 2
		},function(data){
			if(!data.data.length){
				$('.products .mui-row').html('<p>没有此商品</p>');
				return;
			}
			var html = template('productsTmp', data);
            $('.products .mui-row').html(html); 
		})	
	})
	//没搜索默认刷一次
    requesterProducts({
    	proName: product,
    	price: 1,
    	num: 1,
    	page: 1,
    	pageSize: 2
    },function(data){
    	var html = template('productsTmp',data);
		$('.products .mui-row').html(html)
    })
}
function getSort(){
	$('.nav .mui-row div').on('tap',function(){
		var str = $(this).data('name');
		var num = $(this).data('num');
		$(this).addClass('active').siblings().removeClass('active');		
		if(str == 'price'){
			if(num == 1) {
				$(this).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
				num = 2;
			}
			else {
				$(this).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
				num = 1;
			}
			$(this).data('num',num); // 要赋值回去，不然一直是1
			requesterProducts({
				proName: product,
				price: num,
				page: 1,
				pageSize: 2 
				// 页容量统一 只写一个排序标准，升序price=1或num=1  降序price=2或num=2;
			},function(data){
				if(!data.data.length){
					$('.products .mui-row').html('<p>没有此商品</p>');
					return;
				}
				var html = template('productsTmp', data);
            	$('.products .mui-row').html(html); 
			})	
		}
		if(str == 'num'){
			if(num == 1) {
				$(this).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
				num = 2;
			}
			else {
				$(this).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
				num = 1;
			}
			$(this).data('num',num);
			requesterProducts({
				proName: product,
				num: num,
				page: 1,
				pageSize: 2
			},function(data){
				if(!data.data.length){
					$('.products .mui-row').html('<p>没有此商品</p>');
					return;
				}
				var html = template('productsTmp', data);
            	$('.products .mui-row').html(html); 
			})	
		}
	})
}
function getDetail(){
	$('.products .mui-row').on('click','a',function(){
		var id = $(this).data('id');
		window.location.href = 'detail.html?id=' + id;
	})
}