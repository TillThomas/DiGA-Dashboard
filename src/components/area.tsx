import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from '@visx/vendor/d3-array';
import { timeFormat } from '@visx/vendor/d3-time-format';

const stock = appleStock.slice(800);
export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export type AreaProps = {
  data: number[];
  width: number;
  height: number;
  margin?: AreaMargin;
};

export type AreaMargin = { top: number; right: number; bottom: number; left: number };

export default function Area(props: AreaProps) {
  let data, width, height, margin: AreaMargin;
  ({data,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
  } = props);
  if (width < 10) return null;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [innerWidth, margin.left],
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
        nice: true,
      }),
    [margin.top, innerHeight],
  );

  // // tooltip handler
  // const handleTooltip = useCallback(
  //   (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
  //     const { x } = localPoint(event) || { x: 0 };
  //     const x0 = dateScale.invert(x);
  //     const index = bisectDate(stock, x0, 1);
  //     const d0 = stock[index - 1];
  //     const d1 = stock[index];
  //     let d = d0;
  //     if (d1 && getDate(d1)) {
  //       d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
  //     }
  //     showTooltip({
  //       tooltipData: d,
  //       tooltipLeft: x,
  //       tooltipTop: stockValueScale(getStockValue(d)),
  //     });
  //   },
  //   [showTooltip, stockValueScale, dateScale],
  // );

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={14}
        />
        <LinearGradient id="area-background-gradient" from={background} to={background2} />
        <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
        <GridRows
          left={margin.left}
          scale={stockValueScale}
          width={innerWidth}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0}
          pointerEvents="none"
        />
        <GridColumns
          top={margin.top}
          scale={dateScale}
          height={innerHeight}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0.2}
          pointerEvents="none"
        />
        <AreaClosed<AppleStock>
          data={stock}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => stockValueScale(getStockValue(d)) ?? 0}
          yScale={stockValueScale}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
        />
      </svg>
    </div>
  );
}

// export withTooltip<AreaProps>(
//   ({
//     width,
//     height,
//     margin = { top: 0, right: 0, bottom: 0, left: 0 },
//   }: AreaProps) => {
 
//   },
// );