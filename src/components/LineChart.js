import React from 'react';
import { CartesianGrid, LineChart, Line, Legend, XAxis, YAxis, Tooltip } from 'recharts';

export default ({results}) => <LineChart
  width={800}
  height={400}
  data={results}
  className=""
>
  <CartesianGrid stroke="#ccc" />
  <XAxis
    padding= {{left: 20, right: 20}}
    interval="preserveStartEnd"
  />
  <YAxis
    interval="preserveStartEnd"
    padding= {{top: 20, bottom: 20}}
  />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line
    isAnimationActive={false}
    animationDuration={0}
    type="monotone"
    dataKey="score"
    stroke="#8884d8"
    activeDot
    label={(v) => {
      // return results[v.index].score;
      return "";
    }}
    />
  <Line
    isAnimationActive={false}
    animationDuration={0}
    type="monotone"
    dataKey="type"
    stroke="#88ffd8"
    activeDot
    label={(v) => {
      // return results[v.index].score;
      return "";
    }}
    />

</LineChart>;

