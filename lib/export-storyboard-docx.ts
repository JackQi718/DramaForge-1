import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlignTable,
  WidthType,
} from 'docx'
import type { Project, StoryboardEntry } from '@/lib/types'

/** 去除 XML/Word 不接受的控制字符 */
function safe(s: string): string {
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim() || '—'
}

const BODY_SIZE = 20
const HEADER_SIZE = 21

/** 横版 A4 可用宽度约 277mm；列宽为比例（与 columnWidths 数组对应） */
const COL_WIDTHS = [360, 2000, 1000, 2000, 900, 900, 700, 450, 450, 2000] as const

function cell(
  text: string,
  opts?: { header?: boolean; align?: (typeof AlignmentType)[keyof typeof AlignmentType] }
): TableCell {
  const isHeader = opts?.header
  return new TableCell({
    children: [
      new Paragraph({
        alignment: opts?.align ?? AlignmentType.LEFT,
        spacing: { before: 60, after: 60, line: 276 },
        children: [
          new TextRun({
            text: safe(text),
            font: 'SimSun',
            size: isHeader ? HEADER_SIZE : BODY_SIZE,
            bold: isHeader,
          }),
        ],
      }),
    ],
    verticalAlign: VerticalAlignTable.TOP,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    shading: isHeader
      ? { fill: 'E8EDF2', type: ShadingType.CLEAR, color: 'auto' }
      : undefined,
  })
}

function headerRow(): TableRow {
  const labels = [
    '镜号',
    '场景描述',
    '镜头运动',
    '对白',
    '出场角色',
    '画外音',
    '画面色调',
    '时长',
    '情绪',
    '视频拍摄提示词',
  ]
  return new TableRow({
    children: labels.map((label, i) =>
      cell(label, {
        header: true,
        align: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
      })
    ),
  })
}

function dataRow(entry: StoryboardEntry): TableRow {
  return new TableRow({
    children: [
      cell(String(entry.sceneNumber), { align: AlignmentType.CENTER }),
      cell(entry.sceneDescription),
      cell(entry.cameraMovement),
      cell(entry.dialogue),
      cell(entry.characterInScene),
      cell(entry.voiceOver || ''),
      cell(entry.colorTone || ''),
      cell(entry.duration),
      cell(entry.mood),
      cell(entry.aiVideoPrompt || ''),
    ],
  })
}

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 1, color: 'B8C4CE' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'B8C4CE' },
  left: { style: BorderStyle.SINGLE, size: 1, color: 'B8C4CE' },
  right: { style: BorderStyle.SINGLE, size: 1, color: 'B8C4CE' },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'DDE4EA' },
  insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'DDE4EA' },
} as const

/**
 * 生成分镜脚本的横版 Word（.docx）：页面横向、表格宽度 100%、自动换行与列宽比例适配纸张。
 */
export async function buildStoryboardDocxBlob(project: Project): Promise<Blob> {
  const children: (Paragraph | Table)[] = []

  children.push(
    new Paragraph({
      text: safe(project.title),
      heading: HeadingLevel.TITLE,
      spacing: { after: 120 },
    })
  )

  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `剧本类型：${safe(project.genre)}    视觉风格：${safe(project.visualStyle)}    总集数：${project.totalEpisodes}`,
          font: 'SimSun',
          size: 22,
        }),
      ],
    })
  )

  for (const ep of project.episodes) {
    if (ep.storyboard.length === 0) continue

    children.push(
      new Paragraph({
        text: `第 ${ep.episodeNumber} 集  ${safe(ep.title)}`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    )

    if (ep.synopsis?.trim()) {
      children.push(
        new Paragraph({
          spacing: { after: 160 },
          children: [
            new TextRun({
              text: `剧情简介：${safe(ep.synopsis)}`,
              font: 'SimSun',
              size: 22,
            }),
          ],
        })
      )
    }

    const rows: TableRow[] = [headerRow(), ...ep.storyboard.map((s) => dataRow(s))]

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.AUTOFIT,
        columnWidths: [...COL_WIDTHS],
        borders: TABLE_BORDERS,
        rows,
      })
    )

    children.push(new Paragraph({ text: '', spacing: { after: 280 } }))
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 16838,
              height: 11906,
              orientation: PageOrientation.LANDSCAPE,
            },
            margin: {
              top: 1134,
              right: 1134,
              bottom: 1134,
              left: 1134,
            },
          },
        },
        children,
      },
    ],
  })

  return Packer.toBlob(doc)
}

export function sanitizeFilenameBase(name: string): string {
  const s = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim()
  return s.slice(0, 80) || '剧本项目'
}
