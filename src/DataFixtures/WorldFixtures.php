<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\World;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class WorldFixtures extends Fixture implements DependentFixtureInterface
{
    const WORLDS = [
        ['Asterius', 'user_0', '2022-01-16', 'https://assets.puzzlefactory.pl/puzzle/375/154/original.jpg', true],
        ['Westeros', 'user_1', '2022-01-16', 'https://media.istockphoto.com/photos/fantastic-landscape-with-mushrooms-picture-id1162986997', true],
        ['La terre des Hommes', 'user_0', '2022-01-16', 'https://i.ytimg.com/vi/6cQzyYEta8o/maxresdefault.jpg', false],
        ['Mordor', 'user_0', '2022-01-16', 'https://www.aaron-artiste-popart.com/wp-content/uploads/2017/01/paysage-fantastique.jpg', true],
        ['Tamriel', 'user_0', '2022-01-16', 'https://www.aaron-artiste-popart.com/wp-content/uploads/2017/01/paysage-fantastique5.jpg', false],
        ['Mon univers à moi', 'user_0', '2022-01-16', 'https://img2.wallspic.com/originals/2/1/2/5/15212-paysage_fantastique-arts_creatifs-les_jeux_video-peintre-deau-4000x2000.jpg', false],
        ['Best Univers Ever', 'user_0', '2022-01-16', 'https://previews.123rf.com/images/grandfailure/grandfailure1507/grandfailure150700037/42293108-peinture-de-paysage-fantastique-avec-un-myst%C3%A9rieux-arbres-au-coucher-du-soleil.jpg', true],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::WORLDS as $key => $world) {
            $newWorld = new World();
            $newWorld->setName($world[0]);
            /** @var User $user */
            $user = $this->getReference($world[1]);
            $newWorld->setUser($user);
            $newWorld->setCreatedAt(\DateTimeImmutable::createFromFormat('Y-m-d', $world[2]));
            $newWorld->setUrl($world[3]);
            $newWorld->setIsPublic($world[4]);
            $newWorld->setDescription('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad architecto cumque debitis, distinctio, doloribus esse facere harum magnam molestias nihil perferendis quasi quo recusandae reiciendis sunt voluptate. Iure, quos.');
            $manager->persist($newWorld);
            $this->addReference('world_' . $key, $newWorld);
        }
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
