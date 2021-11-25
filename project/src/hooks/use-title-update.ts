import { useEffect } from 'react';

const useTitleUpdate = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [ title ]);
};

export default useTitleUpdate;
