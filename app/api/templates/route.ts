import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { QuickTemplate } from '@/lib/types';
import { QUICK_TEMPLATES } from '@/lib/templates';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'templates.json');

async function getTemplatesFromFile(): Promise<QuickTemplate[]> {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    // Arquivo ainda não existe ou erro de leitura; retorna padrão
  }
  return QUICK_TEMPLATES;
}

export async function GET() {
  const templates = await getTemplatesFromFile();
  return NextResponse.json(templates);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const templates = Array.isArray(body) ? body : body.templates;

    if (!Array.isArray(templates)) {
      return NextResponse.json(
        { error: 'Formato inválido. Esperado um array de templates.' },
        { status: 400 }
      );
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(templates, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      success: true,
      message: 'Templates salvos com sucesso e permanentemente!',
      templates,
    });
  } catch (error) {
    console.error('Erro ao salvar templates no arquivo:', error);
    return NextResponse.json(
      { error: 'Falha ao salvar templates no servidor.' },
      { status: 500 }
    );
  }
}
