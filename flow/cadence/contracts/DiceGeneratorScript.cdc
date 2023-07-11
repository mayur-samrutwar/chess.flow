// DiceGeneratorSCript.cdc

import DiceGenerator from 0xf8d6e0586b0a20c7
pub fun DiceGeneratorSCript() {
    log(DiceGenerator.rollDice(diceType: 6, numberOfDice: 4))
}