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
 * 3. 后续会叠加显示诊所和患者统计数据
 */
const MapPage = () => {
  // 地图中心点：中国中心位置
  const center: [number, number] = [35.0, 105.0];
  // 初始缩放级别：显示整个中国
  const zoom = 5;

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

  // 给每个省份区域设置样式
  const styleProvince = (feature: any) => {
    return {
      fillColor: "#667eea", // 填充颜色
      fillOpacity: 0.3, // 填充透明度
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
          fillOpacity: 0.6, // 悬停时更不透明
          weight: 3, // 边界更粗
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 0.3, // 恢复原样
          weight: 2,
        });
      },
    });

    // 点击时显示省份名称
    layer.bindPopup(feature.properties.name || "未知省份");
  };

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <h2 style={{ marginBottom: "20px" }}>🗺️ 诊所分布地图</h2>

      {/* Leaflet 地图容器 */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "600px", width: "100%", borderRadius: "8px" }}
      >
        {/* 地图瓦片图层：使用 OpenStreetMap（免费） */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 显示省份边界（如果数据已加载） */}
        {provincesData && (
          <GeoJSON
            data={provincesData}
            style={styleProvince}
            onEachFeature={onEachProvince}
          />
        )}
      </MapContainer>

      <p style={{ marginTop: "20px", color: "#666" }}>
        提示：使用阿里云免费API获取省份边界数据，后续会叠加显示诊所和患者统计
      </p>
    </div>
  );
};

export default MapPage;
