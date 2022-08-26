// importando as dependencias
const bip32 = require('bip32')
const bip39 =  require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste 
const network = bitcoin.networks.testnet

//derivacao de carteiras HD (hierarquical deterministic)
const path = `m/49'/1'/0'/0`
 
//criando as palavras do mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada: ")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic)


//Carteira teste gerada: 
//Endereço:  mxx3s3b3tYG1DTMprCTf1RdzXuJhXhSDKh
//Chave privada:  cSwf1qqyhP9xPq9D2HfLiYUNdZmhpbYx48XAYcpGUejNzbXS2egA
//Seed:  office sport tree useful seminar just damp vanish lyrics jump pet draft