<?php

namespace App\Controller\api;

use App\Entity\User;
use App\Repository\CharacterRepository;
use App\Service\Response\ResponseManager;
use App\Service\User\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/characters', name: 'api_character_')]
class CharacterController extends AbstractController
{
    #[Route('/', name: 'all-by-user', methods: ['GET'])]
    public function index(UserManager $userManager, CharacterRepository $characterRepository, ResponseManager $responseManager): Response
    {
        $token = explode(' ', $_SERVER['HTTP_AUTHORIZATION']);
        $isAuth = $userManager->checkUser($token[1]);
        dd($_SERVER);
        if ($isAuth) {
            //handle world
            return $responseManager->responseQueryBuilder($characterRepository->findAllByWorldToArray($world));
        }
        //@TODO handleException in UserManager
        return $responseManager->responseUnauthorized();
    }
}
