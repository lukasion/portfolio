import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const categories = ['Web Development', 'Internet']

    for (const category of categories) {
        await prisma.category.create({
            data: {
                name: category
            }
        })
    }
}

main().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
})