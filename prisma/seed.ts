import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    const user = await prisma.user.create({
        data: {
            email: 'admin@metricsight.com',
            name: 'Admin User',
            password,
        },
    })

    const org = await prisma.organization.create({
        data: {
            name: 'MetricSight HQ',
            slug: 'metricsight-hq',
        },
    })

    await prisma.membership.create({
        data: {
            userId: user.id,
            organizationId: org.id,
            role: 'ADMIN',
        },
    })

    console.log('Seeded: admin@metricsight.com / password123')
}

main().catch(console.error).finally(() => prisma.$disconnect())