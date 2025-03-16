import { mean, stdDev } from '@mathigon/fermat'

const zScore = (mean: number, stdDev: number) => (x: number) => (x - mean) / stdDev

export type CalculatedZScore = {
  zScoreOf(x: number): number,
  bounds: ZScoreBounds,
}
export type ZScoreBounds = {
  upper: number, // any x ABOVE this value will have |z-score| > 1
  lower: number, // any x BELOW this value will have |z-score| > 1
}
export const zScoreFor = (
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