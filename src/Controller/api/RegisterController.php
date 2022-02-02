<?php

namespace App\Controller\api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class RegisterController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function index(): Response
    {


        return $this->json([
            'user' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'nickname' => $user->getNickname(),
        ]);
    }
}
