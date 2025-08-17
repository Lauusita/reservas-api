import { Injectable } from '@nestjs/common';
import { integritySignature, transactionData } from 'src/types/transaction';
import { v4 } from 'uuid';

@Injectable()
export class PaymentService {
  private readonly pub_test = process.env.pub_test_;
  private readonly prv_test = process.env.prv_test_;
  private readonly test_events = process.env.test_events_;
  private readonly test_integrity = process.env.test_integrity_;
  // private readonly redirect_url = "http://localhost:5173";
  private readonly redirect_url = "http://localhost:3000/api/reserva/payment/response";


  private async generateIntegitySignature(cadenaConcatenada: string): Promise<string> {
    const encondedText = new TextEncoder().encode(cadenaConcatenada);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  public async createTransaction(data: integritySignature): Promise<transactionData> {
    const { monto, moneda } = data;

    const reference = v4(); // uuid
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    
    const cadenaConcatenada = `${reference}${monto}${moneda}${expirationTime}${this.test_integrity}`;
    
    const signature = await this.generateIntegitySignature(cadenaConcatenada);

    const transactionData: transactionData = {
      publicKey: this.pub_test,
      currency: moneda,
      amountInCents: monto,
      integrity: signature,
      reference,
      expirationTime,
      redirectUrl: this.redirect_url,
    };
    
    return transactionData;
  }
}