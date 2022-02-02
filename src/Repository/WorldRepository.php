<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\World;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method World|null find($id, $lockMode = null, $lockVersion = null)
 * @method World|null findOneBy(array $criteria, array $orderBy = null)
 * @method World[]    findAll()
 * @method World[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorldRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, World::class);
    }

    /**
     * @return World[] Returns an array of Update array
     */
    public function findAllByUserToArray(User $user): array
    {
        $query = $this
            ->createQueryBuilder('w')
            ->where('w.user = :userId')
            ->setParameter('userId', $user->getId())
            ->getQuery();
        return $query->getArrayResult();
    }
}
