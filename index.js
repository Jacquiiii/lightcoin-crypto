// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account


class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let sum = 0;
    for (let x of this.transactions) {
      sum += x.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}


class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// Test code

const myAccount = new Account("snow-patrol");

t3 = new Deposit(200.00, myAccount);
t3.commit();
console.log('Your new balance is:', myAccount.balance);

t1 = new Withdrawal(10.00, myAccount);
t1.commit();
console.log('Your new balance is:', myAccount.balance);

t2 = new Withdrawal(300.00, myAccount);
t2.commit();
console.log('Insufficient funds. Your current balance is:', myAccount.balance);

t1 = new Withdrawal(30.00, myAccount);
t1.commit();
console.log('Your new balance is:', myAccount.balance);

console.log('Final balance:', myAccount.balance);


