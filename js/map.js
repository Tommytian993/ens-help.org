// ENS 诊所地图 JavaScript

// 初始化 ECharts
var chart = echarts.init(document.getElementById("main"));
var backBtn = document.getElementById("backBtn");
var resetBtn = document.getElementById("resetBtn");

// 当前地图状态
var currentLevel = "china";
var currentName = "china";

// 示例数据 - 全国省份数据
var chinaData = [
  {
    name: "北京市",
    value: 85,
    adcode: "110000",
    clinics: 12,
    patients: 85,
    cities: ["北京市"],
  },
  {
    name: "天津市",
    value: 45,
    adcode: "120000",
    clinics: 6,
    patients: 45,
    cities: ["天津市"],
  },
  {
    name: "河北省",
    value: 120,
    adcode: "130000",
    clinics: 8,
    patients: 120,
    cities: ["石家庄市", "唐山市", "保定市"],
  },
  {
    name: "山西省",
    value: 65,
    adcode: "140000",
    clinics: 4,
    patients: 65,
    cities: ["太原市", "大同市"],
  },
  {
    name: "内蒙古自治区",
    value: 35,
    adcode: "150000",
    clinics: 2,
    patients: 35,
    cities: ["呼和浩特市"],
  },
  {
    name: "辽宁省",
    value: 95,
    adcode: "210000",
    clinics: 7,
    patients: 95,
    cities: ["沈阳市", "大连市", "鞍山市"],
  },
  {
    name: "吉林省",
    value: 55,
    adcode: "220000",
    clinics: 3,
    patients: 55,
    cities: ["长春市", "吉林市"],
  },
  {
    name: "黑龙江省",
    value: 70,
    adcode: "230000",
    clinics: 5,
    patients: 70,
    cities: ["哈尔滨市", "齐齐哈尔市"],
  },
  {
    name: "上海市",
    value: 150,
    adcode: "310000",
    clinics: 18,
    patients: 150,
    cities: ["上海市"],
  },
  {
    name: "江苏省",
    value: 180,
    adcode: "320000",
    clinics: 15,
    patients: 180,
    cities: ["南京市", "苏州市", "无锡市", "常州市"],
  },
  {
    name: "浙江省",
    value: 160,
    adcode: "330000",
    clinics: 12,
    patients: 160,
    cities: ["杭州市", "宁波市", "温州市", "嘉兴市"],
  },
  {
    name: "安徽省",
    value: 90,
    adcode: "340000",
    clinics: 6,
    patients: 90,
    cities: ["合肥市", "芜湖市", "蚌埠市"],
  },
  {
    name: "福建省",
    value: 75,
    adcode: "350000",
    clinics: 5,
    patients: 75,
    cities: ["福州市", "厦门市", "泉州市"],
  },
  {
    name: "江西省",
    value: 60,
    adcode: "360000",
    clinics: 4,
    patients: 60,
    cities: ["南昌市", "九江市"],
  },
  {
    name: "山东省",
    value: 140,
    adcode: "370000",
    clinics: 10,
    patients: 140,
    cities: ["济南市", "青岛市", "烟台市", "潍坊市"],
  },
  {
    name: "河南省",
    value: 110,
    adcode: "410000",
    clinics: 8,
    patients: 110,
    cities: ["郑州市", "洛阳市", "开封市"],
  },
  {
    name: "湖北省",
    value: 100,
    adcode: "420000",
    clinics: 7,
    patients: 100,
    cities: ["武汉市", "宜昌市", "襄阳市"],
  },
  {
    name: "湖南省",
    value: 85,
    adcode: "430000",
    clinics: 6,
    patients: 85,
    cities: ["长沙市", "株洲市", "湘潭市"],
  },
  {
    name: "广东省",
    value: 220,
    adcode: "440000",
    clinics: 20,
    patients: 220,
    cities: ["广州市", "深圳市", "珠海市", "佛山市", "东莞市"],
  },
  {
    name: "广西壮族自治区",
    value: 70,
    adcode: "450000",
    clinics: 5,
    patients: 70,
    cities: ["南宁市", "桂林市", "柳州市"],
  },
  {
    name: "海南省",
    value: 25,
    adcode: "460000",
    clinics: 2,
    patients: 25,
    cities: ["海口市"],
  },
  {
    name: "重庆市",
    value: 80,
    adcode: "500000",
    clinics: 6,
    patients: 80,
    cities: ["重庆市"],
  },
  {
    name: "四川省",
    value: 130,
    adcode: "510000",
    clinics: 9,
    patients: 130,
    cities: ["成都市", "绵阳市", "德阳市", "南充市"],
  },
  {
    name: "贵州省",
    value: 45,
    adcode: "520000",
    clinics: 3,
    patients: 45,
    cities: ["贵阳市", "遵义市"],
  },
  {
    name: "云南省",
    value: 55,
    adcode: "530000",
    clinics: 4,
    patients: 55,
    cities: ["昆明市", "大理市"],
  },
  {
    name: "西藏自治区",
    value: 5,
    adcode: "540000",
    clinics: 1,
    patients: 5,
    cities: ["拉萨市"],
  },
  {
    name: "陕西省",
    value: 75,
    adcode: "610000",
    clinics: 5,
    patients: 75,
    cities: ["西安市", "宝鸡市"],
  },
  {
    name: "甘肃省",
    value: 40,
    adcode: "620000",
    clinics: 3,
    patients: 40,
    cities: ["兰州市", "天水市"],
  },
  {
    name: "青海省",
    value: 15,
    adcode: "630000",
    clinics: 1,
    patients: 15,
    cities: ["西宁市"],
  },
  {
    name: "宁夏回族自治区",
    value: 20,
    adcode: "640000",
    clinics: 2,
    patients: 20,
    cities: ["银川市"],
  },
  {
    name: "新疆维吾尔自治区",
    value: 35,
    adcode: "650000",
    clinics: 3,
    patients: 35,
    cities: ["乌鲁木齐市", "克拉玛依市"],
  },
];

