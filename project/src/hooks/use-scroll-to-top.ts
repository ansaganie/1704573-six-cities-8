import { useEffect } from 'react';

const X = 0;
const Y = 0;

const useScrollToTop = (dependency: unknown): void => {
  useEffect(() => {
    window.scrollTo(X, Y);
  }, [ dependency ]);
};

export default useScrollToTop;
