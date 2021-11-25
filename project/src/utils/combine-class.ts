import classnames from 'classnames';

type ClassnamesType = {
  [className: string]: boolean,
}

const combineClass = (obj: ClassnamesType): string =>
  classnames(obj);

export default combineClass;
