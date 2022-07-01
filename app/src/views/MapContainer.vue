<template>
  <nut-navbar @on-click-back="back" title="签到"></nut-navbar>

  <div id='container'></div>
		<div class="info">
			<!-- <p id='status'></p><hr> -->
			<div id='distance'>系统正在定位中</div>
			<div id='location' style="color:#fff">系统正在定位中</div>
		</div>
	

	<div id="box">
		<div id='time'></div>
		<button id='signbtn' @click="sign" class="layui-btn layui-btn-normal"> {{areatext == null ? '签到' : areatext}} </button><br>
		<div id="place" type="button" class="layui-btn-radius">非办公地点</div>
		
		<p id='result'></p><hr>
	</div>	
	<input type="hidden" id="isonoff" name="isonoff" value="true">
	<input type="hidden" id="userid" name="userid" value="0">
</template>
<script setup>
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, ref} from 'vue';

import { shallowRef } from '@vue/reactivity'
import { Notify } from '@nutui/nutui';
import { useRouter } from "vue-router";
import { Http } from '@/utils/request.js'
import { getCacheVal } from "@/utils/LocalStorageKit";

const router = useRouter()
const back = () => router.back()

const area = ref(null)
const areatext = ref(null)

const initMap = () => {
  AMapLoader.load({
    key:"9b028c4caba295fbc92e528f30b90e5a", // 首次调用 load 时必填
    version:"2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "Loca":{     // 是否加载 Loca， 缺省不加载
      "version": '2.0'  
    }
  })
  .then((AMap)=>{
    var map = new AMap.Map('container', {
        viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
        zoom:11, //初始化地图层级
    })
    AMap.plugin('AMap.Geolocation', function() {
			var geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：5s
				buttonPosition:'RB',    //定位按钮的停靠位置
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

			});
			map.addControl(geolocation);
			geolocation.getCurrentPosition(function(status,result){
				if(status=='complete'){
					onComplete(result)
				}else{
					onError(result)
				}
			});
		});
		//解析定位结果
		function onComplete(data) {
			// document.getElementById('status').innerHTML='定位成功'
			var str = [];
			str.push('定位结果：' + data.position);
			area.value = data.position
			str.push('定位类别：' + data.location_type);
			if(data.accuracy){
				 str.push('精度：' + data.accuracy + ' 米');
			}//如为IP精确定位结果则没有精度信息
			str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
			document.getElementById('result').innerHTML = str.join('<br>');
			
			var getposition = [data.position.lng,data.position.lat];//获取当前位置的经纬度
			var location = data.formattedAddress;//具体街道位置信息
			console.log(getposition);
			
			var shanghaizone = [117.105740,39.069180];//设置的签到点
			//计算当前位置与考勤点距离
			var distance = AMap.GeometryUtil.distance(getposition,shanghaizone).toFixed(0);
		
			console.log(distance);
			//document.getElementById('distance').innerHTML = distancestr;
			var setDistance = 300;//设定的打卡距离
	
			document.getElementById('location').innerHTML='定位成功';
	
			var distancestr = '仍距'+distance+'米';
			console.log(distance);
			if (distance <= setDistance) {
				//在范围内
				document.getElementById('distance').innerHTML = '</i><i class="layui-icon layui-icon-face-smile" style="font-size:12px; color:#17bc84;">  你已进入考勤范围  </i>  ';
				document.getElementById("place").innerHTML="办公地点 ";
				// $("#place").addClass("isdiy");
           
            } else {
				//不在范围内
				document.getElementById('distance').innerHTML = '<i class="layui-icon layui-icon-face-cry" style="font-size: 10px; color:red;">  未进入考勤范围 </i><a style="color:#29a6ff" onClick="window.location.reload()">重新定位 </a> ';
           		document.getElementById("place").innerHTML="非办公地点 ";
           		// $("#place").addClass("nodiy");
                // document.getElementById("place").addClass('nodiy')
            }
			
        document.getElementById("signbtn").onclick = async () =>{
					try {
						if(distance<=setDistance){
							areatext.value = "校内打卡"
							Notify.text("校内打卡", { color: '#ad0000', background: '#ffe1e1' });
						}else{
							areatext.value = "校外打卡"
							Notify.text("校外打卡", { color: '#ad0000', background: '#ffe1e1' });
						}
						const _account = getCacheVal("_account");
						const res = await Http("/signin",{
							_account,
							area:area.value,
							text:areatext.value
							})
						console.log(res)
						if(res.code == "1"){
								Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
						}		
					} catch (error) {
						console.log(error)
					}
					


		};
			//绘制签到范围
			var circle = new AMap.Circle({
				center: shanghaizone,
				radius: 200, //半径
				borderWeight: 1,
				strokeOpacity: 1,
				strokeOpacity: 0.2,
				fillOpacity: 0.4,
			})

			circle.setMap(map)
			// 缩放地图到合适的视野级别
			map.setFitView([ circle ])
			var circleEditor = new AMap.CircleEditor(map, circle)
		}
		//解析定位错误信息
		function onError(data) {
			document.getElementById('location').innerHTML='定位失败';
			document.getElementById('location').innerHTML = '失败原因排查信息:'+data.message;
		}
        setInterval("document.getElementById('time').innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",1000);
        now = new Date(),hour = now.getHours(); 
		if(hour>12){ 
			document.getElementById("defshow").html(' <input id="shangxiaban" type="checkbox" name="close" lay-filter="switchTest" lay-skin="switch" lay-text="上班签到|下班签退">');
			document.getElementById("isonoff").val(false);
		}
   
})
  }
