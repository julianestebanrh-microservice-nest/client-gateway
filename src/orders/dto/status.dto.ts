import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { Transform } from 'class-transformer';

export class StatusDto {
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(OrderStatusList, { message: `Valid status are ${OrderStatusList}` })
  status: OrderStatus;
}
