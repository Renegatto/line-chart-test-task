
// Fill a chunk of 'linearGradient' to be filled with specified color
export const fillLinearGradientChunk =
  (primaryColor: string, highlightColor: string, size: number) =>
  (start: number, end: number) => <>
    <stop offset={start/size} stopColor={primaryColor} stopOpacity={1}/>
    <stop offset={start/size} stopColor={highlightColor} stopOpacity={1}/>
    <stop offset={end/size} stopColor={highlightColor} stopOpacity={1}/>
    <stop offset={end/size} stopColor={primaryColor} stopOpacity={1}/>
  </>