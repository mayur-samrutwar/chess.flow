export const getReward = `

import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

transaction(amount: UFix64, recipientAddr: Address, adminAddr: Address) {
  let admin: AuthAccount

  prepare(userAccount: AuthAccount) {
    self.admin = getAccount(adminAddr)
  }

  execute {
    let recipient = getAccount(recipientAddr)
    let adminVault = self.admin.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
      ?? panic("Admin's FlowToken.Vault is not found")

    let paymentVault = adminVault.withdraw(amount: amount)

    recipient.getCapability(/public/flowTokenReceiver)!.borrow<&{FlowToken.Receiver}>()!
      .deposit(from: <- paymentVault)
  }
}`;