onMounted(() => {
  initMap();
})
const submit = async () => {
  try {
      const _account = getCacheVal("_account");
      const res = await Http("/signin",{
         _account,
        area,
				areatext
        })
       
      if(res.code == "1"){
          Notify.text(res.msg, { color: '#ad0000', background: '#ffe1e1' });
      }
  } catch (error) {
      console.log(error)
  }
}
</script>
<style scope>
  .nut-navbar {
    margin-bottom: 0px !important
  }
html,body{
            height:100%;
            text-align:center
        }
        .info{
            width:100%;
        }
		#container{
			width: 100%;
            height: 40vh;
		}
		#distance{
			margin:10px;	
			font-size: 12px;
		}
		#time{
			font-size:16px;
			color:#1e9fff;
			font-weight:bold;
			margin:10px;
		}
		#signbtn{
			margin:10px auto;
			width:140px;
			height:140px;
			border-radius:50%;
			box-shadow:0px 0px 8px #25a4ff;
			font-size: 20px;
		}
		#place{
			margin:5px auto;
			height:20px;
			color:#ffffff;
			width:80px;
			font-size: 12px;
			padding-top: 1px;
		}
		.isdiy{
			background-color:#5fb878 ;
		}
		.nodiy{
			background-color:#ff5722 ;
		}
		.layui-form-switch{
			width: -5%;
			height: 20%;
			background-color: #ff5722;
			margin: 5px 0;

		}
		.layui-form-onswitch{
			background-color: #009688;
			
		}
		.layui-form-switch em{
			color: #ffffff!important;
		}
		#box{
			position: fixed;
			bottom: 0;
			width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
		}
		#history{
			text-align: left;
			margin: 10px auto;
			width: 100%;
			display: flex;            
	        display: -webkit-flex;            
	        justify-content: center;            
	        align-items: center;      
		}
		.layui-timeline-item {
		    position: relative;
		    padding-bottom: 5px;
		}
		.layui-text {
		    line-height: 15px;
		    font-size: 14px;
		    color: #666;
		}
		#weizhi{
			margin-top: -8px;
			display: block;
			color: #009f95;
			font-size: 11px;
		}
		.signtype{
			color: orange;
			font-style:normal;
		}
		#location{
			font-size: 12px;
		}


</style>