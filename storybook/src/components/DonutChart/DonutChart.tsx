import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import styles from './DonutChart.module.css';

export interface DonutChartProps {
  title?: string;
  series: number[];
  labels: string[];
  colors?: string[];
  height?: number;
  totalLabel?: string;
}

function t(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function DonutChart({
  title,
  series,
  labels,
  colors,
  height = 280,
  totalLabel = 'Total',
}: DonutChartProps) {
  const resolvedColors = colors ?? [
    t('--color-status-success-fg'),
    t('--color-status-disabled-fg'),
    t('--color-status-warning-fg'),
    t('--color-status-info-fg'),
  ];

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: 'Inter, system-ui, sans-serif',
      animations: { enabled: true, speed: 400 },
    },
    theme: { mode: 'dark' },
    labels,
    colors: resolvedColors,
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: t('--color-text-tertiary') },
      fontSize: '12px',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: {
              show: true,
              label: totalLabel,
              color: t('--color-text-tertiary'),
              fontSize: '12px',
              fontWeight: 500,
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString(),
            },
            value: {
              color: t('--color-text-primary'),
              fontSize: '22px',
              fontWeight: 600,
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    tooltip: { theme: 'dark' },
  };

  return (
    <div className={styles.root}>
      {title && <div className={styles.title}>{title}</div>}
      <ReactApexChart type="donut" series={series} options={options} height={height} />
    </div>
  );
}
