<?php

namespace App\Service\Response;

use Symfony\Component\HttpFoundation\Response;

/**
 * Manage the responses of the api
 */
class ResponseManager
{

    /**
     * @return Response
     */
    public function responseUnauthorized(): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response->setContent(json_encode([
            'success' => false,
            'status' => 401,
            'content' => 'Unauthorized',
        ]));
    }

    /**
     * @param array $query
     * @return Response
     */
    public function responseQueryBuilder(array $query): Response
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $status = $response->getStatusCode();
        if (null != $query) {
            return $response->setContent(json_encode([
                'success' => true,
                'status' => $status,
                'content' => $query,
            ]));
        } else {
            return $response->setContent(json_encode([
                'success' => false,
                'status' => $status,
                'content' => 'An error occurred',
            ]));
        }
    }
}