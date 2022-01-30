<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    const USERS = [
        ['Lion', 'lion@gmail.com', 123, ['ROLE_ADMIN']],
        ['Chat', 'chat@gmail.com', 123, []]
    ];

    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {}

    public function load(ObjectManager $manager): void
    {
        foreach (self::USERS as $key => $user) {
            $newUser = new User();
            /*$newUser->setNickname($user[0]);*/
            $newUser->setEmail($user[1]);
            $newUser->setPassword($this->passwordHasher->hashPassword($newUser, $user[2]));
            $newUser->setRoles($user[3]);
            $manager->persist($newUser);
            $this->addReference('user_' . $key, $newUser);
        }

        $manager->flush();
    }
}
