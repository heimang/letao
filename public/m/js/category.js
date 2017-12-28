/*
* @Author: lt
* @Date:   2017-12-27 14:35:50
* @Last Modified by:   lt
* @Last Modified time: 2017-12-27 22:07:18
*/
$(function(){
	mui('.mui-scroll-wrapper').scroll({
		//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		scrollY: true, //是否竖向滚动
 		scrollX: false, //是否横向滚动
 		startX: 0, //初始化时滚动至x
 		startY: 0, //初始化时滚动至y
 		indicators: false, //是否显示滚动条
 		deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
 		bounce: true //是否启用回弹
 		
	});
	categoryListData();

})
function categoryListData(){
	$.ajax({
		url:'/category/queryTopCategory',
		success: function(data){
			var html = template('categoryListTmp',data);
			$('#main .left ul').html(html);
			$('#main .left ul li:eq(0)').addClass('active');
			var id = $('#main .left ul li').eq(0).data('id');
			getData(id);
		}
	})
	
	$('#main .left ul').on('click',function (e) {
		$(e.target).parent().addClass('active').siblings().removeClass('active');
		var id = $(e.target).parent().data('id');
		getData(id);
	})
}
function getData(id){
	$.ajax({
		url:'/category/querySecondCategory',
		data: {
			'id':id
		},
		success: function(data){
			// console.log(data);
			var html = template('categoryProductTmp',data);
			$('#main .right .mui-row').html(html);
		}
	})
}