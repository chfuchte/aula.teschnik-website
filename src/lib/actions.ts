'use server';

import { signIn } from '@/auth';
import { z } from 'zod';

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export async function authenticate(
    formData: LoginFormValues,
) {
    try {
        await signIn('credentials', formData);
    } catch {
        // Do nothing
    }
}
