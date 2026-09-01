export interface CreateCreditRequest {
  clientName: string;
  clientDocument: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  salesperson: string;
}