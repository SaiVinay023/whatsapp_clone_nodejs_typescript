import { hashPassword, comparePasswords, generateToken } from '../utils/authUtils';
import { createUser, findUserByEmail, updateUserOnlineStatus, getUserOnlineStatus } from '../models/userModel';

export async function signupService(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  return await createUser(name, email, hashedPassword);
}

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await comparePasswords(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email });
  return token;
}

export async function updateOnlineStatusService(userId: string, status: boolean) {
  await updateUserOnlineStatus(userId, status);
}

export async function getOnlineStatusService(userId: string) {
  return await getUserOnlineStatus(userId);
}
