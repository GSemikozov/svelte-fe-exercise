import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getComments } from '$lib/data/_comments.data';

export const GET: RequestHandler = async ({}) => json(getComments())