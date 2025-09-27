"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface EChartsComponentProps {
  option: any;
  onChartClick?: (params: any) => void;
  style?: React.CSSProperties;
}

export default function EChartsComponent({
  option,
  onChartClick,
  style,
}: EChartsComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isReady, setIsReady] = useState(false);

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
    if (chartInstance.current && option && isReady) {
      try {
        chartInstance.current.setOption(option, true);
      } catch (error) {
        console.error("ECharts setOption error:", error);
      }
    }
  }, [option, isReady]);

  useEffect(() => {
    if (chartInstance.current && onChartClick && isReady) {
      chartInstance.current.off("click");
      chartInstance.current.on("click", onChartClick);
    }
  }, [onChartClick, isReady]);

  return <div ref={chartRef} style={style} />;
}
