import styles from './Skeleton.scss';

export default ({element}) => {
  return {
    exists: () => !!element,

    /** return number of lines rendered */
    getNumLines: () =>
      element.querySelectorAll('[data-hook="placeholder-line"]').length,

    /** return boolean representing whether first line has special styling */
    hasFirstLine: spacing =>
      element
        .querySelector('[data-hook="placeholder-line"]')
        .classList.contains(styles.first),

    /** return boolean representing whether given spacing is rendered */
    hasSpacing: spacing =>
      element
        .querySelector('[data-hook="placeholder-line"]')
        .classList.contains(styles[spacing]),

    /** return boolean representing whether given list of sizes is rendered */
    hasSizes: sizes =>
      Array.from(element.querySelectorAll('[data-hook="placeholder-chunk"]'))
        .reduce(
          ([expectedSizes, result], chunk) => {
            const assertSize = expectedSizes.shift();
            return [
              expectedSizes,
              chunk.classList.contains(styles[assertSize])
            ];
          },
          [sizes, []]
        )
        .every(Boolean),

    /** return boolean representing whether given alignment is rendered */
    hasAlignment: alignment =>
      element
        .querySelector('[data-hook="placeholder-line"]')
        .classList.contains(styles[alignment])
  };
};
