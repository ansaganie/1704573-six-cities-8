import classnames from 'classnames';

type ClassnamesType = {
  [className: string]: boolean,
}

const combineClasses = (obj: ClassnamesType): string =>
  classnames(obj);

export default combineClasses;
