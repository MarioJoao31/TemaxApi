import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from 'src/Dtos/payment-create.dto';

import { Payment } from 'src/Entitys/Payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll() {
    return this.paymentRepository.find();
  }

  createPayment(createPaymentDto): any {
    console.log(createPaymentDto);
    try {
      return this.paymentRepository.save(createPaymentDto);
    } catch (e) {
      // Mensagem caso de erro:
      console.error(e.message);
      throw new Error('Erro ao criar pagamento');
    }
  }

  getUserPayPayments(userID: number): Promise<Payment[]> {
    try {
      return this.paymentRepository
        .createQueryBuilder('Payment')
        .where('Payment.UserID = :userID', { userID }) // a variavel ao lado direito tem de ter o mesmo nome que a variavel passada
        .andWhere('Payment.Status = :Status', { Status: 'Pago' })
        .getMany();
    } catch (error) {
      throw error(error);
    }
  }

  //TODO: payPayment()
  //TODO: cancelPayment()
}
