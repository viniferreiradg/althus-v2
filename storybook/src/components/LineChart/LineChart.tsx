import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import styles from './LineChart.module.css';

export interface LineChartSeries {
  name: string;
  data: number[];
}

export interface LineChartProps {
  title?: string;
  series: LineChartSeries[];
  categories: string[];
  height?: number;
  yFormatter?: (val: number) => string;
  colors?: string[];
}

function t(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function LineChart({
  title,
  series,
  categories,
  height = 280,
  yFormatter = (v) => String(v),
  colors,
}: LineChartProps) {
  const resolvedColors = colors ?? [t('--color-text-brand'), t('--color-text-link')];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, system-ui, sans-serif',
      animations: { enabled: true, speed: 400 },
    },
    theme: { mode: 'dark' },
    stroke: { curve: 'smooth', width: 2 },
    colors: resolvedColors,
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: t('--color-text-tertiary'), fontSize: '11px' } },
    },
    yaxis: {
      labels: {
        style: { colors: t('--color-text-tertiary'), fontSize: '11px' },
        formatter: yFormatter,
      },
    },
    grid: {
      borderColor: t('--color-border-subtle'),
      strokeDashArray: 4,
      padding: { left: 4, right: 4 },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: yFormatter },
    },
    legend: {
      labels: { colors: t('--color-text-tertiary') },
      fontSize: '12px',
    },
    markers: { size: 0 },
  };

  return (
    <div className={styles.root}>
      {title && <div className={styles.title}>{title}</div>}
      <ReactApexChart type="line" series={series} options={options} height={height} />
    </div>
  );
}
