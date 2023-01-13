var express = require("express");
var router = express.Router();
var { POSClient, use } = require("@maticnetwork/maticjs");
var { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
var HDWalletProvider = require("@truffle/hdwallet-provider");

const { user1, rpc, pos } = require("./config.js");

var Web3 = require("web3");
var web3 = new Web3(rpc.child);

use(Web3ClientPlugin);

const from = user1.address;
const privateKey = user1.privateKey;

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express',

//   });
//   console.log("hohoho")

// });
const execute = async () => {
  const posClient = new POSClient();

  await posClient.init({
    network: "testnet",
    version: "mumbai",
    parent: {
      provider: new HDWalletProvider(privateKey, rpc.child),
      defaultConfig: {
        from,
      },
    },
    child: {
    },
  });

  console.dir(posClient);

  console.log(await web3.eth.getBalance(from));

  const rootTokenErc20 = posClient.erc20(pos.child.wmatic, true);
  const balanceRoot = await rootTokenErc20.getBalance(from);
  console.log("balanceRoot", balanceRoot);
};

execute()
  .then((_) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("error", err);
    process.exit(0);
  });
// router.get('/getBalance', async function(req, res, next) {
// })

// module.exports = router;
