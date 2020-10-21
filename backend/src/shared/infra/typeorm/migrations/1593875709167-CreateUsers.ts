import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1593875709167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    //* this set TIMEZONE
    await queryRunner.query(`SET TIMEZONE="America/Sao_Paulo"`);
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            default: "'user'",
            enum: ['user', 'supporter', 'moderator', 'admin'],
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: ' timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
