<?php

namespace App\Service\User;

use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;

class UserManager
{

    public function __construct(private JWTEncoderInterface $jwtEncoder)
    {
    }

    public function checkUser($token): JWTDecodeFailureException|Exception|bool
    {
        try {
            $this->jwtEncoder->decode($token);
        } catch (JWTDecodeFailureException $ex) {
        }
        return true;
    }
}