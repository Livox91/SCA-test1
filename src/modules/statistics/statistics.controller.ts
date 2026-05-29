import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('overview')
  @ApiOkResponse({ description: 'Business overview statistics' })
  getOverview() {
    return this.statisticsService.getOverview();
  }

  @Get('top-books')
  @ApiOkResponse({ description: 'Top rated/reviewed books' })
  getTopBooks(@Query('limit') limit: number = 10) {
    return this.statisticsService.getTopBooks(limit);
  }

  @Get('most-sold')
  @ApiOkResponse({ description: 'Most sold books' })
  getMostSoldBooks(@Query('limit') limit: number = 10) {
    return this.statisticsService.getMostSoldBooks(limit);
  }

  @Get('categories')
  @ApiOkResponse({ description: 'Category statistics' })
  getCategoryStats() {
    return this.statisticsService.getCategoryStats();
  }

  @Get('authors')
  @ApiOkResponse({ description: 'Author statistics' })
  getAuthorStats() {
    return this.statisticsService.getAuthorStats();
  }
}
