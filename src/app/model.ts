export interface Month {
    name: string;
    days: Day[];
}

export interface Day {
    dayOfWeekIndex: number;
    holiday: boolean;
}

export const monthsOfYear  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
