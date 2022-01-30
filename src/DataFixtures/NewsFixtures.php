<?php

namespace App\DataFixtures;

use App\Entity\News;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class NewsFixtures extends Fixture
{

    const NEWS = [
        [[2022, 01, 30, 12, 15, 53], 'Lancement du site! Première navbar faite. accès Home avec les news. Front React et back en symfony'],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::NEWS as $key => $news) {
            $year = $news[0][0];
            $month = $news[0][1];
            $day = $news[0][2];
            $hour = $news[0][3];
            $minute = $news[0][4];
            $second = $news[0][5];
            $newNews = new News();
            $newNews->setTitle('Update #' . ($key + 1));
            $time = (new DateTimeImmutable)
                ->setDate($year, $month, $day)
                ->setTime($hour, $minute, $second);
            $newNews->setCreatedAt($time);
            $newNews->setContent($news[1]);
            $manager->persist($newNews);
            $this->addReference('news_' . $key, $newNews);
        }
        $manager->flush();
    }
}
