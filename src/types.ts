export interface Meal {
  id: string;
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  description: string;
  calories: number;
}

export interface MealMutation {
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  description: string;
  calories: string;
}

export type ApiMeal = Omit<Meal, 'id'>;

export interface ApiMealsList {
  [id: string]: ApiMeal;
}
