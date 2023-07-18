const { SHA3 } = require("sha3");

var EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const PRIVATE_KEY =
  "4535c1f04242f843a177cad64290c48e4648f607f6644f1e22233cc6c12d9b71";

const sign = (message) => {
  const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
  const sig = key.sign(hash(message)); // hashMsgHex -> hash
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
};

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, "hex"));
  return sha.digest();
};

module.exports = {
  sign,
};
