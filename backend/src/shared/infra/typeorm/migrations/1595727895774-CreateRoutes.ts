import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRoutes1595727895774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    //* this set TIMEZONE
    await queryRunner.query(`SET TIMEZONE="America/Sao_Paulo"`);
    await queryRunner.createTable(
      new Table({
        name: 'routes',
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
            isUnique: true,
          },
          {
            name: 'extension',
            type: 'float',
          },
          {
            name: 'elevation',
            type: 'float',
          },
          {
            name: 'difficult',
            type: 'enum',
            default: "'normal'",
            enum: ['easy', 'normal', 'hard'],
          },
          {
            name: 'stop_points',
            type: 'int',
          },
          {
            name: 'point_A',
            type: 'decimal[]',
          },
          {
            name: 'point_B',
            type: 'decimal[]',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('routes');
  }
}
