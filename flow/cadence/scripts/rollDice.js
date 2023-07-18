export const rollDice = `
import DiceGenerator from 0x61683d8d52f3b6e4

 pub fun main(diceType: Int, numberOfDice: Int): [Int] {
   return DiceGenerator.rollDice(diceType: diceType, numberOfDice: numberOfDice)
}`;
