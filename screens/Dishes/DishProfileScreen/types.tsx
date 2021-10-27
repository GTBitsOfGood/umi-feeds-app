export type Dish = {
    _id: string,
    dishName: string,
    cost: number,
    pounds: number,
    allergens: string[],
    imageLink: string,
    favorite: boolean,
    comments: string
};
