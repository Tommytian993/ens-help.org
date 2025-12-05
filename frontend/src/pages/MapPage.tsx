import { useEffect, useRef, useState } from "react";

/**
 * 地图页面组件
 *
 * 功能：
 * 1. 使用高德地图（免费，个人开发者有免费额度）
 * 2. 使用阿里云数据可视化API获取省份边界数据
 * 3. 在高德地图上叠加显示省份边界
 */

// 声明全局的 AMap 类型（高德地图 API）
declare global {
  interface Window {
    AMap: any;
    initAMap: () => void;
  }
}

const MapPage = () => {
  // 地图容器的引用
  const mapContainer = useRef<HTMLDivElement>(null);
  // 地图实例的引用
  const mapInstance = useRef<any>(null);
  // 加载状态
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 初始化地图函数
    const initMap = () => {
      if (!mapContainer.current) {
        setError("地图容器不存在");
        setLoading(false);
        return;
      }

      if (!window.AMap) {
        setError("高德地图 API 未加载");
        setLoading(false);
        return;
      }

      try {
        // 创建地图实例
        // 中心点：中国中心位置
        // 缩放级别：5（显示整个中国）
        mapInstance.current = new window.AMap.Map(mapContainer.current, {
          zoom: 5,
          center: [105.0, 35.0], // 经度，纬度
          viewMode: "3D", // 3D视图
        });

        console.log("地图实例创建成功");
        setLoading(false);

        // 加载省份边界数据
        loadProvinceBoundaries();
      } catch (error: any) {
        console.error("创建地图实例失败:", error);
        setError(`创建地图失败: ${error.message}`);
        setLoading(false);
      }
    };

    // 加载省份边界数据
    const loadProvinceBoundaries = () => {
      if (!mapInstance.current) return;

      // 阿里云数据可视化API：获取全国省份边界数据
      fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
        .then((response) => response.json())
        .then((data) => {
          console.log("获取边界数据成功", data);
          if (data.features && Array.isArray(data.features)) {
            data.features.forEach((feature: any) => {
              if (feature.geometry && feature.geometry.coordinates) {
                // 转换坐标格式
                const path = convertCoordinates(feature.geometry.coordinates);
                if (path.length > 0) {
                  // 创建多边形覆盖物显示省份边界
                  const polygon = new window.AMap.Polygon({
                    path: path,
                    fillColor: "#667eea",
                    fillOpacity: 0.2,
                    strokeColor: "#667eea",
                    strokeWeight: 1,
                    strokeOpacity: 0.6,
                  });

                  // 添加鼠标事件
                  polygon.on("mouseover", () => {
                    polygon.setOptions({
                      fillOpacity: 0.4,
                      strokeWeight: 2,
                    });
                  });

                  polygon.on("mouseout", () => {
                    polygon.setOptions({
                      fillOpacity: 0.2,
                      strokeWeight: 1,
                    });
                  });

                  // 点击显示省份名称
                  polygon.on("click", () => {
                    const provinceName = feature.properties?.name || "未知省份";
                    alert(provinceName);
                  });

                  // 添加到地图
                  mapInstance.current.add(polygon);
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("获取地图数据失败:", error);
        });
    };

    // 转换坐标格式（GeoJSON 格式转换为高德地图格式）
    const convertCoordinates = (coordinates: any): number[][] => {
      // GeoJSON 的坐标格式是 [经度, 纬度]
      // 高德地图需要的是 [[经度, 纬度], [经度, 纬度], ...]
      if (Array.isArray(coordinates[0][0][0])) {
        // MultiPolygon，取第一个 Polygon
        return coordinates[0][0].map((coord: number[]) => [coord[0], coord[1]]);
      } else if (Array.isArray(coordinates[0][0])) {
        // Polygon
        return coordinates[0].map((coord: number[]) => [coord[0], coord[1]]);
      }
      return [];
    };

    // 检查高德地图 API 是否已加载
    if (!window.AMap) {
      console.log("开始加载高德地图 API...");

      // 定义全局回调函数（必须在加载脚本之前定义）
      (window as any).initAMap = () => {
        console.log("高德地图 API 回调函数执行");
        if (window.AMap) {
          console.log("高德地图 API 加载成功，开始初始化地图");
          setTimeout(() => {
            initMap();
          }, 100);
        } else {
          console.error("回调执行但 AMap 未定义");
          setError("高德地图 API 加载异常");
          setLoading(false);
        }
      };

      // 动态加载高德地图 JavaScript API
      // 注意：高德地图免费，但建议申请 API Key（个人开发者免费）
      // 这里先不使用 Key 测试，如果需要可以添加 &key=YOUR_API_KEY
      const script = document.createElement("script");
      script.src = "https://webapi.amap.com/maps?v=2.0&callback=initAMap";
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        console.error("高德地图 API 脚本加载失败");
        setError("高德地图 API 加载失败，请检查网络连接");
        setLoading(false);
      };

      script.onload = () => {
        console.log("高德地图脚本标签加载完成");
        // 如果回调没有自动执行，手动检查
        setTimeout(() => {
          if (!window.AMap) {
            console.warn("脚本加载完成但 AMap 未定义，可能回调未执行");
          }
        }, 1000);
      };

      // 添加超时检测
      const timeoutId = setTimeout(() => {
        if (!window.AMap) {
          console.error("高德地图 API 加载超时");
          setError(
            "高德地图 API 加载超时，请检查网络或刷新页面。可能需要 API Key"
          );
          setLoading(false);
        }
      }, 10000); // 10秒超时

      document.head.appendChild(script);
      console.log("已添加高德地图脚本标签，URL:", script.src);

      // 清理函数
      return () => {
        clearTimeout(timeoutId);
        if (mapInstance.current) {
          mapInstance.current.destroy();
        }
        // 清理全局回调
        if ((window as any).initAMap) {
          delete (window as any).initAMap;
        }
      };
    } else {
      // 如果已经加载，直接初始化地图
      console.log("高德地图 API 已存在，直接初始化");
      initMap();

      // 清理函数
      return () => {
        if (mapInstance.current) {
          mapInstance.current.destroy();
        }
      };
    }
  }, []);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <h2 style={{ marginBottom: "20px" }}>🗺️ 诊所分布地图</h2>

      {/* 地图容器 */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              zIndex: 1000,
            }}
          >
            正在加载地图...
          </div>
        )}
        {error && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#c33",
              zIndex: 1000,
              textAlign: "center",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px", color: "#666" }}>
        <p>提示：使用高德地图（免费，个人开发者有免费额度）</p>
        <p style={{ fontSize: "14px", color: "#999" }}>
          高德地图 JavaScript API 对个人开发者免费，建议申请 API Key
          以获得更好的服务
          <br />
          申请地址：
          <a
            href="https://console.amap.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://console.amap.com/
          </a>
        </p>
      </div>
    </div>
  );
};

export default MapPage;