// 省份城市数据示例
var provinceCityData = {
  110000: [
    // 北京市
    { name: "东城区", value: 25, clinics: 3, patients: 25 },
    { name: "西城区", value: 20, clinics: 2, patients: 20 },
    { name: "朝阳区", value: 30, clinics: 4, patients: 30 },
    { name: "海淀区", value: 10, clinics: 3, patients: 10 },
  ],
  120000: [
    // 天津市
    { name: "和平区", value: 15, clinics: 2, patients: 15 },
    { name: "河东区", value: 12, clinics: 1, patients: 12 },
    { name: "河西区", value: 18, clinics: 3, patients: 18 },
  ],
  130000: [
    // 河北省
    { name: "石家庄市", value: 45, clinics: 4, patients: 45 },
    { name: "唐山市", value: 35, clinics: 3, patients: 35 },
    { name: "保定市", value: 40, clinics: 1, patients: 40 },
  ],
  140000: [
    // 山西省
    { name: "太原市", value: 40, clinics: 3, patients: 40 },
    { name: "大同市", value: 25, clinics: 1, patients: 25 },
  ],
  150000: [
    // 内蒙古自治区
    { name: "呼和浩特市", value: 35, clinics: 2, patients: 35 },
  ],
  210000: [
    // 辽宁省
    { name: "沈阳市", value: 40, clinics: 4, patients: 40 },
    { name: "大连市", value: 35, clinics: 2, patients: 35 },
    { name: "鞍山市", value: 20, clinics: 1, patients: 20 },
  ],
  220000: [
    // 吉林省
    { name: "长春市", value: 35, clinics: 2, patients: 35 },
    { name: "吉林市", value: 20, clinics: 1, patients: 20 },
  ],
  230000: [
    // 黑龙江省
    { name: "哈尔滨市", value: 45, clinics: 3, patients: 45 },
    { name: "齐齐哈尔市", value: 25, clinics: 2, patients: 25 },
  ],
  310000: [
    // 上海市
    { name: "黄浦区", value: 35, clinics: 4, patients: 35 },
    { name: "徐汇区", value: 30, clinics: 3, patients: 30 },
    { name: "长宁区", value: 25, clinics: 3, patients: 25 },
    { name: "静安区", value: 20, clinics: 2, patients: 20 },
    { name: "浦东新区", value: 40, clinics: 6, patients: 40 },
  ],
  320000: [
    // 江苏省
    { name: "南京市", value: 50, clinics: 5, patients: 50 },
    { name: "苏州市", value: 45, clinics: 4, patients: 45 },
    { name: "无锡市", value: 35, clinics: 3, patients: 35 },
    { name: "常州市", value: 30, clinics: 3, patients: 30 },
  ],
  330000: [
    // 浙江省
    { name: "杭州市", value: 50, clinics: 5, patients: 50 },
    { name: "宁波市", value: 40, clinics: 3, patients: 40 },
    { name: "温州市", value: 35, clinics: 2, patients: 35 },
    { name: "嘉兴市", value: 25, clinics: 2, patients: 25 },
  ],
  340000: [
    // 安徽省
    { name: "合肥市", value: 40, clinics: 3, patients: 40 },
    { name: "芜湖市", value: 30, clinics: 2, patients: 30 },
    { name: "蚌埠市", value: 20, clinics: 1, patients: 20 },
  ],
  350000: [
    // 福建省
    { name: "福州市", value: 35, clinics: 3, patients: 35 },
    { name: "厦门市", value: 25, clinics: 1, patients: 25 },
    { name: "泉州市", value: 15, clinics: 1, patients: 15 },
  ],
  360000: [
    // 江西省
    { name: "南昌市", value: 35, clinics: 2, patients: 35 },
    { name: "九江市", value: 25, clinics: 2, patients: 25 },
  ],
  370000: [
    // 山东省
    { name: "济南市", value: 45, clinics: 4, patients: 45 },
    { name: "青岛市", value: 40, clinics: 3, patients: 40 },
    { name: "烟台市", value: 30, clinics: 2, patients: 30 },
    { name: "潍坊市", value: 25, clinics: 1, patients: 25 },
  ],
  410000: [
    // 河南省
    { name: "郑州市", value: 50, clinics: 4, patients: 50 },
    { name: "洛阳市", value: 35, clinics: 2, patients: 35 },
    { name: "开封市", value: 25, clinics: 2, patients: 25 },
  ],
  420000: [
    // 湖北省
    { name: "武汉市", value: 50, clinics: 4, patients: 50 },
    { name: "宜昌市", value: 30, clinics: 2, patients: 30 },
    { name: "襄阳市", value: 20, clinics: 1, patients: 20 },
  ],
  430000: [
    // 湖南省
    { name: "长沙市", value: 45, clinics: 3, patients: 45 },
    { name: "株洲市", value: 25, clinics: 2, patients: 25 },
    { name: "湘潭市", value: 15, clinics: 1, patients: 15 },
  ],
  440000: [
    // 广东省
    { name: "广州市", value: 85, clinics: 8, patients: 85 },
    { name: "深圳市", value: 65, clinics: 6, patients: 65 },
    { name: "珠海市", value: 25, clinics: 2, patients: 25 },
    { name: "佛山市", value: 20, clinics: 2, patients: 20 },
    { name: "东莞市", value: 15, clinics: 1, patients: 15 },
    { name: "中山市", value: 10, clinics: 1, patients: 10 },
  ],
  450000: [
    // 广西壮族自治区
    { name: "南宁市", value: 35, clinics: 2, patients: 35 },
    { name: "桂林市", value: 25, clinics: 2, patients: 25 },
    { name: "柳州市", value: 10, clinics: 1, patients: 10 },
  ],
  460000: [
    // 海南省
    { name: "海口市", value: 25, clinics: 2, patients: 25 },
  ],
  500000: [
    // 重庆市
    { name: "渝中区", value: 30, clinics: 3, patients: 30 },
    { name: "江北区", value: 25, clinics: 2, patients: 25 },
    { name: "南岸区", value: 25, clinics: 1, patients: 25 },
  ],
  510000: [
    // 四川省
    { name: "成都市", value: 60, clinics: 5, patients: 60 },
    { name: "绵阳市", value: 30, clinics: 2, patients: 30 },
    { name: "德阳市", value: 25, clinics: 1, patients: 25 },
    { name: "南充市", value: 15, clinics: 1, patients: 15 },
  ],
  520000: [
    // 贵州省
    { name: "贵阳市", value: 30, clinics: 2, patients: 30 },
    { name: "遵义市", value: 15, clinics: 1, patients: 15 },
  ],
  530000: [
    // 云南省
    { name: "昆明市", value: 35, clinics: 3, patients: 35 },
    { name: "大理市", value: 20, clinics: 1, patients: 20 },
  ],
  540000: [
    // 西藏自治区
    { name: "拉萨市", value: 5, clinics: 1, patients: 5 },
  ],
  610000: [
    // 陕西省
    { name: "西安市", value: 50, clinics: 3, patients: 50 },
    { name: "宝鸡市", value: 25, clinics: 2, patients: 25 },
  ],
  620000: [
    // 甘肃省
    { name: "兰州市", value: 25, clinics: 2, patients: 25 },
    { name: "天水市", value: 15, clinics: 1, patients: 15 },
  ],
  630000: [
    // 青海省
    { name: "西宁市", value: 15, clinics: 1, patients: 15 },
  ],
  640000: [
    // 宁夏回族自治区
    { name: "银川市", value: 20, clinics: 2, patients: 20 },
  ],
  650000: [
    // 新疆维吾尔自治区
    { name: "乌鲁木齐市", value: 25, clinics: 2, patients: 25 },
    { name: "克拉玛依市", value: 10, clinics: 1, patients: 10 },
  ],
};

