import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

async function seed() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const roles = ['Client', 'Admin'];
        for (const roleName of roles) {
            await prisma.role.upsert({
                where: { name: roleName },
                update: {},
                create: { name: roleName },
            });
            console.log(`Role ${roleName} ensured.`);
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

seed();
