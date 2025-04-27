-- (Optional) Enable UUID extension - ONLY if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    online_status BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP
);

-- Create 'groups' table
CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_name VARCHAR(255) NOT NULL,
    participants UUID[] -- Array of UUIDs (user ids)
);

-- Create 'messages' table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    group_id UUID REFERENCES groups(id),
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT now(),
    status VARCHAR(50) DEFAULT 'Sent'
);
