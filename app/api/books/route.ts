
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

  try{
    const session = await getServerSession();
    if(!session || !session.user){
      return NextResponse.json({
        error:"unauthorized"
      })
    }

    if (!session.user.email) {
      return NextResponse.json({
        error: "unauthorized"
      }, { status: 401 })
    }
  
  const data = await req.json();
  const book = await prisma.book.create({
    data: {
      book: data.bookName,
      author: data.authorName,
      user:{
        connect:{
          email: session.user.email
        }
      }
    }
  });
  return NextResponse.json({ message: "Book created successfully", book }, { status: 201 });
}catch(error){
  console.error('error creating book:', error);
  return NextResponse.json({error:"failed to create"})
}
}


export async function GET(req: NextRequest) {
  // Get userId from query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // If userId is provided, filter by userId, otherwise return all books
  const books = userId
    ? await prisma.book.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true, // Optional: include user details
        },
      })
    : await prisma.book.findMany({
        include: {
          user: true, // Optional: include user details
        },
      });

  return NextResponse.json({ books }, { status: 200 });
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Delete book
    await prisma.book.delete({
      where: { id: id },  // make sure ID is string
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR: ", error);

    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
