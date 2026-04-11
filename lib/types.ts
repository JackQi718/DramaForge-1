export type Genre = 
  | '复仇' 
  | '爱情' 
  | '悬疑' 
  | '喜剧' 
  | '奇幻' 
  | '都市' 
  | '古装' 
  | '科幻'
  | '武侠'
  | '恐怖'
  | '历史'
  | '战争'
  | '犯罪'
  | '青春'
  | '家庭'
  | '励志'

export type VisualStyle = 
  | '真人实拍' 
  | '动漫' 
  | 'CG' 
  | '电影' 
  | '卡通'
  | '水墨画'
  | '赛博朋克'
  | '蒸汽朋克'
  | '像素风'
  | '油画风'
  | '漫画风'
  | '写实主义'
export type ProjectStatus = '草稿' | '生成中' | '已完成'

export interface Character {
  id: string
  name: string
  age: string
  height: string
  personality: string
  /** 外貌关键词或一句话概括（可选） */
  appearance: string
  /** 剧中人物外貌详细描述（脸型、发型、五官、体型、服装、标志性特征等，供分镜与 AI 参考） */
  appearanceDetail?: string
  role: string
}

export interface StoryboardEntry {
  id: string
  sceneNumber: number
  /** 完整场景描述：宜包含时空与光线、空间与环境、人物站位与动作、道具与叙事作用等，越细越利于拍摄与 AI 成片 */
  sceneDescription: string
  cameraMovement: string
  dialogue: string
  characterInScene: string
  visualElements: string
  duration: string
  mood: string
  voiceOver: string // 画外音
  colorTone: string // 画面色调
  aiVideoPrompt: string // AI 视频生成提示词（中文）
}

export interface Episode {
  id: string
  episodeNumber: number
  title: string
  synopsis: string
  storyboard: StoryboardEntry[]
  status: ProjectStatus
}

export interface Project {
  id: string
  title: string
  genre: Genre
  visualStyle: VisualStyle
  storyline: string
  totalEpisodes: number
  characters: Character[]
  episodes: Episode[]
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}
