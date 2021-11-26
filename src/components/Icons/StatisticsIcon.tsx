import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';

function StatisticsIcon(props: SvgProps) {
  return (
    <Svg width={34} height={32} fill="none" {...props}>
      <Path
        d="M0 28.87h33.938v3.071H0V28.87zm4.242-6.143h4.242v4.607H4.242v-4.607zm6.363-6.142h4.243v10.75h-4.243v-10.75zm6.364 4.607h4.242v6.142h-4.242v-6.142zm6.363-9.214h4.242v15.356h-4.242V11.978z"
        fill="#fff"
      />
      <Circle cx={4.991} cy={14.972} r={2.994} fill="#fff" />
      <Circle cx={12.976} cy={6.987} r={2.994} fill="#fff" />
      <Circle cx={18.965} cy={12.976} r={2.994} fill="#fff" />
      <Circle cx={24.954} cy={2.994} r={2.994} fill="#fff" />
      <Path
        stroke="#fff"
        d="M5.635 15.617l7.986-7.985M12.378 5.689l5.989 7.985M19.535 13.717l5.988-9.982"
      />
    </Svg>
  );
}

export default StatisticsIcon;
