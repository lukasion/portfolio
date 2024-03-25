-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT,
    "prompt" TEXT,
    "datetime" DATETIME,
    "userId" INTEGER,
    "minutes_read" INTEGER,
    "friendly_url" TEXT,
    "category_id" INTEGER,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "datetime", "description", "friendly_url", "id", "minutes_read", "prompt", "title", "userId") SELECT "content", "datetime", "description", "friendly_url", "id", "minutes_read", "prompt", "title", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
