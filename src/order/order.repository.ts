import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrderParams,
  GetAccountOrdersResult,
  GetOrdersResult,
} from './order.interfaces';

@Injectable()
export default class OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async createOrder({
    totalInCents,
    accountId,
    orderStatusId,
    paymentStatusId,
    paymentMethodId,
    products,
  }: CreateOrderParams) {
    const order = await this.prismaService.order.create({
      data: {
        totalInCents,
        accountId,
        orderStatusId,
        paymentStatusId,
        paymentMethodId,
      },
    });
    const productsOnOrdersCreationPromises = [];
    for (let product of products) {
      productsOnOrdersCreationPromises.push(
        this.prismaService.productsOnOrders.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity: product.quantity,
          },
        }),
      );
    }
    await this.prismaService.$transaction(productsOnOrdersCreationPromises);
  }

  async getOrders({
    pageNumber,
    pageSize,
    orderNumber,
    clientName,
  }: {
    pageNumber: number;
    pageSize: number;
    orderNumber?: number;
    clientName?: string;
  }): Promise<GetOrdersResult> {
    const query: Prisma.OrderFindManyArgs = {
      select: {
        id: true,
        totalInCents: true,
      },
      where:
        orderNumber || clientName
          ? {
              AND: [
                orderNumber ? { id: { equals: orderNumber } } : {},
                clientName
                  ? {
                      account: {
                        OR: [
                          { firstName: { contains: clientName } },
                          { lastName: { contains: clientName } },
                        ],
                      },
                    }
                  : {},
              ],
            }
          : {},
      orderBy: { createdAt: 'desc' },
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    };
    const [orders, count] = await this.prismaService.$transaction([
      this.prismaService.order.findMany({
        ...query,
        select: {
          ...query.select,
          account: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              createdAt: true,
            },
          },
          paymentMethod: {
            select: {
              name: true,
            },
          },
          orderStatus: {
            select: {
              name: true,
            },
          },
          paymentStatus: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prismaService.order.count({ where: query.where }),
    ]);

    return { orders, count };
  }

  async getOrder(firebaseUID: string) {
    return await this.prismaService.order.findFirst({
      select: {
        id: true,
        totalInCents: true,
        orderStatus: {
          select: { name: true },
        },
        paymentStatus: {
          select: { name: true },
        },
        paymentMethod: {
          select: { name: true },
        },
        productsOnOrders: {
          select: {
            product: {
              select: {
                name: true,
                images: { select: { url: true } },
                finalPriceInCents: true,
              },
            },
            quantity: true,
          },
        },
        account: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
            accountStatistics: {
              select: {
                lastOrderCompletedDate: true,
                numberOfCompletedOrders: true,
                totalSpentInCents: true,
              },
            },
          },
        },
      },
      where: { account: { firebaseAuthID: firebaseUID } },
    });
  }

  async setOrderStatus(orderId: number, orderStatusId: number): Promise<void> {
    await this.prismaService.order.update({
      data: { orderStatusId },
      where: { id: orderId },
    });
  }

  async setPaymentStatus(
    orderId: number,
    paymentStatusId: number,
  ): Promise<void> {
    await this.prismaService.order.update({
      data: { paymentStatusId },
      where: { id: orderId },
    });
  }

  async getAccountOrders({
    pageNumber,
    pageSize,
    firebaseUID,
  }: {
    pageNumber: number;
    pageSize: number;
    firebaseUID: string;
  }): Promise<GetAccountOrdersResult> {
    const query: Prisma.OrderFindManyArgs = {
      select: {
        id: true,
        totalInCents: true,
      },
      where: { account: { firebaseAuthID: firebaseUID } },
      orderBy: { createdAt: 'desc' },
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    };
    const [orders, count] = await this.prismaService.$transaction([
      this.prismaService.order.findMany({
        ...query,
        select: {
          ...query.select,
          paymentMethod: {
            select: {
              name: true,
            },
          },
          orderStatus: {
            select: {
              name: true,
            },
          },
          paymentStatus: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prismaService.order.count({ where: query.where }),
    ]);

    return { orders, count };
  }
}
