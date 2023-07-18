export const payFees = `import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868 

transaction(amount: UFix64, to: Address) {
  let sentVault: @FungibleToken.Vault

  prepare(sender: AuthAccount) {
    let vault = sender.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
      ?? panic("Could not borrow reference to the owner's Vault!")
    self.sentVault <- vault.withdraw(amount: amount)
  }

  execute {
    let recipient = getAccount(to)
    let receiver = recipient.getCapability(/public/flowTokenReceiver)
      .borrow<&{FungibleToken.Receiver}>()
      ?? panic("Could not borrow receiver reference to the recipient's Vault")
    receiver.deposit(from: <-self.sentVault)
  }
}`;
