$(function() {
    var signFun = function() {    	
    	var $daybox = $('.signdaylist'),
    		$signbtn = $('.signright_top'),  
    		$signmonleft = $('.signmonleft'),
    		$signmonright = $('.signmonright'),
    		signed = [],
    		_handle = true,
    		myDate = new Date();
    	var myMonth = parseInt(myDate.getMonth()+1);	 
    	var myMonthInx = myMonth;
    	createDay(myMonth);
    	function createDay(itme){
    		var dayhtml = '',
	    		num = 1;
	    	var monthFirth = new Date(myDate.getFullYear(),itme-1,1).getDay();
	    	var d = new Date(myDate.getFullYear(),itme,0);
	    	var daytotal = d.getDate();  
	    	for(var i = 0;i < 42;i++){
	    		if(i < monthFirth || i >= daytotal+monthFirth){
	    			dayhtml += '<li></li>';
	    		}else{    			
	    			dayhtml += '<li class="jfdata jfdata'+ num +'">' + (num++) + '</li>';
	    		}   		
	    	}
    		$daybox.html(dayhtml); 
    		$('.signmonshow').html(''+itme+'月'+myDate.getFullYear()+'');  		
    		$.ajax({
	            type: 'GET',
	            url: 'http://localhost:81/data/xyjfdata.json',   //[1,2,3,4]
	            data: {},
	            success: function (returnValue) {
	                signed = returnValue.xyjf;
	                if(itme == myMonth){
			       		for(var i = 0; i< signed.length;i++){
				    		$(".jfdata" + signed[i]).addClass('able-sign');
				    	}
			       	}
	            }
	       });			
    	}    	
    	$signbtn.one("click", function() {
            if (_handle) {
               
                $('.body-color').fadeIn(100);
                $('.hide-body').fadeIn(200);
                $('.close-window .close').click(function(){ 
                $('.body-color').fadeOut(100);// 
                $('.hide-body').fadeOut(200);//将显示的窗口隐藏起来 
                }) 
 
                 $(this).css("background","url(img/qiandaoed.png)");
                 $(this).css("background-size","cover");

                $(".jfdata" + myDate.getDate()).addClass('able-sign');
                $.ajax({
		            type: 'POST',
		            url: 'http://localhost:81/data/xyjfdata.json',
		            data: {},
		            success: function () {
		               _handle = false; 
		            }
		       	});	              
            }           
        }); 
	    $signmonright.click(function(){
	      	myMonthInx++;
    		if(myMonthInx > 12){
    			myMonthInx = 12;
    		}
    		myDate.setMonth(myMonthInx-1);
    		createDay(myMonthInx)
	    });
        $signmonleft.click(function(){
	      	myMonthInx--;
    		if(myMonthInx < 1){
    			myMonthInx = 1;
    		}
    		myDate.setMonth(myMonthInx-1);
    		createDay(myMonthInx)
	    });
    }();
})