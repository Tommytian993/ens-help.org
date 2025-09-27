"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as echarts from "echarts";

// 动态导入地图组件
const SimpleMap = dynamic(() => import("@/components/SimpleMap"), {
  ssr: false,
});

// 地图数据
const chinaData = [
  { name: "北京市", value: 85, clinics: 12, patients: 85, adcode: "110000" },
  { name: "上海市", value: 78, clinics: 10, patients: 78, adcode: "310000" },
  { name: "广东省", value: 92, clinics: 15, patients: 92, adcode: "440000" },
  { name: "江苏省", value: 65, clinics: 8, patients: 65, adcode: "320000" },
  { name: "浙江省", value: 58, clinics: 7, patients: 58, adcode: "330000" },
  { name: "山东省", value: 45, clinics: 6, patients: 45, adcode: "370000" },
  { name: "河南省", value: 38, clinics: 5, patients: 38, adcode: "410000" },
  { name: "四川省", value: 42, clinics: 6, patients: 42, adcode: "510000" },
  { name: "湖北省", value: 35, clinics: 4, patients: 35, adcode: "420000" },
  { name: "湖南省", value: 28, clinics: 3, patients: 28, adcode: "430000" },
  { name: "河北省", value: 32, clinics: 4, patients: 32, adcode: "130000" },
  { name: "福建省", value: 25, clinics: 3, patients: 25, adcode: "350000" },
  { name: "安徽省", value: 22, clinics: 3, patients: 22, adcode: "340000" },
  { name: "辽宁省", value: 18, clinics: 2, patients: 18, adcode: "210000" },
  { name: "江西省", value: 15, clinics: 2, patients: 15, adcode: "360000" },
  { name: "陕西省", value: 20, clinics: 3, patients: 20, adcode: "610000" },
  { name: "山西省", value: 12, clinics: 2, patients: 12, adcode: "140000" },
  { name: "黑龙江省", value: 8, clinics: 1, patients: 8, adcode: "230000" },
  { name: "吉林省", value: 10, clinics: 1, patients: 10, adcode: "220000" },
  { name: "甘肃省", value: 6, clinics: 1, patients: 6, adcode: "620000" },
  { name: "青海省", value: 3, clinics: 1, patients: 3, adcode: "630000" },
  {
    name: "新疆维吾尔自治区",
    value: 5,
    clinics: 1,
    patients: 5,
    adcode: "650000",
  },
  { name: "西藏自治区", value: 2, clinics: 1, patients: 2, adcode: "540000" },
  { name: "内蒙古自治区", value: 4, clinics: 1, patients: 4, adcode: "150000" },
  {
    name: "宁夏回族自治区",
    value: 3,
    clinics: 1,
    patients: 3,
    adcode: "640000",
  },
  {
    name: "广西壮族自治区",
    value: 8,
    clinics: 1,
    patients: 8,
    adcode: "450000",
  },
  { name: "云南省", value: 12, clinics: 2, patients: 12, adcode: "530000" },
  { name: "贵州省", value: 8, clinics: 1, patients: 8, adcode: "520000" },
  { name: "海南省", value: 5, clinics: 1, patients: 5, adcode: "460000" },
  { name: "天津市", value: 15, clinics: 2, patients: 15, adcode: "120000" },
  { name: "重庆市", value: 18, clinics: 2, patients: 18, adcode: "500000" },
];

