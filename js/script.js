// window.onload=function(){
// 	waterfall('main','box');
// 	        // var dataInt={'data':[{'src=':'0.jpg'},{'src=':'1.jpg'},{'src=':'2.jpg'},{'src=':'3.jpg'},{'src=':'4.jpg'},{'src=':'5.jpg'},{'src=':'6.jpg'},{'src=':'7.jpg'},{'src=':'8.jpg'},{'src=':'9.jpg'},{'src=':'10.jpg'},{'src=':'10.jpg'}]}
// 	            var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};

// 	window.onscroll=function(){
// 		if (checkScrollSlide) {
// 			var oParent=document.getElementById("main");
// 			for(i=0;i<dataInt.data.length;i++){
// 				var oBox=document.createElement('div');
// 				oBox.calssName='box';
// 				oParent.appendChild(oBox);
// 				var oPic=document.createElement('div');
// 			    oPic.calssName='pic';
// 				oBox.appendChild(oPic);
// 				var oImg=document.createElement('img');
// 				oImg.src='images/'+dataInt.data[i].src;
// 				oPic.appendChild(oImg);
				
// 			}
// 			waterfall('main','box');
// 		}

        
// 	}
// 	   // window.onscroll=function(){
//     //     if(checkScrollSlide()){
//     //         var oParent = document.getElementById('main');// 父级对象
//     //         for(var i=0;i<dataInt.data.length;i++){
//     //             var oPin=document.createElement('div'); //添加 元素节点
//     //             oPin.className='pin';                   //添加 类名 name属性
//     //             oParent.appendChild(oPin);              //添加 子节点
//     //             var oBox=document.createElement('div');
//     //             oBox.className='box';
//     //             oPin.appendChild(oBox);
//     //             var oImg=document.createElement('img');
//     //             oImg.src='images/'+dataInt.data[i].src;
//     //             oBox.appendChild(oImg);
//     //         }
//     //         waterfall('main','pin');
//     //     };
//     // }
// }
// function waterfall(parent,box){
// 	//将main下的所有calss为box的元素取出来；
// 	var oParent=document.getElementById(parent);
// 	var oBoxs=getByClass(oParent,box);//取得所有照片盒子；
// 	var oBoxW=oBoxs[0].offsetWidth;//每个照片盒子的宽度；
// 	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);  //每行多少列；
// 	oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";//固定main盒子的宽度，并且自居中
// 	// oParent.style.width='200px';
// 	var arrH=[];
// 	for(i=0;i<oBoxs.length;i++){
// 		if (i<cols) {
// 		arrH.push(oBoxs[i].offsetHeight);
// 		}else{
// 		var minH=Math.min.apply(this,arrH);//获取一行里面最小的高度；
// 	    var minIndex=indexOfMin(arrH,minH);
// 	    // console.log(minIndex);
// 	    oBoxs[i].style.position='absolute';
// 	    oBoxs[i].style.top=minH+'px';
// 	    oBoxs[i].style.left=oBoxW*minIndex+'px';
// 	    arrH[minIndex]+=oBoxs[i].offsetHeight;
// 	    }
// 	}

// }
// function getByClass(obj,clsName){
// 	var tags=document.getElementsByTagName("*");
// 	var cals=[];
// 	for(i=0;i<tags.length;i++){
// 		if(tags[i].className==clsName){
// 			cals.push(tags[i]);
// 		}
// 	}
// 	return cals;
// }

// function indexOfMin(arr,min){
// 	//获取一个数组里最小的值；
// 	for(var i in arr){
// 		if(arr[i]==min){
// 			return i;
// 		}
// 	}
// }

// //检测是否具备滚条加载数据的条件：
// function checkScrollSlide(){
// 	var oParent=document.getElementById('main');
// 	var oBoxs=getByClass(oParent,'box');
// 	//页面最后一个盒子一半离页面顶部的高度：
// 	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
// 	//滚动条高度
// 	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
// 	//浏览器高度
// 	var clientHight=document.documentElement.clientHight||document.body.clientHight;
// 	return (lastBoxH<clientHight+scrollTop)?true:false;
// }

$(function(){
	waterfall();
  var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
 
 $(window).on('scroll',function(){
  if (checkScrollSlide) {
    $.each(dataInt.data,function(key,value){
    var oBox=$('<div>').addClass('box').appendTo($("#main"));
    var oPic=$('<div>').addClass('pic').appendTo($(oBox));
    var oImg=$('img').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
  }
  waterfall();
 }

})

function waterfall(){
  var $boxs=$('#main>div');
  var w=$boxs.eq(0).outerWidth();
  var cols=Math.floor($(window).width()/w);
  $("#main").width(w*cols).css('margin', '0 auto');;
  var arrH=[];
  $boxs.each(function(index, value) {
  	var h=$boxs.eq(index).outerHeight();
  	if (index<cols) {
  		arrH.push(h);

  	}else{
  		var minH=Math.min.apply(null,arrH);
  		var minHIndex=$.inArray(minH, arrH);
  	    $(value).css({
  	    	'position':'absolute',
  	    	'top':minH+'px',
  	    	'left':minHIndex*w+'px',
  	    })
  	    arrH[minHIndex]+=$boxs.eq(index).outerWidth();
  	};
  });

}



function checkScrollSlide(){
  var $lastBox=$('#main>div').last();
  var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
  var scrollTop=$(window).scrollTop();
  var documentH=$(window).height();
  return(lastBoxDis<scrollTop+documentH);
}









