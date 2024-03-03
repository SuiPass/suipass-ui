import SpotLight1 from '@/assets/spot_light_1.png';
import SpotLight2 from '@/assets/spot_light_2.png';
import SpotLight3 from '@/assets/spot_light_3.png';
import SpotLight4 from '@/assets/spot_light_4.png';
import SpotLight5 from '@/assets/spot_light_5.png';
import SpotLight6 from '@/assets/spot_light_6.png';

export function SpotLightBg() {
  return (
    <div className="absolute w-full h-full overflow-hidden">
      <img
        src={SpotLight1}
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
        className="animate-wiggle-left"
      />
      <img
        src={SpotLight2}
        style={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
        className="animate-wiggle-right"
      />
      <img
        src={SpotLight3}
        style={{
          position: 'absolute',
          top: 1200,
          left: 0
        }}
        className="animate-wiggle-left"
      />
      <img
        src={SpotLight4}
        style={{
          position: 'absolute',
          top: 1200,
          right: 0
        }}
        className="animate-wiggle-right"
      />
      <img
        src={SpotLight5}
        style={{
          position: 'absolute',
          top: 2400,
          left: 0
        }}
        className="animate-wiggle-left"
      />
      <img
        src={SpotLight6}
        style={{
          position: 'absolute',
          top: 2400,
          right: 0
        }}
        className="animate-wiggle-right"
      />
    </div>
  );
}
