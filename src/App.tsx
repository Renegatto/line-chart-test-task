import "./styles.css";
import { ReactElement } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { mean, stdDev } from '@mathigon/fermat'
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
  bounds: {
    min: number,
    max: number,
  },
} => {
  const xsZScore = zScoreFor(xs)
  const sorted = xs.sort((a,b) => a - b)
  return {
    zScore: xsZScore,
    isInRedZone: x => Math.abs(xsZScore.zScoreOf(x)) > 1,
    bounds: {
      min: sorted[0] || 0,
      max: sorted[sorted.length - 1] || 0,
    }
  }}

type HighlightXDeviation<Payload> = {
  gradient: ReactElement,
  lineStroke: string,
  dot: (props: {payload: Payload}) => ReactElement,
  activeDot: (props: {payload: Payload}) => ReactElement,
}
const highlightYDeviation = <Payload,>(
  deviationColor: string,
  mainColor: string,
  minY: number,
  maxY: number,
  minAllowed: number,
  maxAllowed: number,
  gradientId: string,
  getY: (payload: Payload) => number,
): HighlightXDeviation<Payload> => {
  console.log(
    minY,
    maxY,
    minAllowed,
    maxAllowed,
  )
  const fillChunk = fillLinearGradientChunk(
    deviationColor,
    mainColor,
    Math.abs(maxY - minY),
  )
  const normalize = (n: number) => Math.abs(n - minY)
  return {
    gradient:
      <linearGradient id={gradientId} x1={0} y1={1} x2={0} y2={0}>
        {fillChunk(normalize(minAllowed), normalize(maxAllowed))}
      </linearGradient>,
    lineStroke: `url(#${gradientId})`,
    dot: (props: any & {payload: Payload}) => {
      // exposed type does not reflect actual props being passed
      // into 'Dot' in 'Line.renderDots'
      const y = getY(props.payload)
      const isDeviation = y > maxAllowed || y < minAllowed
      return <Dot
        {...props}
        fill={isDeviation ? "red" : "white"}
        stroke={isDeviation ? "red" : mainColor}
      />
    },
    activeDot: (props: any & {payload: Payload}) => {
      const y = getY(props.payload)
      const isDeviation = y > maxAllowed || y < minAllowed
      return <Dot
        {...props}
        fill={isDeviation ? "red" : mainColor}
      />
    },
  }
}

export default function App() {
  const pvsRedZone = redZoneFor(data.map(x => x.pv))
  const uvsRedZone = redZoneFor(data.map(x => x.uv))

  const pvZIndexDeviationHighlight = highlightYDeviation<typeof data[number]>(
    'red',
    '#8884d8',
    pvsRedZone.bounds.min,
    pvsRedZone.bounds.max,
    pvsRedZone.zScore.bounds.lower,
    pvsRedZone.zScore.bounds.upper,
    'zScoreLinePv',
    x => x.pv,
  )
  const uvZIndexDeviationHighlight = highlightYDeviation<typeof data[number]>(
    'red',
    '#82ca9d',
    uvsRedZone.bounds.min,
    uvsRedZone.bounds.max,
    uvsRedZone.zScore.bounds.lower,
    uvsRedZone.zScore.bounds.upper,
    'zScoreLineUv',
    x => x.uv,
  )
  return (<>
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <defs>
          {pvZIndexDeviationHighlight.gradient}
          {uvZIndexDeviationHighlight.gradient}
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke={pvZIndexDeviationHighlight.lineStroke}
          dot={pvZIndexDeviationHighlight.dot}
          activeDot={(props: any) =>
            pvZIndexDeviationHighlight.activeDot(props)}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke={uvZIndexDeviationHighlight.lineStroke}
          dot={uvZIndexDeviationHighlight.dot}
          activeDot={(props: any) =>
            uvZIndexDeviationHighlight.activeDot(props)}
        />
      </LineChart>
    </ResponsiveContainer>
  </>);
}
