import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsersTeams1594691443000
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //* this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    //* this set TIMEZONE
    await queryRunner.query(`SET TIMEZONE="America/Sao_Paulo"`);
    await queryRunner.createTable(
      new Table({
        name: 'users_teams',
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
            name: 'team_id',
            type: 'uuid',
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
      'users_teams',
      new TableForeignKey({
        name: 'User_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    // - foreignkey team_id
    await queryRunner.createForeignKey(
      'users_teams',
      new TableForeignKey({
        name: 'Team_fk',
        columnNames: ['team_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_teams', 'User_fk');
    await queryRunner.dropForeignKey('users_teams', 'Team_fk');
    await queryRunner.dropTable('users_teams');
  }
}
