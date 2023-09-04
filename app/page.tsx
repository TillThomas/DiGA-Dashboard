'use client'


import Area from "@/components/area";
import ParentSize from '@visx/responsive/lib/components/ParentSize';

export default function Page() {
  return <><h1>DiGA</h1><div><ParentSize>{({ width, height }) => <Area width={width} height={1000}></Area>}</ParentSize></div></>
}
