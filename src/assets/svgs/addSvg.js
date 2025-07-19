import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SVGAdd = ({ width, height }) => (
	<Svg
		width={width}
		height={height}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			clipRule="evenodd"
			d="M15 1H1V15H15V1ZM7 4H9V7H12V9H9V12H7V9H4V7H7V4Z"
			fill="#030708"
			fillRule="evenodd"
		/>
	</Svg>
);
