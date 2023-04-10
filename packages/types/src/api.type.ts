export type ApiLimitResourceQuery = {
  page: number;
  limit: number;
  sortedBy: 'ASC' | 'DESC';
  activity: string;
  activityDetail: string;
  advertiser: string;
  traveler: string;
  opening_at: string;
  closing_at: string;
  duration: string;
  location: string;
  author: string;
  name: string;
  departureCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate: string;
  username: string;
  email: string;
  roles: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type ErrorResponse = {
  statusCode: number
  message: string
}

export type SuccessResponse = {
  statusCode: number
  data: Object
}
