import type { Post, User } from '$lib/types/_types';

const parentCommentsText = [
	'The latest patch does my head in, but I still keep on playing. 🤩',
	'This is a card I created yesterday, you cannot see it but I sure hope you like it! 😁',
	'I made a small mistake on my most recent card, could anyone make a better version? I will provide more details in DM :-)',
	'I really dislike the recent program. I think it is a waste of time honestly. 😒',
	'The game really has to be one of the best out there. I was playing with friends today and just couldn\'t stop laughing! 😂',
	'I miss the old days of the game. I used to play with my friends all the time. Now it\'s just not the same. 😔',
]

const repliesText = [
	'Wow, that looks amazing! Can you share how you did it? 🤩',
	'This is a great card! I love the design. 😍',
	'I think you could improve it by changing the color scheme. What do you think? 🤔',
	'I really like the animation! It adds a nice touch to the card. 👍',
	'This is a great card! I love the design. 😍',
	'Can you share how you made this card? I would love to learn from you! 🙏',
	'I know what you mean!',
	'Completely agree dude!',
	'Gameplay is so much better now!',
	'FIREEE 🔥🔥🔥',
]

const reactions = [
	'angry', 'bullseye', 'like', 'heart', 'laugh', 'sad',
	'winking-face', 'disappointed-face', 'face-exhaling', 'party-popper'
]

const users = [
	'KevinKampl', 'KanteFooty', 'Nick173', 'Hair Dude', 'MessiIsTheGoat', 'Lewangoalski', 'peter2901',
	'CristianoRonaldo', 'NeymarJr', 'MbappeMagic', 'SalahKing', 'PeleTheLegend', 'MaradonaForever'
]

export const getPost: () => Post = () => {
	const randomUserId = crypto.randomUUID()
	const randomUser: User = {
		id: randomUserId,
		name: users[Math.floor(Math.random() * users.length)],
		image: `https://i.pravatar.cc/256?u=${randomUserId}`
	}
	const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000))
	const randomReactionsCount = Math.floor(Math.random() * reactions.length)

	return {
		id: crypto.randomUUID(),
		content: parentCommentsText[Math.floor(Math.random() * parentCommentsText.length)],
		user: randomUser,
		date: randomDate,
		reactions: Array.from({ length: randomReactionsCount }, (_, i) => ({
			type: reactions[i],
			count: 1 + Math.floor(Math.random() * 10)
		}))
	}
}

export const getComments: () => Post[] = () => {
	const randomRepliesCount = Math.floor(Math.random() * 10)

	return Array.from({ length: randomRepliesCount }, () => {
		const randomUserId = crypto.randomUUID()

		return {
			id: crypto.randomUUID(),
			content: repliesText[Math.floor(Math.random() * repliesText.length)],
			user: {
				id: randomUserId,
				name: users[Math.floor(Math.random() * users.length)],
				image: `https://i.pravatar.cc/256?u=${randomUserId}`
			},
			date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
			reactions: Array.from({ length: Math.floor(Math.random() * reactions.length) }, (_, i) => ({
				type: reactions[i],
				count: 1 + Math.floor(Math.random() * 10)
			}))
		}
	})
}