// 加载地图函数
function loadMap(adcode, name) {
  chart.showLoading({
    text: "正在加载地图数据...",
    color: "#667eea",
    textColor: "#333",
    maskColor: "rgba(255, 255, 255, 0.8)",
    zlevel: 0,
  });

  // 根据层级选择数据
  var mapData = [];
  var title = "";

  if (adcode === "100000") {
    mapData = chinaData;
    title = "全国 ENS 诊所分布";
    backBtn.classList.add("hidden");
  } else {
    mapData = provinceCityData[adcode] || [];
    title = name + " - 城市分布";
    backBtn.classList.remove("hidden");
  }

  // 计算统计数据
  updateStats(mapData);

  fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((geoJson) => {
      chart.hideLoading();
      echarts.registerMap(name, geoJson);

      currentLevel = adcode;
      currentName = name;

      chart.setOption({
        title: {
          text: title,
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
            fontSize: 20,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.data) {
              var data = params.data;
              var html = '<div style="padding: 10px;">';
              html +=
                '<div style="font-weight: bold; margin-bottom: 8px; color: #333;">' +
                params.name +
                "</div>";
              html +=
                '<div style="margin-bottom: 5px;">👥 患者数量: <span style="color: #ff6b6b; font-weight: bold;">' +
                (data.patients || data.value || 0) +
                " 人</span></div>";
              html +=
                '<div style="margin-bottom: 5px;">🏥 诊所数量: <span style="color: #42a5f5; font-weight: bold;">' +
                (data.clinics || 0) +
                " 家</span></div>";
              if (data.cities && data.cities.length > 0) {
                html +=
                  '<div style="margin-top: 8px; color: #666;">主要城市: ' +
                  data.cities.slice(0, 3).join("、") +
                  "</div>";
              }
              html += "</div>";
              return html;
            }
            return params.name;
          },
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#ddd",
          borderWidth: 1,
          borderRadius: 8,
          textStyle: {
            color: "#333",
          },
        },
        visualMap: {
          min: 0,
          max: Math.max(...mapData.map((d) => d.value)),
          left: "left",
          bottom: 20,
          text: ["多", "少"],
          calculable: true,
          inRange: {
            color: ["#e3f2fd", "#42a5f5", "#1e88e5", "#1976d2", "#1565c0"],
          },
          textStyle: {
            color: "#333",
          },
        },
        series: [
          {
            name: "ENS 分布",
            type: "map",
            map: name,
            roam: true,
            scaleLimit: {
              min: 0.8,
              max: 3,
            },
            emphasis: {
              itemStyle: {
                areaColor: "#ff6b6b",
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: true,
                color: "#fff",
                fontSize: 12,
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            label: {
              show: true,
              fontSize: 10,
              color: "#333",
            },
            data: mapData,
          },
        ],
      });

      // 绑定点击事件
      chart.off("click");
      chart.on("click", function (params) {
        if (params.data && params.data.adcode && adcode === "100000") {
          // 从全国点击省份，下钻到省份
          // 使用省份的完整名称作为地图名称
          var provinceName = params.name;
          loadMap(params.data.adcode, provinceName);
        }
      });
    })
    .catch((error) => {
      chart.hideLoading();
      console.error("加载地图失败:", error);

      // 如果是省份级地图加载失败，显示城市列表视图
      if (adcode !== "100000") {
        showCityListView(name, mapData);
      } else {
        alert("地图加载失败，请检查网络连接");
      }
    });
}

