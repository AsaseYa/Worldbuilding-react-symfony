<?php

namespace App\Controller\api;

use App\Entity\User;
use App\Entity\World;
use App\Repository\WorldRepository;
use App\Service\Response\ResponseManager;
use App\Service\User\UserManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/worlds', name: 'api_world_')]
class WorldController extends AbstractController
{
    #[Route('/', name: 'all-by-user', methods: ['GET'])]
    public function allByUser(UserManager $userManager, WorldRepository $worldRepository, ResponseManager $responseManager): Response
    {
        $token = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
        $isAuth = $userManager->checkUser($token[1]);
        if ($isAuth) {
            /** @var User $user */
            $user = $this->getUser();
            return $responseManager->responseQueryBuilder($worldRepository->findAllByUserToArray($user));
        }
        //@TODO handleException in UserManager
        return $responseManager->responseUnauthorized();
    }

    #[Route('/new', name: 'new', methods: ['POST'])]
    public function newWorld(UserManager $userManager, EntityManagerInterface $ema, ResponseManager $responseManager): Response
    {
        $token = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
        $isAuth = $userManager->checkUser($token[1]);

        $data = json_decode(file_get_contents("php://input"), true);
        if ($isAuth) {
            try {
                $newWorld = new World();
                $newWorld->setName($data["name"]);
                $newWorld->setIsPublic($data["isPublic"]);
                $newWorld->setUrl($data["url"]);
                $newWorld->setDescription($data["description"]);
                $newWorld->setUser($this->getUser());
                $ema->persist($newWorld);
                $ema->flush();
            } catch (Exception $e) {
                //@TODO handle error
                return $responseManager->responseUnauthorized();
            }
        }
        return $responseManager->responseSuccess('Le monde a bien été enregistré');
    }
}
