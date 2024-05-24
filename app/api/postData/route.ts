import { HttpStatusCode } from 'axios';
import connectMongo from '@/lib/db';
import Subject from '@/models/Subject';
import { CreateDocumentDto } from '@/dto/create-document.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectMongo();
        console.log('Connected to MongoDB')
        const body: CreateDocumentDto = await req.json();
        if (body.document_name) {
            const document = await Subject.create(body);
            return NextResponse.json(
                { document, message: 'Your document has been uploaded' },
                { status: HttpStatusCode.Created },
            );
        }
        return NextResponse.json({ message: 'Document name is missing' }, { status: HttpStatusCode.BadRequest });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectMongo();
        console.log('Connected to MongoDB');
        
        const { searchParams } = new URL(req.url);
        const subjectName = searchParams.get('subject_name');

        if (!subjectName) {
            return NextResponse.json(
                { message: 'Subject name is missing' },
                { status: HttpStatusCode.BadRequest },
            );
        }

        const documents = await Subject.find({ subject_name: subjectName });

        if (documents.length === 0) {
            return NextResponse.json(
                { message: 'No documents found for the given subject name' },
                { status: HttpStatusCode.NotFound },
            );
        }

        return NextResponse.json(
            { documents },
            { status: HttpStatusCode.Accepted },
        );
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { message: 'Error fetching documents', error },
            { status: HttpStatusCode.InternalServerError },
        );
    }
}
