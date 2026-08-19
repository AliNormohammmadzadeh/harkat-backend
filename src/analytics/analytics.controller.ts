import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
import {
  AnalyticsChartResponseDto,
  AnalyticsQueryDto,
  AnalyticsQueryResponseDto,
  AnalyticsStatsResponseDto,
  ChartQueryDto,
} from './dto/analytics.dto';

@ApiTags('Analytics')
@ApiBearerAuth('JWT')
@Controller('api/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('stats')
  @ApiOperation({
    summary: 'آمار داشبورد',
    description: 'کاشی‌های آماری روی فهرست فیلترشده (تعداد، معدل، بورسیه، جنسیت، هزینه)',
  })
  @ApiResponse({ status: 200, type: AnalyticsStatsResponseDto })
  stats(@Query() query: StudentFilterDto, @CurrentUser() user: AuthUser) {
    return this.analyticsService.getStats(query, user);
  }

  @Get('chart')
  @ApiOperation({
    summary: 'نمودار تحلیل',
    description: 'توزیع بر اساس groupBy روی فهرست فیلترشده',
  })
  @ApiResponse({ status: 200, type: AnalyticsChartResponseDto })
  chart(@Query() query: ChartQueryDto, @CurrentUser() user: AuthUser) {
    return this.analyticsService.getChart(query, user);
  }

  @Post('query')
  @ApiOperation({
    summary: 'پرسش از داده',
    description: 'موتور تحلیل ساختاریافته — الگوهای مشخص (کمترین/بیشترین معدل، درس ضعیف، ...)',
  })
  @ApiResponse({ status: 200, type: AnalyticsQueryResponseDto })
  query(@Body() body: AnalyticsQueryDto, @CurrentUser() user: AuthUser) {
    return this.analyticsService.query(body.question ?? '', user);
  }
}
