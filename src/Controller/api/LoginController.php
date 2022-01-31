<?php

namespace App\Controller\api;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api', name: 'api_')]
class LoginController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }
        return $this->json([
            'user' => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }

    #[Route('/user', name: 'user', methods: ['POST'])]
    public function checkUser(JWTEncoderInterface $jwtEncoder, Request $request): Response
    {
        $token = json_decode($request->getContent());
        try {
            $jwtEncoder->decode($token->token);

        } catch (JWTDecodeFailureException $ex) {
            return $this->json([
                'success' => false,
                'status' => 401,
                'message' => 'Unauthorized'
            ]);
        }
        return $this->json([
            'success' => true,
            'status' => 200
        ]);
    }
}
