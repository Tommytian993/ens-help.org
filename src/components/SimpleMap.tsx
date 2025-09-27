"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface SimpleMapProps {
  data: any[];
  onMapClick?: (params: any) => void;
  style?: React.CSSProperties;
  title?: string;
  mapType?: "china" | "province";
  provinceCode?: string;
}

export default function SimpleMap({
  data,
  onMapClick,
  style,
  title,
  mapType = "china",
  provinceCode,
}: SimpleMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [geoJson, setGeoJson] = useState<any>(null);

  // 加载地图数据
  useEffect(() => {
    const loadMapData = async () => {
      try {
        let url = "";
        let mapName = "";

        if (mapType === "china") {
          url = "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";
          mapName = "china";
        } else if (mapType === "province" && provinceCode) {
          url = `https://geo.datav.aliyun.com/areas_v3/bound/${provinceCode}_full.json`;
          mapName = provinceCode;
        } else {
          setGeoJson(null);
          return;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const geoData = await response.json();
        setGeoJson(geoData);

        // 注册地图
        echarts.registerMap(mapName, geoData);
      } catch (error) {
        console.error("地图数据加载失败:", error);
        // 如果地图加载失败，设置为 null，这样会显示柱状图
        setGeoJson(null);
      }
    };

    loadMapData();
  }, [mapType, provinceCode]);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表
    chartInstance.current = echarts.init(chartRef.current);
    setIsReady(true);

    // 响应式处理
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current && data && isReady) {
      try {
        let option: any;

        if (geoJson) {
          // 地图显示（全国或省份）
          const mapName = mapType === "china" ? "china" : provinceCode || "";
          option = {
            title: {
              text: title || "ENS 诊所分布地图",
              left: "center",
              textStyle: {
                color: "#333",
                fontSize: 18,
              },
            },
            tooltip: {
              trigger: "item",
              formatter: function (params: any) {
                if (params.data) {
                  return `${params.name}<br/>患者: ${
                    params.data.patients || params.data.value || 0
                  } 人<br/>诊所: ${params.data.clinics || 0} 家`;
                }
                return params.name;
              },
            },
            visualMap: {
              min: 0,
              max: Math.max(
                ...data.map((item) => item.patients || item.value || 0)
              ),
              left: "left",
              top: "bottom",
              text: ["高", "低"],
              calculable: true,
              inRange: {
                color: ["#e0f2f1", "#00695c"],
              },
            },
            series: [
              {
                name: mapType === "china" ? "ENS 患者分布" : "城市分布",
                type: "map",
                map: mapName,
                data: data,
                emphasis: {
                  itemStyle: {
                    areaColor: "#42a5f5",
                  },
                },
              },
            ],
          };
        } else {
          // 省份或备用柱状图显示
          option = {
            title: {
              text: title || "ENS 诊所分布",
              left: "center",
              textStyle: {
                color: "#333",
                fontSize: 18,
              },
            },
            tooltip: {
              trigger: "item",
              formatter: function (params: any) {
                if (params.data) {
                  return `${params.data.name}<br/>患者: ${
                    params.data.patients || params.data.value || 0
                  } 人<br/>诊所: ${params.data.clinics || 0} 家`;
                }
                return params.name;
              },
            },
            xAxis: {
              type: "category",
              data: data.map((item) => item.name),
              axisLabel: {
                rotate: 45,
                fontSize: 10,
              },
            },
            yAxis: {
              type: "value",
              name: "患者数量",
            },
            series: [
              {
                name: "患者数量",
                type: "bar",
                data: data.map((item) => ({
                  value: item.patients || item.value || 0,
                  name: item.name,
                  patients: item.patients || item.value || 0,
                  clinics: item.clinics || 0,
                })),
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#42a5f5" },
                    { offset: 1, color: "#1976d2" },
                  ]),
                },
                emphasis: {
                  itemStyle: {
                    color: "#ff6b6b",
                  },
                },
              },
            ],
          };
        }

        chartInstance.current.setOption(option, true);
      } catch (error) {
        console.error("图表设置错误:", error);
      }
    }
  }, [data, isReady, title, mapType, geoJson]);

  useEffect(() => {
    if (chartInstance.current && onMapClick && isReady) {
      chartInstance.current.off("click");
      chartInstance.current.on("click", onMapClick);
    }
  }, [onMapClick, isReady]);

  return <div ref={chartRef} style={style} />;
}
