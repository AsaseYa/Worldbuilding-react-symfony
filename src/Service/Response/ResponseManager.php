<?php

namespace App\Service\Response;

use Symfony\Component\HttpFoundation\Response;

/**
 * Manage the responses of the api
 */
class ResponseManager
{
    /**
     * @param array $query
     * @return Response
     */
    public function responseBuilder(array $query): Response
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