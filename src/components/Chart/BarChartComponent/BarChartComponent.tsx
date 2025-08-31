'use client';

// system
import React from 'react';

// external libs
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type BarChartData = {
  /* Month label for the X axis */
  month: string;

  /* Payment value for the Y axis */
  payment: number;
};

type BarChartComponentProps = {
  /* Array of data to plot in the chart */
  data: BarChartData[];
};

type VariantClass = 'bgGrid' | 'axis' | 'tooltipBg' | 'tooltipBorder' | 'bar' | 'text';

type ThemeVariantClasses = 'light' | 'dark';

export default function BarChartComponent({ data }: BarChartComponentProps) {
  const { darkMode } = useTheme();

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      bgGrid: '#F0F0F0',
      axis: '#A0A0A0',
      tooltipBg: '#FFFFFF',
      tooltipBorder: '#DDDDDD',
      bar: '#4F9E00',
      text: '#FFFFFF'
    },
    dark: {
      bgGrid: '#3F3F3F',
      axis: '#A0A0A0',
      tooltipBg: '#2A2A2A',
      tooltipBorder: '#444444',
      bar: '#4F9E00',
      text: '#333333'
    }
  };

  return (
    <section
      aria-label="Gráfico de barras de evolução de pagamento"
      data-testid="bar-chart-section"
    >
      <h3 className="text-lg font-semibold mb-4 text-center" data-testid="bar-chart-title">
        Evolução de Pagamento
      </h3>

      <div
        role="img"
        aria-label="Bar chart showing monthly payments"
        data-testid="bar-chart-container"
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? variantClasses.dark.bgGrid : variantClasses.light.bgGrid}
            />

            <XAxis
              dataKey="month"
              stroke={darkMode ? variantClasses.dark.axis : variantClasses.light.axis}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: 12 }}
            />

            <YAxis
              stroke={darkMode ? variantClasses.dark.axis : variantClasses.light.axis}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: 12 }}
              tickFormatter={(value: number) => `R$${value.toLocaleString()}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode
                  ? variantClasses.dark.tooltipBg
                  : variantClasses.light.tooltipBg,
                borderRadius: 6,
                borderColor: darkMode
                  ? variantClasses.dark.tooltipBorder
                  : variantClasses.light.tooltipBorder,
                boxShadow: '0 0 8px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => `R$ ${value.toLocaleString()}`}
            />

            <Bar
              dataKey="payment"
              fill={darkMode ? variantClasses.dark.bar : variantClasses.light.bar}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
