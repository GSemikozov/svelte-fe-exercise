export type Reaction = {
	type: string
	count: number
}

export type User = {
	id: string
	name: string
	image: string
}

export type Post = {
	id: string
	content: string
	user: User
	date: Date
	reactions: Reaction[]
}