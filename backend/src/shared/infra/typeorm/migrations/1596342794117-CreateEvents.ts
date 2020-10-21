import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEvents1596342794117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    //* this set TIMEZONE
    await queryRunner.query(`SET TIMEZONE="America/Sao_Paulo"`);
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'supporter_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'TEXT',
          },
          {
            name: 'starts_in',
            type: 'timestamp',
          },
          {
            name: 'ends_in',
            type: 'timestamp',
          },
          {
            name: 'point',
            type: 'decimal[]',
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'expired',
            type: 'BOOLEAN',
            default: false,
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
    // - foreignkey user_id
    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        name: 'SupporterEvent_fk',
        columnNames: ['supporter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'supporters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('events', 'SupporterEvent_fk');
    await queryRunner.dropTable('events');
  }
}
