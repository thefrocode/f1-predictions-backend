import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Category } from 'src/categories/entities/category.entity';
import { ChampionshipRound } from 'src/championship-rounds/entities/championship-round.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Player } from 'src/players/entities/player.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if(this.isProduction()){
      return {
        type: 'mysql',
        name: 'default',
        host: this.getValue('MYSQL_HOST'),
        port: parseInt(this.getValue('MYSQL_PORT')),
        username: this.getValue('MYSQL_USER'),
        password: this.getValue('MYSQL_PASSWORD'),
        database: this.getValue('MYSQL_DATABASE'),
  
        entities: ["dist/**/entities/*.js"],
  
        ssl: 
        {
          ca: this.getValue('CA_CERT')
        }
      };
    }else{
    
    
    return {
      type: 'mysql',
      name:'default',
      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USER'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),
      //entities:[Driver, Prediction, Player, ChampionshipRound, Category],
      autoLoadEntities: true,

      ssl: this.isProduction(),
    };
  }

}
}
const configService = new ConfigService(process.env)
  .ensureValues([
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
  ]);

export { configService };