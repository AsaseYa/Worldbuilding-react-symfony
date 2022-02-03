<?php

namespace App\Repository;

use App\Entity\Character;
use App\Entity\World;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Character|null find($id, $lockMode = null, $lockVersion = null)
 * @method Character|null findOneBy(array $criteria, array $orderBy = null)
 * @method Character[]    findAll()
 * @method Character[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CharacterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Character::class);
    }

    /**
     * @return Character[] Returns an array of Update array
     */
    public function findAllByWorldToArray(World $world): array
    {
        $query = $this
            ->createQueryBuilder('c')
            ->where('c.world = :worldId')
            ->setParameter('worldId', $world->getId())
            ->getQuery();
        return $query->getArrayResult();
    }
}
