import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from 'src/Dtos/payment-create.dto';
import { Payment } from 'src/Entitys/Payment.entity';
import { User } from 'src/Entitys/User.entity';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  //PROTOCOL: Get
  // ROTA: /payment
  // DESC: Retorna todas as casas
  @Get()
  getAllPayment() {
    //vai buscar a funcao ao service
    return this.paymentService.findAll();
  }

  // PROTOCOL: Post
  // ROTA: /payment/createPayment
  // DESC: Cria um pagamento e retorna o pagamento
  @Post('/createPayment')
  createPayment(@Body() createPaymentDto: CreatePaymentDto): Payment {
    //vai buscar a funcao ao service
    return this.paymentService.createPayment(createPaymentDto);
  }

   // PROTOCOL: Post
  // ROTA: /payment/createPayment
  // DESC: retorna todos os pagamentos pending que o cliente tenha disponivel 
  @Post('/getUserPendingPayment')
  getUserPendingPayment(@Body() user : User) {
    return this.paymentService.getUserPendingPayments(user.UserID);
  }
}
