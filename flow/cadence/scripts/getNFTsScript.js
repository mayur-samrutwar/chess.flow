export const getNFTsScript = `
import MyNFT from 0x61683d8d52f3b6e4
import NonFungibleToken from 0x61683d8d52f3b6e4

pub fun main(account: Address): [&MyNFT.NFT] {
  let collection = getAccount(account).getCapability(/public/MyNFTCollection)
                    .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&MyNFT.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowEntireNFT(id: id))
  }

  return returnVals
}
`;
