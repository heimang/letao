/*
* @Author: lt
* @Date:   2017-12-26 15:22:35
* @Last Modified by:   lt
* @Last Modified time: 2017-12-26 21:42:05
*/

$(function(){
	var gallery = mui('.mui-slider');
    gallery.slider({
  		interval:3000
	});
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
})