<template>
 <div class="relative bg-black text-white lg:ml-6 mt-4">
    <div id="container">
     <div class="absolute z-10 top-4 left-4 font-bold text-sm">
       业务区域
       <div class="text-xs text-cyan-500">6个铁路局 12个省</div>
     </div>
    </div>
 </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted} from 'vue';
import { shallowRef } from '@vue/reactivity'


const initMap = () => {
  AMapLoader.load({
    key:"6940774e77291b01d450ecd9ee9d6438", // 首次调用 load 时必填
    version:"2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "Loca":{     // 是否加载 Loca， 缺省不加载
      "version": '2.0'  
    }
  })
  .then((AMap)=>{
    let map = shallowRef(null);
    map = new AMap.Map("container",{  //设置地图容器id
        zooms: [3, 8],
        zoom: 4,
        pitch: 32,
        showLabel: false,
        viewMode: '3D',
        center: [105.425968, 35.882505],
        mapStyle: 'amap://styles/darkblue'
      });
    // 文字图层
    var labelLayer = new AMap.LabelsLayer({
      rejectMapMask: true,
      collision: true,
      animation: true,
    });
    map.add(labelLayer);
    var loca = new Loca.Container({
      map,
    });
 
    var scatterLayer3 = new Loca.ScatterLayer({
      zIndex: 10,
      opacity: 0.8,
      visible: true,
      zooms: [2, 22],
    });
    var centerPoint = new Loca.GeoJSONSource({
      data: {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [117.2, 39.13],
            },
          },
        ],
      },
    });
    scatterLayer3.setSource(centerPoint);
    scatterLayer3.setStyle({
        size: [200000, 200000],
        unit: 'meter',
        texture: 'https://a.amap.com/Loca/static/static/center-point.png',
    });
    loca.add(scatterLayer3);
    var setLabelsLayer = (data) => {
      data.forEach((item) => {
        var labelsMarker = new AMap.LabelMarker({
          name: item.properties.province,
          position: item.geometry.coordinates,
          zooms: [2, 22],
          opacity: 1,
          zIndex: 10,
          text: {
            content: item.properties.province,
            direction: 'bottom',
            offset: [0, -5],
            style: {
              fontSize: 13,
              fontWeight: 'normal',
              fillColor: '#fff',
            },
          },
        });
        labelLayer.add(labelsMarker);
      })
    }
    labelLayer.add(
      new AMap.LabelMarker({
        name: 'china',
        position: [117.2, 39.13],
        zooms: [2, 22],
        opacity: 1,
        zIndex: 10,
        rank: 100,
        text: {
          content: '天津',
          direction: 'bottom',
          offset: [0, -5],
          style: {
            fontSize: 13,
            fontWeight: 'normal',
            fillColor: '#fff',
          },
        },
      }),
    );
    const gaoSource = [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            118.30000,
            26.08333
          ]
        },
        "properties": {
          "province": "福建",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            115.90000,
            28.68333
          ]
        },
        "properties": {
          "province": "江西",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.45000, 
            29.56667
          ]
        },
        "properties": {
          "province": "重庆",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            104.06667,
            30.66667
          ]
        },
        "properties": {
          "province": "四川",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            96.75000,
            36.56667
          ]
        },
        "properties": {
          "province": "青海",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            91.00000,
            30.60000
          ]
        },
        "properties": {
          "province": "西藏",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            113.23333,
            23.16667
          ]
        },
        "properties": {
          "province": "广东",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            113.00000,
            28.21667
          ]
        },
        "properties": {
          "province": "湖南",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.320004, 
            22.82402
          ]
        },
        "properties": {
          "province": "广西",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.71667,
            26.56667
          ]
        },
        "properties": {
          "province": "贵州",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            110.35000,
            20.01667
          ]
        },
        "properties": {
          "province": "海南",
          "type": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            102.73333,
            25.05000
          ]
        },
        "properties": {
          "province": "云南",
          "type": 0
        }
      },
    ]

    setLabelsLayer(gaoSource);
  }).catch(err => 
    console.log(err)
  )
}
onMounted(() => {
  initMap();
})

</script>

<style scoped>
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 70vh;
}
</style>