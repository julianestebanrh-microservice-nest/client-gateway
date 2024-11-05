import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, PaginationOrderDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    const order = this.client.send('order.create', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return order;
  }

  @Get()
  findAll(@Query() paginationDto: PaginationOrderDto) {
    const orders = this.client.send('order.find.all', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return orders;
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const order = this.client.send('order.find.one', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    return order;
  }

  @Get(':status')
  findByStatus(@Param() statusDto: StatusDto, paginationDto: PaginationDto) {
    const orders = this.client
      .send('order.find.all', {
        status: statusDto.status,
        ...paginationDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );

    return orders;
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.client
      .send('order.change.status', { id, status: statusDto.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