// 显示城市列表视图（当省份地图加载失败时）
function showCityListView(provinceName, cityData) {
  currentLevel = "list";
  currentName = provinceName;
  backBtn.classList.remove("hidden");

  // 创建城市列表视图
  var cityListHtml =
    '<div style="padding: 30px; text-align: center; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 600px;">';
  cityListHtml +=
    '<h2 style="margin-bottom: 30px; color: #333; font-size: 1.8em; font-weight: 300;">' +
    provinceName +
    " - 城市分布</h2>";
  cityListHtml +=
    '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto;">';

  if (cityData.length === 0) {
    cityListHtml +=
      '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">';
    cityListHtml +=
      '<div style="font-size: 3em; margin-bottom: 20px;">🏥</div>';
    cityListHtml +=
      '<h3 style="margin-bottom: 10px; color: #333;">暂无城市数据</h3>';
    cityListHtml += "<p>该省份的城市数据正在收集中...</p>";
    cityListHtml += "</div>";
  } else {
    cityData.forEach(function (city) {
      cityListHtml +=
        '<div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; border-left: 4px solid #42a5f5;">';
      cityListHtml +=
        '<div style="font-weight: bold; color: #333; margin-bottom: 12px; font-size: 1.1em;">' +
        city.name +
        "</div>";
      cityListHtml +=
        '<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">';
      cityListHtml +=
        '<span style="color: #666; font-size: 14px;">👥 患者</span>';
      cityListHtml +=
        '<span style="color: #ff6b6b; font-weight: bold;">' +
        (city.patients || city.value || 0) +
        " 人</span>";
      cityListHtml += "</div>";
      cityListHtml +=
        '<div style="display: flex; justify-content: space-between;">';
      cityListHtml +=
        '<span style="color: #666; font-size: 14px;">🏥 诊所</span>';
      cityListHtml +=
        '<span style="color: #42a5f5; font-weight: bold;">' +
        (city.clinics || 0) +
        " 家</span>";
      cityListHtml += "</div>";
      cityListHtml += "</div>";
    });
  }

  cityListHtml += "</div></div>";

  // 清空地图容器并显示城市列表
  document.getElementById("main").innerHTML = cityListHtml;
}

