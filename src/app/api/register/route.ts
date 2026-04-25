import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const org = await prisma.organization.create({
      data: {
        name: `${name}'s Workspace`,
        slug: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-'),
      },
    })

    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: org.id,
        role: 'ADMIN',
      },
    })

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}