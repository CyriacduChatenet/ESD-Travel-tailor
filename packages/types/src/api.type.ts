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
};

export type ErrorResponse = {
    statusCode: number
    message: string
  }
  
  export type SuccessResponse = {
    statusCode: number
    data: Object
  }
  