// 更新统计数据
function updateStats(data) {
  var totalPatients = data.reduce(
    (sum, item) => sum + (item.patients || item.value || 0),
    0
  );
  var totalClinics = data.reduce((sum, item) => sum + (item.clinics || 0), 0);
  var coveredProvinces = data.length;

  document.getElementById("totalPatients").textContent = totalPatients;
  document.getElementById("totalClinics").textContent = totalClinics;
  document.getElementById("coveredProvinces").textContent = coveredProvinces;
}

// 返回全国
backBtn.onclick = function () {
  // 如果当前是城市列表视图，需要重新初始化 ECharts
  if (currentLevel === "list") {
    chart = echarts.init(document.getElementById("main"));
  }
  loadMap("100000", "china");
};

// 重置视图
resetBtn.onclick = function () {
  chart.dispatchAction({
    type: "restore",
  });
};

// 响应式处理
window.addEventListener("resize", function () {
  chart.resize();
});

// 初始加载全国地图
loadMap("100000", "china");

// 测试数据是否正确加载
setTimeout(function () {
  console.log("测试数据:", chinaData.slice(0, 3));
  console.log("统计数据:", {
    totalPatients: document.getElementById("totalPatients").textContent,
    totalClinics: document.getElementById("totalClinics").textContent,
    coveredProvinces: document.getElementById("coveredProvinces").textContent,
  });
}, 2000);
