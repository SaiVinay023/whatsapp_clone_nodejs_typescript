import { hashPassword, comparePasswords, generateToken } from '../utils/authUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, updateUserOnlineStatus, getUserOnlineStatus } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Make sure to use dotenv for production!


export async function signupService(name: string, email: string, password: string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);
  return user;
}

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

  return token;
}

export async function updateOnlineStatusService(userId: string, status: boolean) {
  await updateUserOnlineStatus(userId, status);
}

export async function getOnlineStatusService(userId: string) {
  const status = await getUserOnlineStatus(userId);
  return status;
}
