import React, { useState, useEffect } from 'react';
import { healthLogApi } from '../services/api';

const HealthLogPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await healthLogApi.getAll();
      setLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('加载健康日志失败:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 健康日志</h2>
      <div>
        {logs.length === 0 ? (
          <p>暂无健康日志记录</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h3>日期: {log.date}</h3>
              <p>严重程度: {log.severity}/10</p>
              <p>睡眠质量: {log.sleep_quality}/10</p>
              {log.medication && <p>用药情况: {log.medication}</p>}
              {log.notes && <p>备注: {log.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthLogPage;

