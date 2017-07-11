MediaHotFocusChart=function(t,e){$("#"+t).highcharts({chart:{type:"spline",height:150,width:500,marginTop:15},title:{text:"媒体关注72小时跟踪",align:"left",x:40,y:2,style:{color:"#3E576F",fontSize:"13px"}},xAxis:{title:{},type:"datetime",dateTimeLabelFormats:{day:"%b%e"},tickPixelInterval:200},yAxis:{title:{text:""},min:1,tickPixelInterval:10},tooltip:{crosshairs:!0,pointFormat:'<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y} <span style="color:red">热度</span></b>'},plotOptions:{spline:{minSize:1,maxSize:3,marker:{enabled:!1},pointInterval:18e5,pointStart:Date.UTC(e.firstYear,e.firstMonth-1,e.firstDay,e.firstHour,e.firstMinute,0)},spline:{minSize:1,maxSize:3,marker:{enabled:!1},pointInterval:18e5,pointStart:Date.UTC(e.firstYear,e.firstMonth-1,e.firstDay,e.firstHour,e.firstMinute,0)}},series:[{color:"#990033",name:"预测",data:e.hourData3},{color:"#A3E2FE",name:"总量",data:e.hourData2},{color:"#E79C25",name:"增量",data:e.hourData}],legend:{enable:!0,align:"right",verticalAlign:"top",x:-15,y:-15,floating:!0,borderWidth:0,itemStyle:{fontWeight:"normal"}},credits:{enabled:!1}})},LHChart=function(t,e,a,i){$("#"+t).highcharts({chart:{renderTo:"container",type:"column",borderColor:"#FDF7EC",borderWidth:2,borderRadius:5,marginLeft:40},title:{text:""},xAxis:{min:0,max:12,type:"category",labels:{rotation:-45,style:{fontSize:"13px",fontFamily:"微软雅黑, Verdana, sans-serif"}}},yAxis:{min:0,title:{text:""},labels:{enabled:!1}},plotLines:{color:"rgba(0,0,0,0)"},legend:{layout:"vertical",align:"right",verticalAlign:"top",x:0,y:-5,floating:!0,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF"},tooltip:{formatter:function(){return'<span style="font-size:14px;">'+this.key+"</span><br/>"+i+"："+this.y}},scrollbar:{enabled:!0},plotOptions:{column:{pointWidth:45,pointPadding:.5,groupPadding:.5}},series:[{name:a,data:e,color:"#F88928",dataLabels:{enabled:!0,color:"#777777",align:"center",format:"{point.y}",y:9,style:{fontWeight:"normal"}},events:{click:function(t){"人物排行"==a&&window.open("lianghui/leaderinfo.htm?name="+t.point.name),"热词排行"==a&&(ShowMediaList(t),ShowTopNewsList(t))}}}],credits:{enabled:!1}})},LHChart2=function(t,e,a,i){$("#"+t).highcharts({chart:{renderTo:"container",type:"column",borderColor:"#FDF7EC",borderWidth:2,borderRadius:5,marginLeft:40},title:{text:""},xAxis:{min:0,max:12,type:"category",crosshair:!0,labels:{rotation:-45,style:{fontSize:"13px",fontFamily:"微软雅黑, Verdana, sans-serif"}}},yAxis:[{min:0,title:{text:""},labels:{enabled:!1}},{title:{text:""},labels:{enabled:!1}}],plotLines:{color:"rgba(0,0,0,0)"},legend:{layout:"vertical",align:"right",verticalAlign:"top",x:0,y:-5,floating:!0,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"#FFFFFF"},tooltip:{formatter:function(){return"#9CCC3C"==this.color?'<span style="font-size:14px;">'+this.key+"</span><br/>频率："+this.y:'<span style="font-size:14px;">'+this.key+"</span><br/>"+i+"："+this.y}},scrollbar:{enabled:!0},plotOptions:{column:{pointWidth:45,pointPadding:.5,groupPadding:.5}},series:[{name:a,data:e.wordList[0].hotList,color:"#F88928",dataLabels:{enabled:!0,color:"#777777",align:"center",format:"{point.y}",y:10,style:{fontWeight:"normal"}}},{name:" 政府报告中出现的频率",data:e.wordList[1].freqList,type:"spline",yAxis:1,color:"#9CCC3C",dataLabels:{enabled:!0,color:"#000000",align:"center",format:"{point.y}",y:10,style:{fontWeight:"normal"}}}],credits:{enabled:!1}})},ShowMediaList=function(t){var e="";$.getJSON("../command/dataJson.aspx?whatDo=GetOriginalMediaRank&hotword="+encodeURIComponent(t.point.name),function(a){a.length>0&&(e='<header class="panel-heading"><button type="button" class="close" onclick="$(\'#mediaList\').hide()"><i class="fa fa-times text-danger"></i></button>『'+t.point.name+'』 媒体top20</header><div class="list-group">',$("#mediaList").show());for(var i=0;i<a.length;i++)e+='<a href="#" class="list-group-item"><span class="badge bg-success">'+a[i].count+"</span>"+a[i].medianame+"</a>";e+="</div>",$("#mediaList").html(e)})},ShowTopNewsList=function(t){var e="";$.getJSON("../command/dataJson.aspx?whatDo=GetHotwordArticleRank&hotword="+encodeURIComponent(t.point.name),function(a){a.rows.length>0&&(e='<header class="panel-heading"><button type="button" class="close" onclick="$(\'#topNewsList\').hide()"><i class="fa fa-times text-danger"></i></button>『'+t.point.name+'』 原创文章top20</header><div class="list-group">',$("#topNewsList").show());for(var i=0;i<a.rows.length;i++)e+='<a href="#" class="list-group-item" onclick="GetNews(this,\''+escape(a.rows[i].Title)+"','"+a.rows[i].articlesequenceid+'\')"><span class="badge bg-success">'+a.rows[i].videosize+"</span>"+a.rows[i].title+"</a>";e+="</div>",$("#topNewsList").html(e)})},NewsEmotionPie=function(t,e){$("#"+t).highcharts({chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,height:78,width:78,backgroundColor:"transparent",type:"pie"},title:{text:""},tooltip:{pointFormat:"{point.percentage:.1f}%",hideDelay:0,positioner:function(){return{x:0,y:20}}},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!1,connectorColor:"silver"},showInLegend:!1}},series:[{name:"",data:[{name:"正面",y:parseInt(e.result.replace("%",""))},{name:"负面",y:parseInt(100-e.result.replace("%",""))}]}],credits:{enabled:!1}})},WechatLineChart=function(t,e){$("#"+t).highcharts({chart:{type:"spline",height:150,width:500,marginTop:15},title:{text:"微信阅读量跟踪",align:"left",x:40,y:2,style:{color:"#3E576F",fontSize:"13px"}},xAxis:{title:{},type:"datetime",dateTimeLabelFormats:{day:"%b%e"},tickPixelInterval:200},yAxis:{title:{text:""},min:1,tickPixelInterval:10},tooltip:{crosshairs:!0,pointFormat:'<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y} <span style="color:red">次</span></b>'},plotOptions:{spline:{minSize:1,maxSize:3,marker:{enabled:!1},pointInterval:108e5,pointStart:Date.UTC(e.firstYear,e.firstMonth-1,e.firstDay,e.firstHour,e.firstMinute,0)},spline:{minSize:1,maxSize:3,marker:{enabled:!1},pointInterval:108e5,pointStart:Date.UTC(e.firstYear,e.firstMonth-1,e.firstDay,e.firstHour,e.firstMinute,0)}},series:[{color:"#A3E2FE",name:"阅读量",data:e.hourData},{color:"#E79C25",name:"点赞量",data:e.hourData2}],legend:{enable:!0,align:"right",verticalAlign:"top",x:-15,y:-15,floating:!0,borderWidth:0,itemStyle:{fontWeight:"normal"}},credits:{enabled:!1}})};