import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjadto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {

    private ninjas = [
        { id: 0, name: 'Kevin', weapon: 'Katana' },
        { id: 1, name: 'Kerts', weapon: 'Shuriken' }
    ]

    getNinjas(weapon?: 'Katana' | 'Shuriken') {
        if (weapon) {
            return this.ninjas.filter((ninja) => ninja.weapon === weapon);
        }
        return this.ninjas;
    }

    getNinja(id: number) {
        const ninja = this.ninjas.find((ninja) => ninja.id === id);
        if (!ninja) {
            throw new Error('Ninja not found');
        }

        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto) {
        const newNinja = {
            ...createNinjaDto,
            id: Date.now()
        }
        this.ninjas.push(newNinja);

        return newNinja;
    }

    updateNinja(id: number, updateNinjadto: UpdateNinjadto) {
        this.ninjas = this.ninjas.map((ninja) => {
            if (ninja.id === id) {
                return { ...ninja, ...updateNinjadto }
            }

            return ninja;
        });

        return this.getNinja(id);
    }

    removeNinja(id: number) {
        const toBeRemoved = this.getNinja(id);

        this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

        return toBeRemoved;
    }
}
