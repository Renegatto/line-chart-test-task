import "./styles.css";
import React, { FC, ReactElement } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Area,
  AreaChart,
  ComposedChart,
  Dot,
} from "recharts";
import {mean, stdDev} from '@mathigon/fermat'
import { fillLinearGradientChunk } from "./utils/FillGradientChunk";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const zScore = (mean: number, stdDev: number) => (x: number) => (x - mean) / stdDev

type CalculatedZScore = {
  zScoreOf(x: number): number,
  bounds: ZScoreBounds,
}
type ZScoreBounds = {
  upper: number, // any x ABOVE this value will have |z-score| > 1
  lower: number, // any x BELOW this value will have |z-score| > 1
}
const zScoreFor = (
  xs: number[],
): CalculatedZScore => {
  const xsStdDev = stdDev(xs)
  const xsMean = mean(xs)
  const bound1 = xsStdDev + xsMean
  const bound2 = xsMean - xsStdDev
  return {
    zScoreOf: zScore(xsMean, xsStdDev),
    bounds: {
      upper: Math.max(bound1,bound2),
      lower: Math.min(bound1,bound2),
    }
  }
}

const redZoneFor = (xs: number[]): {
  zScore: CalculatedZScore,
  isInRedZone: (x: number) => boolean,
  xBounds: {
    min: number,
    max: number,
  },
} => {
  const xsZScore = zScoreFor(xs)
  const sorted = xs.sort((a,b) => b - a)
  return {
    zScore: xsZScore,
    isInRedZone: x => Math.abs(xsZScore.zScoreOf(x)) > 1,
    xBounds: {
      min: sorted[0] || 0,
      max: sorted[sorted.length - 1] || 0,
    }
  }}

export default function App() {
  const pvsRedZone = redZoneFor(data.map(x => x.pv))

  const highlightZScoreZone = fillLinearGradientChunk(
    'red',
    '#82ca9d',
    Math.abs(pvsRedZone.xBounds.max - pvsRedZone.xBounds.min),
  )

  return (<>
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <defs>
          <linearGradient id="zScoreLinePv" x1={0} y1={0} x2={0} y2={1}>
            {
              highlightZScoreZone(
                pvsRedZone.zScore.bounds.lower,
                pvsRedZone.zScore.bounds.upper,
              )
            }
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="url(#zScoreLinePv)"
          dot={(props: unknown & {payload: any}) => {
            // exposed type does not reflect actual props being passed
            // into 'Dot' in 'Line.renderDots'
            const isInRedZone = pvsRedZone.isInRedZone(props.payload.pv)
            return <Dot
              {...props}
              fill={isInRedZone ? "red" : "white"}
              stroke={isInRedZone ? "red" : "#82ca9d"}
            />
          }}
          activeDot={{ r: 8, fill: "blue" }}
        >
        </Line>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d"></Line>
      </LineChart>
    </ResponsiveContainer>
  </>);
}
