<?php

namespace App\Controller\api;

use App\Repository\NewsRepository;
use App\Service\Response\ResponseManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/news', name: 'api_news_')]
class NewsController extends AbstractController
{
    #[Route('/', name: 'all', methods: 'GET')]
    public function all(ResponseManager $responseManager, NewsRepository $newsRepository): Response
    {
        return $responseManager->responseBuilder($newsRepository->findAllToArray());
    }
}
