import IAbstractUser from './IAbstractUser';

interface IReview {
  comment: string;
  date: Date;
  id: string;
  rating: number;
  user: IAbstractUser;
}

export default IReview;
