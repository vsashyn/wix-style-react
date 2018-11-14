import styles from './Skeleton.scss';

const selector = element => hook =>
  element.querySelectorAll(`[data-hook="${hook}"]`);

export default ({element}) => {
  const byHook = selector(element);

  return {
    exists: () => !!element,

    /** return number of lines rendered */
    getNumLines: () => byHook('placeholder-line').length,

    /** return boolean representing whether first line has special styling */
    hasFirstLine: spacing =>
      byHook('placeholder-line')[0].classList.contains(styles.first),

    /** return boolean representing whether given spacing is rendered */
    hasSpacing: spacing =>
      byHook('placeholder-line')[0].classList.contains(styles[spacing]),

    /** return boolean representing whether given list of sizes is rendered */
    hasSizes: sizes =>
      Array.from(byHook('placeholder-chunk'))
        .reduce(
          ([[expectedSize, ...restSizes], result], chunk) => [
            restSizes,
            chunk.classList.contains(styles[expectedSize])
          ],
          [sizes, []]
        )
        .every(Boolean),

    /** return boolean representing whether given alignment is rendered */
    hasAlignment: alignment =>
      byHook('placeholder-line')[0].classList.contains(styles[alignment])
  };
};
