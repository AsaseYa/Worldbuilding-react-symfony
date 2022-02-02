<?php

namespace App\Controller\api;

use App\Entity\User;
use App\Repository\WorldRepository;
use App\Service\Response\ResponseManager;
use App\Service\User\UserManager;
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
}
