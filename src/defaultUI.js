import { colors } from './utils.js'
const helloASCII = `
┌─┐  ┌─┐┌─────┐┌─┐    ┌─┐    ┌─────┐
│ │__│ ││ ╷───┘│ │    │ │    │ ┌─┐ │
│  __  ││ ____││ │    │ │    │ │ │ │ 
│ │  │ ││ ╵   ┐│ ────┐│ ────┐│ └─┘ │
└─┘  └─┘└─────┘└─────┘└─────┘└─────┘`

const hiThereASCII = `
┌─┐  ┌─┐┌─┐  ┌─────┐┌─┐  ┌─┐┌─────┐┌─────┐┌─────┐
│ │__│ ││ │  └─┐ ┌─┘│ │__│ ││ ╷───┘│ ┌─┐ ││ ╷───┘ 
│  __  ││ │    │ │  │  __  ││ ____││ └─┘_││ ____│
│ │  │ ││ │    │ │  │ │  │ ││ ╵   ┐│ │╲ ╲ │ ╵   ┐
└─┘  └─┘└─┘    └─┘  └─┘  └─┘└─────┘└─┘ └─┘└─────┘`

const pro = `
┌─────┐┌─────┐┌─────┐  ┌──────┐
│ ┌─┐ ││ ┌─┐ ││ ┌─┐ │  │┌─┐┌─┐│
│ └─┘_││ └─┘_││ │ │ │  │      │
│ │    │ │╲ ╲ │ └─┘ │  │└────┘│
└─┘    └─┘ └─┘└─────┘  └──────┘`

const proTwo = `
┌─────┐┌─────┐┌─────┐  ┌──────┐
│ ┌─┐ ││ ┌─┐ ││ ┌─┐ │  │┌─┐┌─┐│
│ └─┘_││ └─┘_││ │ │ │  │└─┘└─┘│
│ │    │ │╲ ╲ │ └─┘ │  │└────┘│
└─┘    └─┘ └─┘└─────┘  └──────┘`

const proThree = `
┌─────┐┌─────┐┌─────┐  ┌──────┐
│ ┌─┐ ││ ┌─┐ ││ ┌─┐ │  │      │
│ └─┘_││ └─┘_││ │ │ │  │└─┘└─┘│
│ │    │ │╲ ╲ │ └─┘ │  │└────┘│
└─┘    └─┘ └─┘└─────┘  └──────┘`

const proFour = `
┌─────┐┌─────┐┌─────┐  ┌──────┐
│ ┌─┐ ││ ┌─┐ ││ ┌─┐ │  │      │
│ └─┘_││ └─┘_││ │ │ │  │──  ──│
│ │    │ │╲ ╲ │ └─┘ │  │└────┘│
└─┘    └─┘ └─┘└─────┘  └──────┘`


function displayDeafultHeader() {
    const current = new Date().getHours()
    const morning = current < 12
    const afterNoon = current >= 12 && current < 18
    const evening = current >= 18 && current < 22
    const night = current >= 22

    if (morning) {
        console.log(`${colors.cyan}`)
        console.log(proTwo)
        console.log(`${colors.reset}`)
        console.log("Good Morning!")
    } else if (afterNoon) {
        console.log(`${colors.brightyellow}`)
        console.log(proTwo)
        console.log(`${colors.reset}`)
        console.log("Good Afternoon!")
    } else if (evening){
        console.log(`${colors.cyan}`)
        console.log(proThree)
        console.log(`${colors.reset}`)
        console.log("Good Evening!")
    } else if (night) {
        console.log(`${colors.blue}`)
        console.log(proThree)
        console.log(`${colors.reset}`)
        console.log("Good Night!")
    }
}

export { displayDeafultHeader }