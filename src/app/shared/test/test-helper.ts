export const cleanStylesFromDom = () => {
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  const styles: HTMLCollectionOf<HTMLStyleElement> | [] =
    head.getElementsByTagName('style');

  for (let index: number = 0; index < styles.length; index++) {
    head.removeChild(styles[index]);
  }
};
