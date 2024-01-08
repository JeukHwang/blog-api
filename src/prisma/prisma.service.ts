import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as util from 'util';

const options = {
  log: [
    {
      emit: 'event' as const,
      level: 'query' as const,
    },
    'info' as const,
    'warn' as const,
    'error' as const,
  ],
} satisfies Prisma.PrismaClientOptions;

@Injectable()
export class PrismaService extends PrismaClient<typeof options> {
  constructor() {
    super(options);
  }

  async onModuleInit() {
    await this.$connect();

    // Reference: https://www.prisma.io/docs/orm/prisma-client/client-extensions/query#modify-all-prisma-client-operations
    Object.assign(
      this,
      this.$extends({
        query: {
          $allModels: {
            async $allOperations({ operation, model, args, query }) {
              const start = performance.now();
              const result = await query(args);
              const end = performance.now();
              const time = end - start;
              console.log(
                util.inspect(
                  { model, operation, args, time },
                  { showHidden: false, depth: null, colors: true },
                ),
              );
              return result;
            },
          },
        },
      }),
    );
  }
}
