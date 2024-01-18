/*
  Warnings:

  - Added the required column `datetime` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL
);
INSERT INTO "new_Topic" ("id", "name") SELECT "id", "name" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
