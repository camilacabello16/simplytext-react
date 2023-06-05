const { Blockchain, Transaction } = require("./blockchain");


let data = new Blockchain();
data.createTransaction(new Transaction('address1', 'hieu-address', 40));
data.createTransaction(new Transaction('address2', 'address1', 100));

data.minePendingTransactions('hieu-address');

console.log(data.getBalanceOfAddress('hieu-address'));

data.minePendingTransactions('hieu-address');

console.log(data.getBalanceOfAddress('hieu-address'));
