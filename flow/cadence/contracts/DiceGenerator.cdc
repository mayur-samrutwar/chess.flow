// File: contracts/DiceGenerator.cdc

pub contract DiceGenerator {
  // pub 
  pub fun rollDice(diceType: Int, numberOfDice: Int): [Int] {
    var generated: [Int] = []
    var a = 0
    while a < numberOfDice {

      a = a + 1
      let randomFace = unsafeRandom()
      let randomFaceInt= Int(randomFace)
      let randomFaceIntWithinRange = 1 + (randomFaceInt%diceType)
      // let randomFace = Int.random(in: 1...diceType)
      generated.append(randomFaceIntWithinRange)
    }
    return generated
  }

  pub fun test(): String {
    return "u r awesome:)"
  }

// init(){
//   self.generated = []
// }

}
