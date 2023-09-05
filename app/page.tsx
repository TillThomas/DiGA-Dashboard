'use client'


import Area from "@/components/area";
import ParentSize from '@visx/responsive/lib/components/ParentSize';

export default function Page() {
  return <><div className="h-screen"><h1 className="absolute right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">DiGA</h1><ParentSize>{({ width, height }) => <Area data={[]} width={width} height={height}></Area>}</ParentSize></div></>
}
