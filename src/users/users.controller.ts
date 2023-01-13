import { RequestUserDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '아이디로 회원 찾기' })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @ApiResponse({
    status: 404,
    description: '해당 아이디를 가진 회원이 없음',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '성공!',
  })
  @ApiResponse({
    status: 409,
    description: '동일한 이메일이 이미 존재',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Post('/signup')
  signUp(@Body() body: RequestUserDto) {
    return this.usersService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: '성공!',
  })
  @ApiResponse({
    status: 404,
    description: '해당 이메일을 가진 회원이 없음',
  })
  @ApiResponse({
    status: 401,
    description: '비밀번호가 맞지 않아 로그인 실패',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Post('/login')
  logIn(@Body() body: RequestUserDto) {
    return this.usersService.signIn(body);
  }

  @ApiOperation({ summary: '회원삭제' })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @ApiResponse({
    status: 404,
    description: '해당 아이디를 가진 회원이 없을 때',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
