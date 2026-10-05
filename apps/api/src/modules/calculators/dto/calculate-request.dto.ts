import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsObject, IsOptional, IsString } from 'class-validator';

export class CalculateRequestDto {
  @ApiProperty({ description: 'Calculator inputs according to the calculator input schema' })
  @IsObject()
  inputs!: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Specific calculator version code to execute (defaults to active)' })
  @IsOptional()
  @IsString()
  versionCode?: string;

  @ApiPropertyOptional({ description: 'Calculation target date in ISO format for historical simulation' })
  @IsOptional()
  @IsDateString()
  targetDate?: string;
}
