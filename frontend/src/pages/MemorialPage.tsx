import React, { useState, useEffect } from 'react';
import { memorialApi } from '../services/api';

const MemorialPage: React.FC = () => {
  const [memorials, setMemorials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMemorials();
  }, []);

  const loadMemorials = async () => {
    try {
      const response = await memorialApi.getAll();
      setMemorials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('加载纪念园数据失败:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>🕯️ 患者纪念园</h2>
      <div>
        {memorials.length === 0 ? (
          <p>暂无纪念记录</p>
        ) : (
          memorials.map((memorial) => (
            <div key={memorial.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h3>{memorial.name}</h3>
              <p>逝世日期: {memorial.death_date}</p>
              {memorial.city_name && <p>所在城市: {memorial.city_name}</p>}
              {memorial.message && <p>{memorial.message}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemorialPage;

