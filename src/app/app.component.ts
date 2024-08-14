import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Day, Month, monthsOfYear } from './model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'my-calendar';

	#nowDate = signal<Date>(new Date());
	nowYear = computed(() => this.#nowDate().getFullYear());
	#nowMonthIndex = computed(() => this.#nowDate().getMonth());
	#nowMonths = signal<Month[]>(this.setYear(this.nowYear()));
	nowMonth = computed(() => this.#nowMonths()[this.#nowMonthIndex()]);

	// Change to a new year and update calendar view
	private setYear(year: number): Month[] {
		return monthsOfYear.map((monthName) => {
			// Get starting day of week of month
			const firstDayOfMonthDate = new Date(`${monthName} 1 ${year}`);
			const dayOfWeek = firstDayOfMonthDate.getDay();

			// Get list of days in this month
			firstDayOfMonthDate.setMonth(firstDayOfMonthDate.getMonth() + 1);
			firstDayOfMonthDate.setDate(firstDayOfMonthDate.getDate() - 1);
			const daysOfMonthByIndex = Array.from(Array(firstDayOfMonthDate.getDate()).keys());

			return {
				name: monthName,
				days: daysOfMonthByIndex.map((dayOfMonthIndex) => {
					// Each day randomly has holiday for test data
					const dayOfWeekIndex = (dayOfWeek + dayOfMonthIndex) % 7;
					return { dayOfWeekIndex, holiday: !dayOfWeekIndex };
				}),
			};
		});
	}
}
