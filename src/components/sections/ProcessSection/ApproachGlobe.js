'use client';

import { lazy, Suspense } from 'react';

import classes from './ApproachGlobe.module.scss';

const World = lazy(() =>
  import('@/components/ui/globe').then((mod) => ({ default: mod.World })),
);

const globeConfig = {
  pointSize: 4,
  globeColor: '#002d62',
  showAtmosphere: true,
  atmosphereColor: '#fdb813',
  atmosphereAltitude: 0.12,
  emissive: '#001d40',
  emissiveIntensity: 0.18,
  shininess: 0.95,
  polygonColor: 'rgba(255,255,255,0.55)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffd56a',
  pointLight: '#ffffff',
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.65,
};

const colors = ['#fdb813', '#ffd56a', '#0a3d7a', '#fdb813'];

const sampleArcs = [
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 19.076,
    endLng: 72.8777,
    arcAlt: 0.15,
    color: colors[0],
  },
  {
    order: 1,
    startLat: 12.9716,
    startLng: 77.5946,
    endLat: 13.0827,
    endLng: 80.2707,
    arcAlt: 0.12,
    color: colors[1],
  },
  {
    order: 2,
    startLat: 22.5726,
    startLng: 88.3639,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.2,
    color: colors[2],
  },
  {
    order: 2,
    startLat: 18.5204,
    startLng: 73.8567,
    endLat: 23.0225,
    endLng: 72.5714,
    arcAlt: 0.1,
    color: colors[0],
  },
  {
    order: 3,
    startLat: 26.9124,
    startLng: 75.7873,
    endLat: 17.385,
    endLng: 78.4867,
    arcAlt: 0.18,
    color: colors[1],
  },
  {
    order: 3,
    startLat: 30.7333,
    startLng: 76.7794,
    endLat: 19.076,
    endLng: 72.8777,
    arcAlt: 0.22,
    color: colors[3],
  },
  {
    order: 4,
    startLat: 25.3176,
    startLng: 82.9739,
    endLat: 12.9716,
    endLng: 77.5946,
    arcAlt: 0.25,
    color: colors[2],
  },
  {
    order: 4,
    startLat: 21.1458,
    startLng: 79.0882,
    endLat: 26.8467,
    endLng: 80.9462,
    arcAlt: 0.14,
    color: colors[0],
  },
];

export default function ApproachGlobe() {
  return (
    <div className={classes.wrap} aria-hidden="true">
      <Suspense fallback={<div className={classes.placeholder} aria-hidden="true" />}>
        <World globeConfig={globeConfig} data={sampleArcs} />
      </Suspense>
    </div>
  );
}
