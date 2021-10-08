export type Dish = {
    _id?: string; // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
    dishName: string;
    cost: number;
    pounds: number;
    allergens: string[];
    imageLink: string; // Use this link: https://umifeedsimages.blob.core.windows.net/image-container/5525456932908281-put_test_image.jpeg
    favorite: boolean;
    comments: string;
}
