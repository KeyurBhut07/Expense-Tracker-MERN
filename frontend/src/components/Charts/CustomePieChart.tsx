import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Customized,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

interface PieChartData {
  name: string;
  amount: number;
}

interface CustomePieChartProps {
  data: PieChartData[];
  label?: string;
  totalAmount?: number | string;
  colors: string[];
  showTextAnchor?: boolean;
}

const CustomePieChart: React.FC<CustomePieChartProps> = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry: any, index: any) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            ></Cell>
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <Customized
            component={() => (
              <>
                <text
                  x="50%"
                  y="50%"
                  dy={-25}
                  textAnchor="middle"
                  fill="#666"
                  fontSize="14px"
                >
                  {label}
                </text>
                <text
                  x="50%"
                  y="50%"
                  dy={8}
                  textAnchor="middle"
                  fill="#333"
                  fontSize="24px"
                  fontWeight="semi-bold"
                >
                  {totalAmount}
                </text>
              </>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomePieChart;
