export const skeletonDriverFactory = ({element}) => {

  return {
    exists: () => !!element,
    lines: () => element.querySelectorAll('[data-hook="placeholder-line"]'),
    chunks: () => element.querySelectorAll('[data-hook="placeholder-chunk"]'),
    concealers: () => element.querySelectorAll('[data-hook="placeholder-concealer"]'),
    isFirstLine: el => el.className.includes('first'),
    smallSize: el => el.className.includes('small'),
    mediumSize: el => el.className.includes('medium'),
    largeSize: el => el.className.includes('large'),
    inSmallSpacing: el => el.className.includes('small'),
    inMediumSpacing: el => el.className.includes('medium'),
    inLargeSpacing: el => el.className.includes('large'),
    inMiddleAlignment: el => el.className.includes('middle')
  };
};

export default skeletonDriverFactory;
