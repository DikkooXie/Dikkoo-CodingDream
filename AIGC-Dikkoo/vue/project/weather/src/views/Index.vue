<template>
    <div class="main__container">
        <header class="main__header">
            <!-- 时间 -->
            <div class="header__time">{{ state.time }}</div>
            <!-- 城市 -->
            <div class="header__city" @click="state.citySelectorShow=true">{{ state.city.name }}</div>
        </header>
        <div class="city-info">
            <!-- 当前天气信息 -->
            <div class="city-info__item">
                <div class="city-info__name">{{ state.liveWeather.city }}</div>
                <div class="city-info__highlight">
                    <!-- 温度 -->
                    <p class="city-info__temp">{{ state.liveWeather.temperature }}°C</p>
                    <!-- 分割 -->
                    <span class="city-info__cut">/</span>
                    <!-- 天气 -->
                    <p class="city-info__weather">{{ state.liveWeather.weather }}</p>
                </div>
                <div class="city-info__detail">
                    <span>风力：{{ state.liveWeather.windPower }}</span>
                    <span class="city-info__cut">|</span>
                    <span>风向：{{ state.liveWeather.windDirection }}</span>
                    <span class="city-info__cut">|</span>
                    <span>湿度：{{ state.liveWeather.humidity }}</span>
                </div>
            </div>
            <!-- 未来天气信息列表 -->
            <div class="city-info__item">
                <div class="city-info__name">未来天气</div>
                <div v-for="item in state.forecastWeather" :key="item.date">
                    
                </div>
            </div>
            <!-- 未来天气折线图 -->
            <div class="city-info__item">
                <div class="city-info__name">未来天气折线图</div>
                <div class="echarts-warp" ref="echartsWarp"></div>
            </div>
        </div>
        
        <!-- 城市选择界面 -->
        <van-action-sheet v-model:show="state.citySelectorShow">
            <div class="content">
                <van-area 
                    title="地区" 
                    :area-list="areaList" 
                    columns-num="3"
                    @confirm="selectCity"
                    @cancel="state.citySelectorShow = false"
                ></van-area>
            </div>
        </van-action-sheet>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { areaList } from '@vant/area-data';
import * as echarts from 'echarts';

const state = reactive({
    time: '00:00',
    city: {
        name: '北京市',
        code: '110000'
    },
    liveWeather: {
        city: '北京市',
        temperature: 0,
        weather: '',
        windPower: '',
        windDirection: '',
        humidity: ''
    },
    forecastWeather: [
        {
            "date": "2024-07-06",
            "week": "6",
            "dayWeather": "小雨",
            "nightWeather": "多云",
            "dayTemp": 33,
            "nightTemp": 24,
            "dayWindDir": "西南",
            "nightWindDir": "西南",
            "dayWindPower": "1-3",
            "nightWindPower": "1-3"
        },
        {
            "date": "2024-07-07",
            "week": "7",
            "dayWeather": "多云",
            "nightWeather": "多云",
            "dayTemp": 34,
            "nightTemp": 24,
            "dayWindDir": "东北",
            "nightWindDir": "东北",
            "dayWindPower": "1-3",
            "nightWindPower": "1-3"
        },
        {
            "date": "2024-07-08",
            "week": "1",
            "dayWeather": "小雨",
            "nightWeather": "多云",
            "dayTemp": 33,
            "nightTemp": 24,
            "dayWindDir": "东南",
            "nightWindDir": "东南",
            "dayWindPower": "1-3",
            "nightWindPower": "1-3"
        },
        {
            "date": "2024-07-09",
            "week": "2",
            "dayWeather": "多云",
            "nightWeather": "多云",
            "dayTemp": 32,
            "nightTemp": 23,
            "dayWindDir": "北",
            "nightWindDir": "北",
            "dayWindPower": "1-3",
            "nightWindPower": "1-3"
        }
    ],
    citySelectorShow: false
});

/**
 * 获取时间
 */
setInterval(() => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    state.time = `${hours}:${minutes}`;
}, 1000);

/**
 * IP定位获取城市信息
 */
AMap.plugin('AMap.CitySearch', function () {
  var citySearch = new AMap.CitySearch()
  citySearch.getLocalCity(function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        // console.log(result);
        state.city.name = result.city;
        state.city.code = result.adcode;
        getWeather(result.city);
    }
  })
})

/**
 * 选择城市
 */
const selectCity = ({ selectedOptions }) => {
    state.city.name = selectedOptions[2].text;
    state.city.code = selectedOptions[2].value;
    getWeather(state.city.code);
    state.citySelectorShow = false;
}

/**
 * 获取天气信息
 * @param {String} cityCode 城市行政编码
 * @returns                 无返回值
 */
const getWeather = (cityCode) => {
    //加载天气查询插件
    AMap.plugin("AMap.Weather", function () {
        //创建天气查询实例
        var weather = new AMap.Weather();
        //执行实时天气信息查询
        weather.getLive(cityCode, function (err, data) {
            // console.log(err, data);
            //err 正确时返回 null
            //data 返回实时天气数据，返回数据见下表
            if (err) {
                console.error(err);
                return;
            } else {
                // console.log(data);
                state.liveWeather = data;
            }
        });
        //执行未来天气信息查询
        weather.getForecast(cityCode, function (err, data) {
            // console.log(err, data);
            //err 正确时返回 null
            //data 返回天气预报数据，返回数据见下表
            if (err) {
                console.error(err);
                return;
            } else {
                // console.log(data);
                state.forecastWeather = data.forecasts;

                nextTick(() => { // 保证内部的逻辑会在页面渲染后执行
                    initEcharts(data.forecasts.map(item => item.dayTemp), data.forecasts.map(item => item.nightTemp));
                });
            }
        });
    });
}

// echarts 配置

const echartsWarp = ref(null);

const initEcharts = (dayTempArr, nightTempArr) => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(echartsWarp.value);
    // 绘制图表
    // let weatherName = ["小雨","小雨","阴","小雨","多云","小雨","小雨"];
    myChart.setOption({
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['今天', '明天', '后天', '大后天']
      },
      yAxis: {},
      series: [
        {
          name: '日间温度',
          type: 'line',
          data: dayTempArr
        },
        {
          name: '晚间温度',
          type: 'line',
          data: nightTempArr
        }
      ]
    });
}

</script>

<style lang="css" scoped>
.main__container {
    min-height: 100vh;
    background-color: #000;
    opacity: 0.7;
    color: #fff;
}

.main__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.city-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.city-info__item {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 1rem 0;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.city-info__name {
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 1rem;
}

.city-info__highlight {
    display: flex;
    justify-content: center;
    align-items: center;
}

.city-info__temp {
    font-size: 3rem;
    font-weight: bold;
}

.city-info__cut {
    font-size: 2rem;
    margin: 0 1rem;
}

.city-info__weather {
    font-size: 2.5rem;
    font-weight: bold;
}

.city-info__detail {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.echarts-warp {
    width: 100%;
    height: 50vh;
    background-color: #fff;
}
</style>