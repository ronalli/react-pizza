import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    // {...props}
  >
    <circle cx='138' cy='128' r='125' />
    <rect x='78' y='89' rx='0' ry='0' width='2' height='32' />
    <rect x='76' y='237' rx='0' ry='0' width='0' height='2' />
    <rect x='142' y='404' rx='24' ry='24' width='138' height='45' />
    <rect x='10' y='415' rx='9' ry='9' width='90' height='27' />
    <rect x='-1' y='315' rx='23' ry='23' width='280' height='76' />
    <rect x='6' y='268' rx='14' ry='14' width='265' height='23' />
  </ContentLoader>
);

export { Skeleton };
