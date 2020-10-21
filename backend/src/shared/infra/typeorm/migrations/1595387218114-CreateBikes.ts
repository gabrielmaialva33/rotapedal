import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBikes1595387218114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    //* this set TIMEZONE
    await queryRunner.query(`SET TIMEZONE="America/Sao_Paulo"`);
    await queryRunner.createTable(
      new Table({
        name: 'bikes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'model',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'manufacturing_date',
            type: 'date',
            isNullable: true,
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
      'bikes',
      new TableForeignKey({
        name: 'BikesUser_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bikes', 'BikesUser_fk');
    await queryRunner.dropTable('bikes');
  }
}
