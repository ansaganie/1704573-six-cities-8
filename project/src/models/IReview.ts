interface IReview {
  comment: string,
  date: Date,
  id: string,
  rating: number,
  user: {
    avatarUrl: string,
    id: string,
    isPro: false,
    name: string,
  }
}

export default IReview;
