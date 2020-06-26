import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  sumValues = (sum: number, { value }: Transaction): number => sum + value;

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions: Transaction[] = this.transactions.filter(
      t => t.type === 'income',
    );
    const income = incomeTransactions.reduce(this.sumValues, 0);
    const outcomeTransactions: Transaction[] = this.transactions.filter(
      t => t.type === 'outcome',
    );
    const outcome = outcomeTransactions.reduce(this.sumValues, 0);
    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction: Transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
