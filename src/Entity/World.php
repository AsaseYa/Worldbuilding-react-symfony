<?php

namespace App\Entity;

use App\Repository\WorldRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\ArrayShape;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Uid\UuidV4;

#[ORM\Entity(repositoryClass: WorldRepository::class)]
class World
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255)]
    private string $name;

    #[ORM\Column(type: 'datetime_immutable')]
    private DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'worlds')]
    private User $user;

    #[ORM\Column(type: 'boolean')]
    private bool $isPublic;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private string $url;

    #[ORM\Column(type: 'text', nullable: true)]
    private string $description;

    #[ORM\Column(type: 'uuid', unique: true)]
    private UuidV4 $uuid;

    #[ORM\OneToMany(mappedBy: 'world', targetEntity: Character::class, orphanRemoval: true)]
    private Collection $characters;

    public function __construct()
    {
        $this->uuid = Uuid::v4();
        $this->createdAt = new DateTimeImmutable();
        $this->characters = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getIsPublic(): bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): self
    {
        $this->isPublic = $isPublic;

        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUuid(): UuidV4
    {
        return $this->uuid;
    }

    public function setUuid($uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }

    #[ArrayShape(['id' => "int", 'name' => "string", 'createdAt' => "\DateTimeImmutable", 'uuid' => "\Symfony\Component\Uid\UuidV4", 'description' => "string", 'isPublic' => "bool", 'url' => "string"])]
    public function convertToArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'createdAt' => $this->createdAt,
            'uuid' => $this->uuid,
            'description' => $this->description,
            'isPublic' => $this->isPublic,
            'url' => $this->url,
        ];
    }

    /**
     * @return Collection|Character[]
     */
    public function getCharacters(): Collection
    {
        return $this->characters;
    }

    public function addCharacter(Character $character): self
    {
        if (!$this->characters->contains($character)) {
            $this->characters[] = $character;
            $character->setWorld($this);
        }

        return $this;
    }

    public function removeCharacter(Character $character): self
    {
        if ($this->characters->removeElement($character)) {
            // set the owning side to null (unless already changed)
            if ($character->getWorld() === $this) {
                $character->setWorld(null);
            }
        }

        return $this;
    }
}
