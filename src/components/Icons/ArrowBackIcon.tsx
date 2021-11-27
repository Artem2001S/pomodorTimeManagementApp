import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function ArrowBackIcon(props: SvgProps) {
  return (
    <Svg width={62} height={62} fill="none" {...props}>
      <Path
        d="M28.417 12.917L10.333 31l18.084 18.083M10.333 31h41.334"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowBackIcon;
