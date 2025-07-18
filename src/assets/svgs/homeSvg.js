import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export const SVGHome = ({width="25px",height="25px"}) => (
  <Svg
    fill="#000000"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="home"
    data-name="Flat color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
  >
    <Rect
      id="secondary"
      x={8}
      y={13}
      width={8}
      height={9}
      style={{
        fill: "rgb(44, 169, 188)",
      }}
    />
    <Path
      id="primary"
      d="M21.71,12.71a1,1,0,0,1-1.42,0L20,12.42V20.3A1.77,1.77,0,0,1,18.17,22H16a1,1,0,0,1-1-1V15.1a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1V21a1,1,0,0,1-1,1H5.83A1.77,1.77,0,0,1,4,20.3V12.42l-.29.29a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42l9-9a1,1,0,0,1,1.42,0l9,9A1,1,0,0,1,21.71,12.71Z"
      style={{
        fill: "rgb(0, 0, 0)",
      }}
    />
  </Svg>
);
