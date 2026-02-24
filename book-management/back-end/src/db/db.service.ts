import { Inject, Injectable } from '@nestjs/common';
import type { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read<T>() {
    const path = this.options.path;
    try {
      await access(path);
    } catch (e) {
      console.error(e);
      return [];
    }
    const str = await readFile(path, { encoding: 'utf-8' });

    if (!str) {
      return [];
    }

    return JSON.parse(str) as T[];
  }

  async write(obj: Record<string, any>) {
    const path = this.options.path;
    console.log('path', path);
    await writeFile(path, JSON.stringify(obj || []), { encoding: 'utf-8' });
  }
}
