<?php

namespace App\Controller\api;

use App\Entity\User;
use App\Service\Response\ResponseManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class RegisterController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(ResponseManager $responseManager, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $ema): Response
    {
        $data = json_decode(file_get_contents("php://input"), true);
        try {
            $newUser = new User();
            $newUser->setNickname($data["nickname"]);
            $newUser->setEmail($data["username"]);
            $newUser->setPassword($passwordHasher->hashPassword($newUser, $data["password"]));
            $ema->persist($newUser);
            $ema->flush();
        } catch (Exception $e) {
            $fieldValue = trim(explode(' ', $e->getMessage())[14], '\''); //@TODO Penser à une meilleure solution
            return $responseManager->responseError($e->getCode(), "$fieldValue est déjà utilisé");
        }
        return $responseManager->responseSuccess('L\'utilisateur a bien été enregistré');
    }
}
