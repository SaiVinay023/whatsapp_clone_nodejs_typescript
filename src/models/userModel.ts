import db from "../db/connection";

export async function createUser(name: string, email: string, password: string) {
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, password]
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function updateUserOnlineStatus(userId: string, status: boolean) {
  await db.query(`UPDATE users SET online_status = $1, last_seen = now() WHERE id = $2`, [status, userId]);
}

export async function getUserOnlineStatus(userId: string) {
  const result = await db.query(`SELECT online_status, last_seen FROM users WHERE id = $1`, [userId]);
  return result.rows[0];
}
