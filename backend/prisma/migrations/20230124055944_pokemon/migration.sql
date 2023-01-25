-- CreateTable
CREATE TABLE "Pokemon" (
    "pokedex" INTEGER NOT NULL,
    "name" CHAR(10) NOT NULL,
    "picture" VARCHAR(255) NOT NULL,
    "footprint" VARCHAR(255) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("pokedex")
);
