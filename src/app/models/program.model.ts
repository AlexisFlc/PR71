export interface ArticleComment {
  id: number;
  user: string;
  text: string;
  createdAt: string;
}

export interface SportProgram {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  intensity: string;
  type: string;
  rating: number;
  numberOfRatings: number;
  isFavorite?: boolean;
  comments: ArticleComment[];
}
