import { colors } from '../helpers/format.js'

const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

// Month is 0-index based
export default function renderCalendar(year, month) {

    const firstDay = new Date(year, month, 1).getDay(); // week day
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    console.log(`\n     ${colors.brightyellow}${monthNames[month]} ${year}\n`);
    console.log(`${colors.brightcyan}Su Mo Tu We Th Fr Sa${colors.reset}`);

    let line = "";

    // Empty spaces before day 1
    for (let i = 0; i < firstDay; i++) {
        line += "   ";
    }
    
    const today = new Date().getDate()

    for (let day = 1; day <= daysInMonth; day++) {
    
        if (day === today) {
            line += colors.bgCyan + day.toString().padStart(2) + colors.reset + " ";
        } else {
            line += day.toString().padStart(2, " ") + " ";
        }
        

        if ((firstDay + day) % 7 === 0) {
            console.log(line);
            line = "";
        }
    }

    if (line) {
        console.log(line);
    }
}
