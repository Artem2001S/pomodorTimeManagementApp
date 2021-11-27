import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CheckboxUncheckedIcon(props: SvgProps) {
  return (
    <Svg width={50} height={50} fill="none" {...props}>
      <Path
        d="M14.583 10.417a4.17 4.17 0 00-4.166 4.166v20.834a4.17 4.17 0 004.166 4.166h20.834a4.17 4.17 0 004.166-4.166V14.583a4.17 4.17 0 00-4.166-4.166H14.583zm0 25V14.583h20.834l.004 20.834H14.583z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CheckboxUncheckedIcon;
