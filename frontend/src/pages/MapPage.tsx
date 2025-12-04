import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/**
 * 地图页面组件
 *
 * 功能：
 * 1. 显示中国地图（使用 Leaflet + OpenStreetMap）
 * 2. 使用阿里云免费API获取省份边界数据
 * 3. 两种模式：
 *    - 简单模式（左边按钮）：只显示阿里云地图边界
 *    - 完整模式（右边按钮）：显示边界 + 我们的统计数据叠加
 */
const MapPage = () => {
  // 地图中心点：中国中心位置
  const center: [number, number] = [35.0, 105.0];
  // 初始缩放级别：显示整个中国
  const zoom = 5;

  // 地图显示模式：'simple' = 简单模式（只用阿里云），'full' = 完整模式（叠加我们的数据）
  const [mapMode, setMapMode] = useState<"simple" | "full">("simple");

  // 存储省份边界数据（GeoJSON格式）
  const [provincesData, setProvincesData] = useState<any>(null);

  // 页面加载时，获取全国省份边界数据
  useEffect(() => {
    // 阿里云数据可视化API：获取全国省份边界数据
    // adcode=100000 表示全国
    fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
      .then((response) => response.json())
      .then((data) => {
        // data.features 包含所有省份的边界数据
        setProvincesData(data);
      })
      .catch((error) => {
        console.error("获取地图数据失败:", error);
      });
  }, []);

  // 简单模式：只显示边界，不叠加数据
  const styleSimple = (feature: any) => {
    return {
      fillColor: "#667eea", // 填充颜色
      fillOpacity: 0.2, // 填充透明度（更透明）
      color: "#667eea", // 边界颜色
      weight: 1, // 边界宽度
      opacity: 0.6, // 边界透明度
    };
  };

  // 完整模式：显示边界 + 统计数据（后续会根据数据着色）
  const styleFull = (feature: any) => {
    return {
      fillColor: "#667eea", // 填充颜色（后续会根据患者数/诊所数改变）
      fillOpacity: 0.4, // 填充透明度
      color: "#667eea", // 边界颜色
      weight: 2, // 边界宽度
      opacity: 0.8, // 边界透明度
    };
  };

  // 鼠标悬停时高亮显示
  const onEachProvince = (feature: any, layer: L.Layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: mapMode === "simple" ? 0.4 : 0.7, // 悬停时更不透明
          weight: mapMode === "simple" ? 2 : 3, // 边界更粗
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: mapMode === "simple" ? 0.2 : 0.4, // 恢复原样
          weight: mapMode === "simple" ? 1 : 2,
        });
      },
    });

    // 点击时显示省份名称
    const provinceName = feature.properties.name || "未知省份";
    if (mapMode === "full") {
      // 完整模式：显示省份名称 + 统计数据（后续添加）
      layer.bindPopup(`${provinceName}<br/>统计数据：待添加`);
    } else {
      // 简单模式：只显示省份名称
      layer.bindPopup(provinceName);
    }
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* 标题和按钮 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>🗺️ 诊所分布地图</h2>

        {/* 模式切换按钮 */}
        <div style={{ display: "flex", gap: "10px" }}>
          {/* 左边按钮：简单模式（只用阿里云） */}
          <button
            onClick={() => setMapMode("simple")}
            style={{
              padding: "10px 20px",
              backgroundColor: mapMode === "simple" ? "#667eea" : "#e2e8f0",
              color: mapMode === "simple" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            简单地图（阿里云）
          </button>

          {/* 右边按钮：完整模式（叠加我们的数据） */}
          <button
            onClick={() => setMapMode("full")}
            style={{
              padding: "10px 20px",
              backgroundColor: mapMode === "full" ? "#667eea" : "#e2e8f0",
              color: mapMode === "full" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            完整地图（叠加数据）
          </button>
        </div>
      </div>

      {/* Leaflet 地图容器 */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "600px", width: "100%", borderRadius: "8px" }}
      >
        {/* 地图瓦片图层：根据模式选择不同的地图服务 */}
        {mapMode === "simple" ? (
          // 简单模式：使用高德地图（阿里云）瓦片 - 确保边界准确
          <TileLayer
            attribution='&copy; <a href="https://www.amap.com">高德地图</a>'
            url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
            subdomains={["1", "2", "3", "4"]}
          />
        ) : (
          // 完整模式：使用 OpenStreetMap（免费）
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {/* 显示省份边界（如果数据已加载） */}
        {provincesData && (
          <GeoJSON
            data={provincesData}
            style={mapMode === "simple" ? styleSimple : styleFull}
            onEachFeature={onEachProvince}
          />
        )}
      </MapContainer>

      <p style={{ marginTop: "20px", color: "#666" }}>
        {mapMode === "simple"
          ? "提示：简单模式 - 只显示阿里云地图边界数据"
          : "提示：完整模式 - 显示边界 + 我们的统计数据（待实现）"}
      </p>
    </div>
  );
};

export default MapPage;
