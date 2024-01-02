import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {}

  createMagazine(createMagazineDto: CreateMagazineDto): Promise<Magazine> {
    const magazine: Magazine = new Magazine();

    magazine.name = createMagazineDto.name;
    magazine.category = createMagazineDto.category;
    magazine.publication = createMagazineDto.publication;
    magazine.issue = createMagazineDto.issue;
    magazine.imageurl = createMagazineDto.imageurl;

    return this.magazineRepository.save(magazine);
  }

  findAllMagazine(): Promise<Magazine[]> {
    return this.magazineRepository.find();
  }

  viewMagazine(id: number): Promise<Magazine> {
    return this.magazineRepository.findOneBy({ id });
  }

  updateMagazine(
    id: number,
    updateMagazineDto: UpdateMagazineDto,
  ): Promise<Magazine> {
    const magazine: Magazine = new Magazine();
    magazine.name = updateMagazineDto.name;
    magazine.category = updateMagazineDto.category;
    magazine.publication = updateMagazineDto.publication;
    magazine.issue = updateMagazineDto.issue;
    magazine.imageurl = updateMagazineDto.imageurl;
    magazine.id = id;

    return this.magazineRepository.save(magazine);
  }

  removeMagazine(id: number): Promise<{ affected?: number }> {
    return this.magazineRepository.delete(id);
  }
}
