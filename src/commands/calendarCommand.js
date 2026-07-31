import renderCalendar from "../calendar/calendar-renderer.js";

export default function CalendarCommand() {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    renderCalendar(currentYear,currentMonth)
    console.log('')
}