import React, { useState, useEffect } from 'react';
import { provinceApi } from '../services/api';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const MapPage: React.FC = () => {
  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<'china' | 'province'>('china');
  const [currentProvince, setCurrentProvince] = useState<string>('');
  const [geoJson, setGeoJson] = useState<any>(null);

  useEffect(() => {
    loadChinaGeoJson();
    loadChinaMap();
  }, []);

  const loadChinaGeoJson = async () => {
    try {
      const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
      const geoData = await response.json();
      setGeoJson(geoData);
      echarts.registerMap('china', geoData);
    } catch (error) {
      console.error('加载地图 GeoJSON 失败:', error);
    }
  };

  const loadChinaMap = async () => {
    try {
      const response = await provinceApi.getMapData();
      setMapData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('加载地图数据失败:', error);
      setLoading(false);
    }
  };

  const loadProvinceMap = async (adcode: string, name: string) => {
    try {
      // 这里需要根据省份加载城市数据
      // 暂时使用示例数据
      setCurrentLevel('province');
      setCurrentProvince(name);
      setLoading(false);
    } catch (error) {
      console.error('加载省份地图失败:', error);
    }
  };

  const handleMapClick = (params: any) => {
    if (currentLevel === 'china' && params.data?.adcode) {
      loadProvinceMap(params.data.adcode, params.name);
    }
  };

  const getOption = () => {
    if (currentLevel === 'china' && geoJson) {
      return {
        title: {
          text: 'ENS 诊所分布地图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params.data) {
              return `${params.name}<br/>患者: ${params.data.patients || 0} 人<br/>诊所: ${params.data.clinics || 0} 家`;
            }
            return params.name;
          },
        },
        visualMap: {
          min: 0,
          max: Math.max(...mapData.map(item => item.patients || item.value || 0), 1),
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#e0f2f1', '#00695c'],
          },
        },
        series: [
          {
            name: 'ENS 患者分布',
            type: 'map',
            map: 'china',
            data: mapData,
            emphasis: {
              itemStyle: {
                areaColor: '#42a5f5',
              },
            },
          },
        ],
      };
    }
    return {
      title: {
        text: '加载中...',
        left: 'center',
      },
    };
  };

  if (loading || !geoJson) {
    return <div>加载中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        {currentLevel === 'province' && (
          <button onClick={() => {
            setCurrentLevel('china');
            setCurrentProvince('');
            loadChinaMap();
          }}>
            返回全国
          </button>
        )}
      </div>
      <ReactECharts
        option={getOption()}
        style={{ height: '600px', width: '100%' }}
        onEvents={{
          click: handleMapClick,
        }}
      />
    </div>
  );
};

export default MapPage;

