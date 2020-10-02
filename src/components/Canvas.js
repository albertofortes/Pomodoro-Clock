import React from 'react';

const Canvas = (props) => {
  const radius = (props.circleSize - 10) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * props.circlePercentage / 100;

  return (
    <svg id="circle-progress" className="circle" width={props.circleSize} height={props.circleSize}>
      <circle className="background" cx={props.circleSize / 2} cy={props.circleSize / 2} r={radius} strokeWidth="10px" />
      <circle className="progress" cx={props.circleSize / 2} cy={props.circleSize / 2} r={radius} strokeWidth="10px" 
        transform={`rotate(-90 ${props.circleSize / 2} ${props.circleSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }} />
    </svg>
  )
}

export default Canvas;
