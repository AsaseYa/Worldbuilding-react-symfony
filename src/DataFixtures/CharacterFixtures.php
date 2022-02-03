<?php

namespace App\DataFixtures;

use App\Entity\Character;
use App\Entity\World;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CharacterFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 25; $i++) {
            $newCharacter = new Character();
            $newCharacter->setFirstname($faker->firstName);
            $newCharacter->setLastname($faker->lastName);
            $newCharacter->setNickname($faker->name);
            $newCharacter->setDescription('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur hic, magnam reiciendis rem tempore vel. Ad alias dignissimos ducimus error mollitia neque, numquam odio perspiciatis, sed sunt, tempore veritatis.');
            $newCharacter->setAge(rand(1, 60));
            $newCharacter->setHeight(150 + rand(1, 50));
            $newCharacter->setWeight(60 + rand(1, 60));
            /** @var World $world */
            $world = $this->getReference('world_0'/*['world_0', 'world_1', 'world_2', 'world_3', 'world_4', 'world_5', 'world_6'][rand(0, 6)]*/);
            $newCharacter->setWorld($world);
            $manager->persist($newCharacter);
            $this->addReference('character_' . $i, $newCharacter);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            WorldFixtures::class,
        ];
    }
}
