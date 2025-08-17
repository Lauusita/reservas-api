export type integritySignature = {
  referencia?: string;
  monto: number;
  moneda: string;
  secretIntegrity?: string;
}

export type transactionData = {
  publicKey: string; 
  reference: string;
  expirationTime: string;
  currency: string;
  amountInCents: number;  
  integrity: string
  redirectUrl: string; 
}
