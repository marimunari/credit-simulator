'use client';

// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// external libs
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// types
type LineChartData = {
  /* Month label */
  month: string;

  /* Interest value for the month */
  interest: number;
};

type LineChartComponentProps = {
  /* Array of data points for the chart */
  data: LineChartData[];
};

type VariantClass = 'bgGrid' | 'axis' | 'tooltipBg' | 'tooltipBorder' | 'line';

type ThemeVariantClasses = 'light' | 'dark';

export default function LineChartComponent({ data }: LineChartComponentProps) {
  const { darkMode } = useTheme();

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      bgGrid: '#F0F0F0',
      axis: '#A0A0A0',
      tooltipBg: 'white',
      tooltipBorder: '#DDDDDD',
      line: '#FBBF24'
    },
    dark: {
      bgGrid: '#3F3F3F',
      axis: '#A0A0A0',
      tooltipBg: '#2A2A2A',
      tooltipBorder: '#444444',
      line: '#FBBF24'
    }
  };

  return (
    <section aria-label="Gráfico de linhas da evolução dos juros" data-testid="line-chart-section">
      <h3 className="text-lg font-semibold mb-4 text-center" data-testid="line-chart-title">
        Evolução dos Juros
      </h3>

      <div
        role="img"
        aria-label="Gráfico de linhas mostrando a evolução dos juros por mês"
        data-testid="line-chart-container"
      >
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? variantClasses.dark.bgGrid : variantClasses.light.bgGrid}
            />

            <XAxis
              dataKey="month"
              stroke={darkMode ? variantClasses.dark.axis : variantClasses.light.axis}
              tickLine={false}
              axisLine={false}
              style={{
                fontSize: 12
              }}
            />

            <YAxis
              stroke={darkMode ? variantClasses.dark.axis : variantClasses.light.axis}
              tickLine={false}
              axisLine={false}
              style={{
                fontSize: 12
              }}
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

            <Line
              type="monotone"
              dataKey="interest"
              stroke={darkMode ? variantClasses.dark.line : variantClasses.light.line}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
