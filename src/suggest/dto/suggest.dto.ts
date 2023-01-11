export interface SuggestDto {
  receiver: number;
  gender: number;
  age: number;
  mbti: number;
  personality: number;
  price: { start: number; end: number };
  relation: number;
  time: number;
  hobby: number[];
  season: number[];
  event: number;
}