export default function HomePage() {
  const [currentLevel, setCurrentLevel] = useState("china");
  const [currentName, setCurrentName] = useState("中国");
  const [currentData, setCurrentData] = useState(chinaData);
  const [currentProvinceCode, setCurrentProvinceCode] = useState("");
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalClinics: 0,
    totalProvinces: 0,
  });

  // 初始化地图
  useEffect(() => {
    updateStats(chinaData);
  }, []);

  const updateStats = (data: any[]) => {
    const totalPatients = data.reduce(
      (sum, item) => sum + (item.patients || item.value || 0),
      0
    );
    const totalClinics = data.reduce(
      (sum, item) => sum + (item.clinics || 0),
      0
    );
    const totalProvinces = data.length;

    setStats({ totalPatients, totalClinics, totalProvinces });
  };

  const handleMapClick = (params: any) => {
    if (
      currentLevel === "china" &&
      params.name !== "中国" &&
      params.data &&
      params.data.adcode
    ) {
      setCurrentLevel("province");
      setCurrentName(params.name);
      loadProvinceData(params.name, params.data.adcode);
    }
  };

  const loadProvinceData = (provinceName: string, adcode?: string) => {
    const cityData = getCityData(provinceName);
    const provinceCode = adcode || getProvinceCode(provinceName);
    setCurrentData(cityData);
    setCurrentProvinceCode(provinceCode);
    updateStats(cityData);
  };

  const getProvinceCode = (provinceName: string): string => {
    const codes: { [key: string]: string } = {
      北京市: "110000",
      天津市: "120000",
      河北省: "130000",
      山西省: "140000",
      内蒙古自治区: "150000",
      辽宁省: "210000",
      吉林省: "220000",
      黑龙江省: "230000",
      上海市: "310000",
      江苏省: "320000",
      浙江省: "330000",
      安徽省: "340000",
      福建省: "350000",
      江西省: "360000",
      山东省: "370000",
      河南省: "410000",
      湖北省: "420000",
      湖南省: "430000",
      广东省: "440000",
      广西壮族自治区: "450000",
      海南省: "460000",
      重庆市: "500000",
      四川省: "510000",
      贵州省: "520000",
      云南省: "530000",
      西藏自治区: "540000",
      陕西省: "610000",
      甘肃省: "620000",
      青海省: "630000",
      宁夏回族自治区: "640000",
      新疆维吾尔自治区: "650000",
    };
    return codes[provinceName] || "110000";
  };

  const getCityData = (provinceName: string) => {
    // 扩展的城市数据
    const cityDataMap: { [key: string]: any[] } = {
      北京市: [
        { name: "东城区", value: 25, clinics: 3, patients: 25 },
        { name: "西城区", value: 20, clinics: 2, patients: 20 },
        { name: "朝阳区", value: 30, clinics: 4, patients: 30 },
        { name: "海淀区", value: 10, clinics: 3, patients: 10 },
        { name: "丰台区", value: 15, clinics: 2, patients: 15 },
        { name: "石景山区", value: 8, clinics: 1, patients: 8 },
      ],
      上海市: [
        { name: "黄浦区", value: 22, clinics: 3, patients: 22 },
        { name: "徐汇区", value: 18, clinics: 2, patients: 18 },
        { name: "长宁区", value: 16, clinics: 2, patients: 16 },
        { name: "静安区", value: 20, clinics: 3, patients: 20 },
        { name: "普陀区", value: 14, clinics: 2, patients: 14 },
      ],
      广东省: [
        { name: "广州市", value: 35, clinics: 5, patients: 35 },
        { name: "深圳市", value: 28, clinics: 4, patients: 28 },
        { name: "珠海市", value: 15, clinics: 2, patients: 15 },
        { name: "佛山市", value: 12, clinics: 2, patients: 12 },
        { name: "东莞市", value: 18, clinics: 3, patients: 18 },
        { name: "中山市", value: 10, clinics: 1, patients: 10 },
      ],
      江苏省: [
        { name: "南京市", value: 25, clinics: 4, patients: 25 },
        { name: "苏州市", value: 22, clinics: 3, patients: 22 },
        { name: "无锡市", value: 18, clinics: 2, patients: 18 },
        { name: "常州市", value: 12, clinics: 2, patients: 12 },
        { name: "镇江市", value: 8, clinics: 1, patients: 8 },
      ],
      浙江省: [
        { name: "杭州市", value: 28, clinics: 4, patients: 28 },
        { name: "宁波市", value: 20, clinics: 3, patients: 20 },
        { name: "温州市", value: 15, clinics: 2, patients: 15 },
        { name: "嘉兴市", value: 10, clinics: 1, patients: 10 },
        { name: "湖州市", value: 8, clinics: 1, patients: 8 },
      ],
      山东省: [
        { name: "济南市", value: 20, clinics: 3, patients: 20 },
        { name: "青岛市", value: 18, clinics: 2, patients: 18 },
        { name: "烟台市", value: 12, clinics: 2, patients: 12 },
        { name: "潍坊市", value: 10, clinics: 1, patients: 10 },
        { name: "临沂市", value: 8, clinics: 1, patients: 8 },
      ],
      四川省: [
        { name: "成都市", value: 25, clinics: 4, patients: 25 },
        { name: "绵阳市", value: 12, clinics: 2, patients: 12 },
        { name: "德阳市", value: 8, clinics: 1, patients: 8 },
        { name: "南充市", value: 6, clinics: 1, patients: 6 },
        { name: "宜宾市", value: 5, clinics: 1, patients: 5 },
      ],
      湖北省: [
        { name: "武汉市", value: 22, clinics: 3, patients: 22 },
        { name: "宜昌市", value: 10, clinics: 1, patients: 10 },
        { name: "襄阳市", value: 8, clinics: 1, patients: 8 },
        { name: "荆州市", value: 6, clinics: 1, patients: 6 },
        { name: "黄石市", value: 5, clinics: 1, patients: 5 },
      ],
      湖南省: [
        { name: "长沙市", value: 18, clinics: 3, patients: 18 },
        { name: "株洲市", value: 8, clinics: 1, patients: 8 },
        { name: "湘潭市", value: 6, clinics: 1, patients: 6 },
        { name: "衡阳市", value: 5, clinics: 1, patients: 5 },
        { name: "邵阳市", value: 4, clinics: 1, patients: 4 },
      ],
      河南省: [
        { name: "郑州市", value: 20, clinics: 3, patients: 20 },
        { name: "洛阳市", value: 10, clinics: 1, patients: 10 },
        { name: "开封市", value: 8, clinics: 1, patients: 8 },
        { name: "安阳市", value: 6, clinics: 1, patients: 6 },
        { name: "新乡市", value: 5, clinics: 1, patients: 5 },
      ],
    };
    return cityDataMap[provinceName] || [];
  };

  const handleBack = () => {
    if (currentLevel === "province" || currentLevel === "list") {
      setCurrentLevel("china");
      setCurrentName("中国");
      setCurrentData(chinaData);
      setCurrentProvinceCode("");
      updateStats(chinaData);
    }
  };

  const handleReset = () => {
    setCurrentLevel("china");
    setCurrentName("中国");
    setCurrentData(chinaData);
    setCurrentProvinceCode("");
    updateStats(chinaData);
  };

  return (
    <div>
      <div className="header">
        <h1>🏥 ENS 诊所地图</h1>
        <p>Empty Nose Syndrome Clinic & Patient Distribution Map</p>
        <div style={{ marginTop: "15px" }}>
          <Link href="/memorial" className="nav-link">
            🕯️ 患者纪念园
          </Link>
          <Link href="/forum" className="nav-link">
            💬 患者论坛
          </Link>
          <Link href="/health-log" className="nav-link">
            📊 健康日志
          </Link>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <button
                className="btn btn-secondary"
                onClick={handleBack}
                style={{
                  display: currentLevel === "china" ? "none" : "inline-block",
                }}
              >
                ← 返回全国
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                🔄 重置视图
              </button>
            </div>
            <div style={{ textAlign: "right" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>统计信息</h3>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <span>
                  👥 患者总数:{" "}
                  <strong style={{ color: "#42a5f5" }}>
                    {stats.totalPatients}
                  </strong>
                </span>
                <span>
                  🏥 诊所总数:{" "}
                  <strong style={{ color: "#42a5f5" }}>
                    {stats.totalClinics}
                  </strong>
                </span>
                <span>
                  📍 地区数量:{" "}
                  <strong style={{ color: "#42a5f5" }}>
                    {stats.totalProvinces}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div style={{ height: "600px", width: "100%" }}>
            <SimpleMap
              data={currentData}
              onMapClick={handleMapClick}
              title={`${currentName} - ENS 诊所分布`}
              mapType={currentLevel === "china" ? "china" : "province"}
              provinceCode={currentProvinceCode}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
