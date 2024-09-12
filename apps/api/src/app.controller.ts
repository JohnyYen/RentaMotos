import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/server')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  restartServer(@Query('force') force? : boolean) : string{
    if(force)
      process.exit(0);

    return 'Espere mientras el servidor se recarga....';
  }
}
