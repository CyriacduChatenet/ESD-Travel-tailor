type UnsplashPicture = {
    id: string;
    slug: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    topic_submissions: {
        nature: {
            status: string;
        };
        wallpapers: {
            status: string;
        };
    };
    premium: boolean;
    plus: boolean;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string;
        portfolio_url: string;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string;
            portfolio_url: string;
            twitter_username: string;
            paypal_email: null;
        };
    };
    tags_preview: any[];
};

export type UnsplashPictureArray = {
    total: number;
    total_pages: number;
    results: UnsplashPicture[];
};